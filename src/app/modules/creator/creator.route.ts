import express from 'express';
import { CreatorController } from './creator.controller';
import authMiddleware from '../../middleware/authMiddleware';

const router = express.Router();

router.get('/profile', authMiddleware(['creator', 'admin']), CreatorController.getProfile);
router.put('/profile', authMiddleware(['creator', 'admin']), CreatorController.updateProfile);
router.get('/analytics', authMiddleware(['creator', 'admin']), CreatorController.getAnalytics);
router.post('/series-application', authMiddleware(['user', 'creator', 'admin']), CreatorController.applyForSeries);

export const CreatorRoutes = router;
