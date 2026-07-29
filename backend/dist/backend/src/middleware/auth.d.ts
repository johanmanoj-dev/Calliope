import { Request, Response, NextFunction } from 'express';
import type { IAuthPayload } from '@shared/types/user';
declare global {
    namespace Express {
        interface Request {
            user?: IAuthPayload;
        }
    }
}
export declare const requireAuth: (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=auth.d.ts.map