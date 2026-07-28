import { Router } from 'express';
import { submitMessage, getInboxMessages, deleteMessage } from '../controllers/message.controller';
import { requireAuth } from '../middleware/auth';

const router = Router();

// Public route to submit a message to a portfolio
router.post('/:slug', submitMessage);

// Protected routes to view and delete inbox messages
router.use(requireAuth);
router.get('/', getInboxMessages);
router.delete('/:id', deleteMessage);

export default router;
