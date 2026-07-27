import ImageKit from 'imagekit';
import { Request, Response, NextFunction } from 'express';
import { config } from '../config/env';
import { sendSuccess } from '../utils/response';

const imagekit = new ImageKit({
  publicKey: config.imagekit.publicKey,
  privateKey: config.imagekit.privateKey,
  urlEndpoint: config.imagekit.urlEndpoint,
});

export const getUploadAuth = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const authParameters = imagekit.getAuthenticationParameters();
    sendSuccess(res, authParameters);
  } catch (error) {
    next(error);
  }
};
