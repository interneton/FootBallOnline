import express from 'express';
import { registerUser, loginUser } from '../controllers/userController.js';

const router = express.Router();

router.post('/register', registerUser); // 회원가입
router.post('/login', loginUser);       // 로그인 (Access/Refresh Token 발급)

export default router;
