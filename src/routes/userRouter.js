import { Router } from 'express';
import { login, signup } from '../controllers/userController.js';

const router = Router();

router.post('/login', login);    // 로그인
router.post('/signup', signup);  // 회원가입

export default router;