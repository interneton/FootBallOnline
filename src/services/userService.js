import { prisma } from "../utils/prisma/client.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


// Access Token 생성
export const createAccessToken = (userId) => {
  return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
};

// Refresh Token 생성
export const createRefreshToken = (userId) => {
  return jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
};

// 회원가입 서비스
export const signupService = async (account, password, name, teamName) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      account,
      password: hashedPassword,
      name,
      teamName,
      cashAmount: 1000, // 기본 캐시 설정
    },
  });

  return newUser;
};

// 로그인 서비스
export const loginService = async (account, password) => {
  const user = await prisma.user.findUnique({
    where: { account },
  });

  if (!user) throw new Error('사용자를 찾을 수 없습니다.');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('비밀번호가 틀렸습니다.');

  return user;
};
