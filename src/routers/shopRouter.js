import { Router } from 'express';
import { purchaseCash, getCashAmount, drawPlayer } from '../controllers/shopController.js';

const router = Router();

router.post('/purchase', purchaseCash);
router.get('/getCashAmount', getCashAmount);
router.post('/draw', drawPlayer);  // 선수 뽑기 기능 추가

export default router;