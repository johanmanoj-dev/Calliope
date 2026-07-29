import mongoose, { Document } from 'mongoose';
import type { IMessage } from '@shared/types/message';
export interface IMessageDocument extends Omit<IMessage, '_id'>, Document {
}
export declare const Message: mongoose.Model<IMessageDocument, {}, {}, {}, mongoose.Document<unknown, {}, IMessageDocument, {}, {}> & IMessageDocument & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=Message.d.ts.map