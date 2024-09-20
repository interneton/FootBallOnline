import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

// Access Token 생성
const createAccessToken = (userId) => {
  return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
};

// Refresh Token 생성
const createRefreshToken = (userId) => {
  return jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
};

// 회원가입
export const signup = async (req, res) => {
  try {
    const { account, password, name } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        account,
        password: hashedPassword,
        name,
        cashAmount: 1000,  // 기본 캐시 설정
      },
    });

    res.status(201).json({ message: '회원가입 성공', newUser });
  } catch (error) {
    res.status(500).json({ message: '회원가입 실패', error });
  }
};

// 로그인
export const login = async (req, res) => {
  try {
    const { account, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { account },
    });

    if (!user) return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: '비밀번호가 틀렸습니다.' });

    // 토큰 생성
    const accessToken = createAccessToken(user.userId);
    const refreshToken = createRefreshToken(user.userId);

    res.cookie('accessToken', accessToken, { httpOnly: true });
    res.cookie('refreshToken', refreshToken, { httpOnly: true });

    res.status(200).json({ message: '로그인 성공', accessToken, refreshToken });
  } catch (error) {
    res.status(500).json({ message: '로그인 실패', error });
  }
};
