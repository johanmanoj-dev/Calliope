import { Router } from 'express';
import { getMyPortfolio, createPortfolio, updatePortfolio, publishPortfolio, getPublicPortfolio } from '../controllers/portfolio.controller';
import { requireAuth } from '../middleware/auth';

const router = Router();

// Public route
router.get('/public/:slug', getPublicPortfolio);

// Protect all other portfolio routes
router.use(requireAuth);

router.get('/me', getMyPortfolio);
router.post('/', createPortfolio);
router.put('/:id', updatePortfolio);
router.post('/:id/publish', publishPortfolio);

export default router;
