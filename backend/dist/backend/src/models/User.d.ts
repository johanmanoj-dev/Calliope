import mongoose, { Document } from 'mongoose';
import type { IUser } from '@shared/types/user';
export interface IUserDocument extends Omit<IUser, '_id'>, Document {
}
export declare const User: mongoose.Model<IUserDocument, {}, {}, {}, mongoose.Document<unknown, {}, IUserDocument, {}, {}> & IUserDocument & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=User.d.ts.map