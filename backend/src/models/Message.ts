import mongoose, { Schema, Document } from 'mongoose';
import type { IMessage } from '@shared/types/message';

export interface IMessageDocument extends Omit<IMessage, '_id'>, Document {}

const MessageSchema = new Schema<IMessageDocument>(
  {
    portfolioOwnerId: { type: String, required: true },
    visitorName: { type: String, required: true },
    visitorContact: { type: String, required: true },
    message: { type: String, required: true },
    submittedAt: { type: String, required: true, default: () => new Date().toISOString() },
  },
  { timestamps: true }
);

export const Message = mongoose.model<IMessageDocument>('Message', MessageSchema);
