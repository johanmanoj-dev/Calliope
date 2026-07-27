import { Request, Response, NextFunction } from 'express';
import { Message } from '../models/Message';
import { Portfolio } from '../models/Portfolio';
import { sendSuccess, sendError } from '../utils/response';

export const submitMessage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { slug } = req.params;
    const { visitorName, visitorContact, message, honeypot } = req.body;

    // Basic honeypot spam protection
    if (honeypot) {
      // Spam bot filled in the hidden field, pretend success
      sendSuccess(res, null, 'Message sent successfully', 201);
      return;
    }

    const portfolio = await Portfolio.findOne({ slug, isPublished: true });
    if (!portfolio) {
      sendError(res, 'Portfolio not found', 404);
      return;
    }

    const newMessage = await Message.create({
      portfolioOwnerId: portfolio.ownerId,
      visitorName,
      visitorContact,
      message,
      submittedAt: new Date(),
    });

    sendSuccess(res, null, 'Message sent successfully', 201);
  } catch (error) {
    next(error);
  }
};

export const getInboxMessages = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = (req as any).user.userId;
    
    // Sort by newest first
    const messages = await Message.find({ portfolioOwnerId: userId })
      .sort({ submittedAt: -1 })
      .select('-__v');

    sendSuccess(res, { messages });
  } catch (error) {
    next(error);
  }
};
