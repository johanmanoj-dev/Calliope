import { Request, Response, NextFunction } from 'express';
import { Portfolio } from '../models/Portfolio';
import { User } from '../models/User';
import { sendSuccess, sendError } from '../utils/response';

export const getMyPortfolio = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = (req as any).user.userId;
    const portfolio = await Portfolio.findOne({ ownerId: userId }).select('-__v');

    sendSuccess(res, { portfolio });
  } catch (error) {
    next(error);
  }
};

export const createPortfolio = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = (req as any).user.userId;

    const existingPortfolio = await Portfolio.findOne({ ownerId: userId });
    if (existingPortfolio) {
      sendError(res, 'Portfolio already exists', 400);
      return;
    }

    const portfolio = await Portfolio.create({
      ownerId: userId,
      hero: {},
      about: {},
      skills: [],
      projects: [],
      education: [],
      experience: [],
      contact: {},
      socialLinks: [],
    });

    // Link portfolio to user
    await User.findByIdAndUpdate(userId, { portfolioRef: portfolio._id });

    sendSuccess(res, { portfolio }, 'Portfolio created successfully', 201);
  } catch (error) {
    next(error);
  }
};
