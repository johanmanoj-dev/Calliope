import { Response } from 'express';

interface SuccessResponse<T = unknown> {
  success: true;
  message: string;
  data?: T;
  meta?: Record<string, unknown>;
}

interface ErrorResponse {
  success: false;
  message: string;
  errors?: Array<{ field: string; message: string }>;
}

export const sendSuccess = <T>(
  res: Response,
  data: T,
  message = 'Success',
  statusCode = 200,
  meta?: Record<string, unknown>
): Response<SuccessResponse<T>> => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
    ...(meta && { meta }),
  });
};

export const sendError = (
  res: Response,
  message: string,
  statusCode = 500,
  errors?: Array<{ field: string; message: string }>
): Response<ErrorResponse> => {
  return res.status(statusCode).json({
    success: false,
    message,
    ...(errors && { errors }),
  });
};
