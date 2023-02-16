import { Request, Response } from 'express';
import TokenService from '../services/tokenService.js';
import ApiErrorHandler from '../utils/apiErrorHandler.js';
import { logger } from '../utils/loggers.js';

const checkAuthorization = (request: Request, response: Response, next: (arg?: any) => void) => {
  try {
    if (request.originalUrl !== '/api/login') {
      const authorizationHeader = request.headers.authorization;
      logger.info(request.originalUrl);
      if (!authorizationHeader) {
        throw ApiErrorHandler.UnauthorizedError();
      }

      const accessToken = authorizationHeader.split(' ')[1];

      if (!accessToken) {
        throw ApiErrorHandler.UnauthorizedError();
      }

      const userData = TokenService.validateToken(accessToken);

      if (!userData) {
        throw ApiErrorHandler.BadRequestError('Failed to authenticate token');
      }
    }
    next();
  } catch (error) {
    next(error);
  }
};

export default checkAuthorization;
