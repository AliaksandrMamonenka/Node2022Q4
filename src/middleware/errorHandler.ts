import { Request, Response } from 'express';
import { logger } from '../utils/loggers.js';

const errorHandler = (error: Error, request: Request, response: Response, next: () => void) => {
  const { name, message, stack } = error;
  logger.error(`Error log: ${name}, ${message}, ${stack}`);
  response.status(500).json(error);
};

export default errorHandler;
