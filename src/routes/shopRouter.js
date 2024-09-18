import { Router } from 'express';
import { drawPlayer } from '../controllers/shopGacha.js';

const router = Router();

// 선수 뽑기 (가챠) 라우터
router.post('/draw', drawPlayer);

export default router;