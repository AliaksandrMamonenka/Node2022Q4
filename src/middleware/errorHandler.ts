import { NextFunction, Request, Response } from 'express';
import { logger } from '../utils/loggers.js';

export default (error: any, request: Request, response: Response, next: NextFunction) => {
  const { status, message, stack } = error;

  if (error?.status) {
    logger.error(`${status}, ${message}, ${stack}`);
    return response.status(error.status).json({ message: error.message });
  }

  logger.error(`${stack}`);
  const msg = message ? message : 'something went wrong';
  return response.status(500).json({ message: `Server error: ${msg}` });
};
