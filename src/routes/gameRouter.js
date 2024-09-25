import { Router } from 'express';
import { playGame, getRanking } from '../controllers/gameController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/play', authenticateToken, playGame); // 경기 결과 기록 (요청값 검증 + 토큰 필요)
router.get('/ranking', getRanking); // 유저 랭킹 조회


export default router;