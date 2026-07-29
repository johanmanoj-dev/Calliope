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
    errors?: Array<{
        field: string;
        message: string;
    }>;
}
export declare const sendSuccess: <T>(res: Response, data: T, message?: string, statusCode?: number, meta?: Record<string, unknown>) => Response<SuccessResponse<T>>;
export declare const sendError: (res: Response, message: string, statusCode?: number, errors?: Array<{
    field: string;
    message: string;
}>) => Response<ErrorResponse>;
export {};
//# sourceMappingURL=response.d.ts.map