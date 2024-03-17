import pino from 'pino';

type EnvTypes = 'development' | 'production' | 'test';

const envToLogger = {
  development: {
    level: process.env.LOG_LEVEL || 'info',
  },
  production: {
    level: 'info',
  },
  test: {},
};

export const logger = pino(envToLogger[process.env.NODE_ENV as EnvTypes]);

export type Logger = typeof logger;
