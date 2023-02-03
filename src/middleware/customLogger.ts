import { Request, Response } from 'express';

const customLogger = (serviceName: string) => {
  return (request: Request, response: Response, next: () => void) => {
    const args = request.params;
    console.log(`Task5.1 - Method: ${request.method}, Service: ${serviceName}, URL: ${request.url}, arguments: `, {
      ...args,
    });
    next();
  };
};
export default customLogger;
