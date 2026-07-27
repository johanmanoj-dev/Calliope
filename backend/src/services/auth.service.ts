import jwt from 'jsonwebtoken';
import { googleClient } from '../config/google';
import { config } from '../config/env';
import { User } from '../models/User';
import type { IAuthPayload } from '@shared/types/user';

export const verifyGoogleToken = async (idToken: string) => {
  const ticket = await googleClient.verifyIdToken({
    idToken,
    audience: config.google.clientId,
  });
  
  const payload = ticket.getPayload();
  if (!payload || !payload.email) {
    throw new Error('Invalid Google token');
  }

  return payload;
};

export const findOrCreateUser = async (googlePayload: any) => {
  const { sub: googleId, email, name, picture: profilePicture } = googlePayload;

  let user = await User.findOne({ googleId });

  if (!user) {
    // If not found by googleId, check if email exists (edge case)
    user = await User.findOne({ email });
    if (user) {
      user.googleId = googleId;
      await user.save();
    } else {
      user = await User.create({
        googleId,
        email,
        name,
        profilePicture,
      });
    }
  } else if (user.profilePicture !== profilePicture || user.name !== name) {
    // Sync profile updates from Google
    user.profilePicture = profilePicture || user.profilePicture;
    user.name = name || user.name;
    await user.save();
  }

  return user;
};

export const generateSessionToken = (user: any): string => {
  const payload: IAuthPayload = {
    userId: user._id.toString(),
    email: user.email,
    name: user.name,
  };

  return jwt.sign(payload, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn,
  });
};
