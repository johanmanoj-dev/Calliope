import { Router } from 'express';
import { googleCallback, logout, getMe, updateProfilePicture, updateThemePreference } from '../controllers/auth.controller';
import { requireAuth } from '../middleware/auth';

const router = Router();

router.post('/google', googleCallback);
router.post('/logout', requireAuth, logout);
router.get('/me', requireAuth, getMe);
router.patch('/profile-picture', requireAuth, updateProfilePicture);
router.patch('/theme', requireAuth, updateThemePreference);

export default router;
