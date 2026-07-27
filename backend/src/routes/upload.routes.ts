import { Router } from 'express';
import { getUploadAuth } from '../controllers/upload.controller';
import { requireAuth } from '../middleware/auth';

const router = Router();

// Protect upload routes
router.use(requireAuth);

router.get('/auth', getUploadAuth);

export default router;
