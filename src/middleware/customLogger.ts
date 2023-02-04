import { Request, Response } from 'express';
import { logger } from '../utils/loggers.js';

const customLogger = (request: Request, response: Response, next: () => void) => {
  const args = request.params;
  logger.info(`Task5.1 - Method: ${request.method}, URL: ${request.url}, arguments: `, {
    ...args,
  });
  next();
};
export default customLogger;
