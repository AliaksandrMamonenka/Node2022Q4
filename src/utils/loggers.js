import { format, transports, loggers } from 'winston';
import expressWinston from 'express-winston';

const { timestamp, combine, printf, colorize } = format;

loggers.add('infoLogger', {
  transports: [
    new transports.Console({
      level: 'info',
      format: combine(
        colorize({ all: true, colors: { info: 'blue' } }),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        printf((info) => {
          const { timestamp, level, message, ...args } = info;
          const { meta } = args;
          return `${timestamp} ${level}: ${message} ${meta?.res?.statusCode || ''} ${meta?.responseTime || ''}`;
        }),
      ),
    }),
  ],
});

loggers.add('errorLogger', {
  transports: [
    new transports.Console({
      level: 'error',
      format: combine(
        colorize({ all: true }),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        printf((info) => {
          const { timestamp, level, message, ...args } = info;
          return `${timestamp} ${level}: ${message} ${Object.keys(args).length ? JSON.stringify(args, '', '') : ''}`;
        }),
      ),
      handleExceptions: true,
      handleRejections: true,
    }),
  ],
});

export const logger = loggers.get('infoLogger');

export const infoWinstonLogger = expressWinston.logger({
  winstonInstance: logger,
});

export const errorWinstonLogger = expressWinston.errorLogger({
  winstonInstance: loggers.get('errorLogger'),
});
