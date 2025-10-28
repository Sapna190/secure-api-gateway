import { createLogger, format, transports } from 'winston';

// In test environment we also keep an in-memory log store so tests can assert on logs
const inMemoryLogs: Array<{ level: string; message: string; meta?: any; timestamp?: string }> = [];

export const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.json()
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
    new transports.File({ filename: 'logs/combined.log' })
  ],
});

const pushInMemory = (level: string, message: string, meta?: any) => {
  if (process.env.NODE_ENV === 'test') {
    inMemoryLogs.push({ level, message, meta, timestamp: new Date().toISOString() });
  }
};

export const logInfo = (message: string, meta?: object) => {
  pushInMemory('info', message, meta);
  logger.info(message, meta);
};

export const logError = (message: string, meta?: object) => {
  pushInMemory('error', message, meta);
  logger.error(message, meta);
};

export const logWarning = (message: string, meta?: object) => {
  pushInMemory('warn', message, meta);
  logger.warn(message, meta);
};

export const logDebug = (message: string, meta?: object) => {
  pushInMemory('debug', message, meta);
  logger.debug(message, meta);
};

export const getInMemoryLogs = () => inMemoryLogs;