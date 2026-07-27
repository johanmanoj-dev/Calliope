import { Router } from 'express';
import { getMyPortfolio, createPortfolio, updatePortfolio } from '../controllers/portfolio.controller';
import { requireAuth } from '../middleware/auth';

const router = Router();

// Protect all portfolio routes
router.use(requireAuth);

router.get('/me', getMyPortfolio);
router.post('/', createPortfolio);
router.put('/:id', updatePortfolio);

export default router;
