import { Router } from 'express';
import { googleCallback, logout, getMe, updateProfilePicture, updateThemePreference, deleteAccount } from '../controllers/auth.controller';
import { requireAuth } from '../middleware/auth';

const router = Router();

router.post('/google', googleCallback);
router.post('/logout', requireAuth, logout);
router.get('/me', requireAuth, getMe);
router.patch('/profile-picture', requireAuth, updateProfilePicture);
router.patch('/theme', requireAuth, updateThemePreference);
router.delete('/account', requireAuth, deleteAccount);

export default router;
