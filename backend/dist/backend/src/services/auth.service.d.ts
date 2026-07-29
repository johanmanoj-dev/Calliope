export declare const verifyGoogleToken: (idToken: string) => Promise<import("google-auth-library").TokenPayload>;
export declare const findOrCreateUser: (googlePayload: any) => Promise<import("mongoose").Document<unknown, {}, import("../models/User").IUserDocument, {}, {}> & import("../models/User").IUserDocument & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}>;
export declare const generateSessionToken: (user: any) => string;
//# sourceMappingURL=auth.service.d.ts.map