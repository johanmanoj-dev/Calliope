import { Router } from 'express';
import { submitMessage, getInboxMessages } from '../controllers/message.controller';
import { requireAuth } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { MessageSubmissionSchema } from '@shared/schemas/portfolio'; // Wait, let's just use simple Zod validation locally or add to shared

const router = Router();

// Public route to submit a message to a portfolio
router.post('/:slug', submitMessage);

// Protected route to view inbox
router.use(requireAuth);
router.get('/', getInboxMessages);

export default router;
