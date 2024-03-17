import {
  createTRPCClient,
  createWSClient,
  httpLink,
  splitLink,
  wsLink,
} from '@trpc/client';
import type { AppRouter } from '../server';

const wsClient = createWSClient({
  url:
    process.env.NODE_ENV === 'development'
      ? `ws://localhost:${process.env.TRPC_PORT}`
      : `ws://${process.env.RENDER_URL}`,
});

export const trpcClient = createTRPCClient<AppRouter>({
  links: [
    splitLink({
      condition(op) {
        return op.type === 'subscription';
      },
      true: wsLink({
        client: wsClient,
      }),
      false: httpLink({
        url:
          process.env.NODE_ENV === 'development'
            ? `http://localhost:${process.env.TRPC_PORT}`
            : `https://${process.env.RENDER_URL}`,
      }),
    }),
  ],
});
