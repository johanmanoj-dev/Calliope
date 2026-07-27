import mongoose, { Schema, Document } from 'mongoose';
import type { IUser } from '@shared/types/user';

export interface IUserDocument extends Omit<IUser, '_id'>, Document {}

const UserSchema = new Schema<IUserDocument>(
  {
    googleId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    profilePicture: { type: String, required: true },
    themePreference: { type: String, enum: ['light', 'dark', 'system'], default: 'system' },
    portfolioRef: { type: Schema.Types.ObjectId, ref: 'Portfolio' },
  },
  { timestamps: true }
);

export const User = mongoose.model<IUserDocument>('User', UserSchema);
