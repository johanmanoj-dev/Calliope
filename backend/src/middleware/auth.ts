import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/env';
import { sendError } from '../utils/response';
import type { IAuthPayload } from '@shared/types/user';

// Extend Express Request to include user
declare global {
  namespace Express {
    interface Request {
      user?: IAuthPayload;
    }
  }
}

export const requireAuth = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.cookies.token;

  if (!token) {
    sendError(res, 'Authentication required', 401);
    return;
  }

  try {
    const decoded = jwt.verify(token, config.jwt.secret) as IAuthPayload;
    req.user = decoded;
    next();
  } catch (error) {
    sendError(res, 'Invalid or expired token', 401);
  }
};
