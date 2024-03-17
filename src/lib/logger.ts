import pino from 'pino';

type EnvTypes = 'development' | 'production' | 'test';

const envToLogger = {
  development: {
    level: process.env.LOG_LEVEL || 'info',
    transport: {
      target: 'pino-pretty',
      options: {
        ignore: 'pid,hostname',
        colorize: true,
      },
    },
  },
  production: {},
  test: {},
};

export const logger = pino(envToLogger[process.env.NODE_ENV as EnvTypes]);

export type Logger = typeof logger;
