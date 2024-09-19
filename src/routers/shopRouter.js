import { Router } from 'express';
import { purchaseCash, getCashAmount, drawPlayer } from '../controllers/shopController.js';
import authMiddleware from "../middlewares/auth.middleware";

const router = Router();

router.post('/purchase',authMiddleware, purchaseCash);
router.get('/getCashAmount',authMiddleware, getCashAmount);
router.post('/draw',authMiddleware, drawPlayer);  // 선수 뽑기 기능 추가

export default router;