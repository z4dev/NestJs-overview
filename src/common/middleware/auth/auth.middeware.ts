import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private configService: ConfigService) {} // Inject ConfigService

  use(req: Request, res: Response, next: () => void) {
    try {
      const authHeader = req.headers['authorization'];

      if (!authHeader) {
        return res.status(HttpStatus.UNAUTHORIZED).json({
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'No authorization header found',
        });
      }

      const [bearer, token] = authHeader.split(' ');

      if (bearer !== 'Bearer' || !token) {
        return res.status(HttpStatus.UNAUTHORIZED).json({
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'Invalid authorization format',
        });
      }

      // Use ConfigService to get JWT_SECRET
      const secret = this.configService.get<string>('JWT_SECRET');

      if (!secret) {
        console.error('JWT_SECRET is not configured');
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Internal Server Error',
        });
      }

      const decoded = jwt.verify(token, secret);
      if (!decoded) {
        return res.status(HttpStatus.UNAUTHORIZED).json({
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'Invalid token',
        });
      }

      req['user'] = decoded;
      console.log('decoded:', req['user']);

      next();
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        return res.status(HttpStatus.UNAUTHORIZED).json({
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'Invalid token',
        });
      }

      if (error instanceof jwt.TokenExpiredError) {
        return res.status(HttpStatus.UNAUTHORIZED).json({
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'Token has expired',
        });
      }

      console.error('Auth middleware error:', error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal Server Error',
      });
    }
  }
}
