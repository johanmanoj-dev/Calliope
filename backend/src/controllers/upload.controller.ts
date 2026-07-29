import ImageKit from '@imagekit/nodejs';
import { Request, Response, NextFunction } from 'express';
import { config } from '../config/env';
import { sendSuccess } from '../utils/response';

// @ts-ignore — @imagekit/nodejs v7 types differ from actual runtime constructor
const imagekit = new (ImageKit as any)({
  publicKey: config.imagekit.publicKey,
  privateKey: config.imagekit.privateKey,
  urlEndpoint: config.imagekit.urlEndpoint,
});

export const getUploadAuth = (req: Request, res: Response, next: NextFunction): void => {
  try {
    // In v7, getAuthenticationParameters lives on imagekit.helper
    const auth = imagekit.helper ?? imagekit;
    const authParameters = auth.getAuthenticationParameters();
    sendSuccess(res, authParameters);
  } catch (error) {
    next(error);
  }
};
