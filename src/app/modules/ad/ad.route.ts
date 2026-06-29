import express from 'express';
import { AdController } from './ad.controller';
import authMiddleware from '../../middleware/authMiddleware';

const router = express.Router();

router.post('/earn', authMiddleware(['user', 'creator', 'moderator', 'admin']), AdController.earnAdPoints);

export const AdRoutes = router;
