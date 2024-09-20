import { Router } from 'express';
import { purchaseCash, getCashAmount, drawPlayer, makePackcontroller } from "../controllers/shopController.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import { validateRequest } from '../middlewares/validationMiddleware.js';
import { purchaseCashSchema, drawPlayerSchema } from '../schemas/validationSchemas.js'; // 스키마 경로

const router = Router();

router.post('/purchase',authMiddleware, validateRequest(purchaseCashSchema), purchaseCash);
router.get('/getCashAmount',authMiddleware, getCashAmount);
router.post('/draw',authMiddleware, validateRequest(drawPlayerSchema), drawPlayer);  // 선수 뽑기 기능 추가
router.post('/makepack',makePackcontroller)// 팩 만들기

export default router;