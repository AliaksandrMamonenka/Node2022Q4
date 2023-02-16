import { Request, Response } from 'express';
import ApiErrorHandler from '../utils/apiErrorHandler.js';
import { logger } from '../utils/loggers.js';

export default (error: Error, request: Request, response: Response) => {
  const { name, message, stack } = error;

  logger.error(`${name}, ${message}, ${stack}`);

  if (error instanceof ApiErrorHandler) {
    return response.status(error.status).json({ message: error.message, errors: error.errors });
  }

  return response.status(500).json({ message: 'Server error, something went wrong' });
};
