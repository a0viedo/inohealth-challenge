import { z } from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  EXTERNAL_API: z.string().url(),
  NODE_ENV: z.enum(['development', 'test', 'production']),
  PORT: z.coerce.number(),
  RENDER_URL: z.string().url().nullish(),
  DEFAULT_FETCH_COUNT: z.coerce.number(),
});

const env = envSchema.safeParse(process.env);

if (!env.success) {
  throw new Error(
    `❌ Invalid environment variables: ${JSON.stringify(
      env.error.format(),
      null,
      4
    )}`
  );
}
type Env = z.infer<typeof envSchema>;

declare global {
  namespace NodeJS {
    interface ProcessEnv extends Env {}
  }
}
