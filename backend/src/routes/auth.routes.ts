import { Router } from 'express';
import { googleCallback, logout, getMe } from '../controllers/auth.controller';
import { requireAuth } from '../middleware/auth';

const router = Router();

router.post('/google', googleCallback);
router.post('/logout', requireAuth, logout);
router.get('/me', requireAuth, getMe);

export default router;
