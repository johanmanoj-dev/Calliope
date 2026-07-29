import { Request, Response, NextFunction } from 'express';
import { verifyGoogleToken, findOrCreateUser, generateSessionToken } from '../services/auth.service';
import { sendSuccess, sendError } from '../utils/response';
import { config } from '../config/env';
import { User } from '../models/User';
import { Portfolio } from '../models/Portfolio';
import { Message } from '../models/Message';

export const googleCallback = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { credential } = req.body;
    
    if (!credential) {
      sendError(res, 'Google credential token is missing', 400);
      return;
    }

    const payload = await verifyGoogleToken(credential);
    const user = await findOrCreateUser(payload);
    
    const token = generateSessionToken(user);
    
    const isProd = config.nodeEnv === 'production';
    
    // Set HTTP-only cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? 'none' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    sendSuccess(res, {
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        profilePicture: user.profilePicture,
        themePreference: user.themePreference,
      }
    }, 'Authentication successful');
  } catch (error) {
    next(error);
  }
};

export const logout = (req: Request, res: Response): void => {
  res.clearCookie('token');
  sendSuccess(res, null, 'Logged out successfully');
};

export const getMe = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = (req as any).user.userId;
    const user = await User.findById(userId).select('-__v');
    
    if (!user) {
      sendError(res, 'User not found', 404);
      return;
    }

    sendSuccess(res, { user });
  } catch (error) {
    next(error);
  }
};

export const updateProfilePicture = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = (req as any).user.userId;
    const { profilePicture } = req.body;
    
    if (!profilePicture) {
      sendError(res, 'profilePicture is required', 400);
      return;
    }

    const user = await User.findByIdAndUpdate(userId, { profilePicture }, { new: true }).select('-__v');
    if (!user) {
      sendError(res, 'User not found', 404);
      return;
    }

    sendSuccess(res, { user }, 'Profile picture updated successfully');
  } catch (error) {
    next(error);
  }
};

export const updateThemePreference = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = (req as any).user.userId;
    const { themePreference } = req.body;

    if (!themePreference || !['light', 'dark'].includes(themePreference)) {
      sendError(res, 'Invalid themePreference', 400);
      return;
    }

    const user = await User.findByIdAndUpdate(userId, { themePreference }, { new: true }).select('-__v');
    if (!user) {
      sendError(res, 'User not found', 404);
      return;
    }

    sendSuccess(res, { user }, 'Theme preference updated successfully');
  } catch (error) {
    next(error);
  }
};

export const deleteAccount = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = (req as any).user.userId;

    const user = await User.findById(userId);
    if (!user) {
      sendError(res, 'User not found', 404);
      return;
    }

    // Delete portfolio owned by this user
    await Portfolio.deleteOne({ ownerId: user._id.toString() });

    // Delete all contact messages sent to this user's portfolio
    await Message.deleteMany({ portfolioOwnerId: user._id.toString() });

    // Delete the user record
    await User.findByIdAndDelete(userId);

    // Clear the session cookie
    res.clearCookie('token');

    sendSuccess(res, null, 'Account deleted successfully');
  } catch (error) {
    next(error);
  }
};
