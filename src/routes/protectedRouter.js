import { Router } from 'express';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = Router();

// 보호된 엔드포인트
router.get('/protected-endpoint', authenticateToken, (req, res) => {
  // 인증된 사용자만 접근 가능
  const userId = req.user.userId; // userId 기반 접근
  res.status(200).json({ message: `사용자 ${userId}님, 보호된 리소스에 접근하였습니다.` });
});

export default router;
