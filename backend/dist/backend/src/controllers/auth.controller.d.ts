import { Request, Response, NextFunction } from 'express';
export declare const googleCallback: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const logout: (req: Request, res: Response) => void;
export declare const getMe: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const updateProfilePicture: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const updateThemePreference: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const deleteAccount: (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=auth.controller.d.ts.map