import { Router } from 'express';
import { purchaseCash, getCashAmount, drawPlayer, makePackcontroller } from "../controllers/shopController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import { validateRequest } from '../middlewares/validationMiddleware.js';
import { purchaseCashSchema, drawPlayerSchema, createPackSchema} from '../schemas/validationSchemas.js'; // 스키마 경로

const router = Router();

router.post('/purchase',authenticateToken, validateRequest(purchaseCashSchema), purchaseCash);
router.get('/getCashAmount',authenticateToken, getCashAmount);
router.post('/draw',authenticateToken, validateRequest(drawPlayerSchema), drawPlayer);  // 선수 뽑기 기능 추가
router.post('/makepack', validateRequest(createPackSchema), makePackcontroller)// 팩 만들기

export default router;