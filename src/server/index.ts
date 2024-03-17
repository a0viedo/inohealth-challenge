import { initTRPC } from '@trpc/server';
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { applyWSSHandler } from '@trpc/server/adapters/ws';
import { WebSocketServer } from 'ws';
import { z } from 'zod';
import { logger } from '../lib/logger';
import { PrismaClient, Prisma, type PersonMetadata } from '@prisma/client';
import {
  convertObjectKeysToCamelCase,
  convertPersonMetadataItem,
} from '../lib/utils';
import type { PersonMetadataJSON } from '../lib/types';

import './envValidation';

function createContext() {
  return {};
}
type Context = Awaited<ReturnType<typeof createContext>>;

const t = initTRPC.context<Context>().create();

export const publicProcedure = t.procedure;
export const router = t.router;

const logProcedure = publicProcedure.use(async ({ ctx, next, path }) => {
  logger.info({ path }, 'Executing procedure');
  return await next();
});

const prisma = new PrismaClient();

const appRouter = router({
  personMetadata: {
    list: logProcedure
      .input(
        z.object({
          count: z.number().nullish(),
        })
      )
      .query(async ({ input }) => {
        const count = input.count ?? process.env.DEFAULT_FETCH_COUNT;

        // we assume the external API could receive the count via querystring params
        const response = await fetch(
          `${process.env.EXTERNAL_API}?count=${count}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = (await response.json()) as Array<Record<string, any>>;
        logger.debug('Retrieved data from external API successfully');
        const mapped = data.map((item: any) =>
          convertPersonMetadataItem(
            convertObjectKeysToCamelCase<PersonMetadataJSON>(item)
          )
        );
        await prisma.personMetadata.createMany({
          data: mapped,
        });

        logger.info(`Inserted rows in the database. Count: ${mapped.length}`);
        return mapped;
      }),
    reset: publicProcedure.query(async () => {
      await prisma.personMetadata.deleteMany();
      logger.info('Database reset successful.');
    }),
  },
});

export type AppRouter = typeof appRouter;

const server = createHTTPServer({
  router: appRouter,
  createContext,
});

const wss = new WebSocketServer({ server });
applyWSSHandler<AppRouter>({
  wss,
  router: appRouter,
  createContext,
});

server.listen(process.env.PORT, () =>
  logger.info(`Server started on port ${process.env.PORT}`)
);
