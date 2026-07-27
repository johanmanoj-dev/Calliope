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

export const updatePortfolio = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = (req as any).user.userId;
    const { id } = req.params;

    // Validate that the portfolio belongs to the user
    const portfolio = await Portfolio.findOne({ _id: id, ownerId: userId });
    if (!portfolio) {
      sendError(res, 'Portfolio not found', 404);
      return;
    }

    // Partial update using the $set operator via findByIdAndUpdate
    // We pass req.body directly, but in a real app we'd validate the structure with Zod here.
    const updatedPortfolio = await Portfolio.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true, runValidators: true }
    ).select('-__v');

    sendSuccess(res, { portfolio: updatedPortfolio });
  } catch (error) {
    next(error);
  }
};
