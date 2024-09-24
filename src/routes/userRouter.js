import { Router } from 'express';
import { login, signup, refreshAccessToken } from '../controllers/userController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';
import { getUser } from '../controllers/userController.js';

const router = Router();

router.post('/login', login);    // 로그인
router.post('/signup', signup);  // 회원가입
router.post('/refresh-token', refreshAccessToken); // 토큰 갱신
router.get('/protected-endpoint', authenticateToken, (req, res) => {
    const userId = req.user.userId;  // 인증된 사용자의 userId를 이용
    res.status(200).json({ message: `사용자 ${userId}님, 보호된 리소스에 접근하였습니다.` });
});
router.get('/:id', getUser);

export default router;