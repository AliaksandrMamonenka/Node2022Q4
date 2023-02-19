import { Request, Response } from 'express';
import TokenService from '../services/tokenService.js';
import { UnauthorizedError, BadRequestError } from '../utils/apiErrorHandler.js';
import { logger } from '../utils/loggers.js';

const checkAuthorization = (request: Request, response: Response, next: (arg?: any) => void) => {
  try {
    if (request.originalUrl !== '/api/login') {
      const authorizationHeader = request.headers.authorization;
      logger.info(request.originalUrl);
      if (!authorizationHeader) {
        throw new UnauthorizedError();
      }

      const accessToken = authorizationHeader.split(' ')[1];

      if (!accessToken) {
        throw new UnauthorizedError();
      }

      const userData = TokenService.validateToken(accessToken);

      if (!userData) {
        throw new BadRequestError('Failed to authenticate token');
      }
    }
    next();
  } catch (error) {
    next(error);
  }
};

export default checkAuthorization;
