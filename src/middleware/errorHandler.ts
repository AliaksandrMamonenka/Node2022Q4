import { Request, Response } from 'express';

const errorHandler = (error: Error, request: Request, response: Response, next: () => void) => {
  const { name, message, stack } = error;
  console.error(`Error log: ${name}, ${message}, ${stack}`);
  response.status(500).json(error);
};

export default errorHandler;
