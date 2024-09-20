import { Router } from 'express';
import { playGame, getRankingList } from '../controllers/gameController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';
import { validateRequest } from '../middlewares/validationMiddleware.js';
import { playGameSchema } from '../schemas/validationSchemas.js';

const router = Router();

router.post('/play', authenticateToken, validateRequest(playGameSchema), playGame); // 경기 결과 기록 (요청값 검증 + 토큰 필요)
router.get('/ranking', getRankingList); // 유저 랭킹 조회

export default router;