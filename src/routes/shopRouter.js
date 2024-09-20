import { Router } from 'express';
import { purchaseCash, getCashAmount, drawPlayer, makePackcontroller } from "../controllers/shopController.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

router.post('/purchase',authMiddleware, purchaseCash);
router.get('/getCashAmount',authMiddleware, getCashAmount);
router.post('/draw',authMiddleware, drawPlayer);  // 선수 뽑기 기능 추가
router.post('/makepack',makePackcontroller)// 팩 만들기

export default router;