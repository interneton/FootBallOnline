import { signupService, loginService, createAccessToken, createRefreshToken } from '../services/userService.js';
import { CustomError } from '../utils/customError.js';
import { prisma } from '../utils/prisma/client.js';
import jwt from 'jsonwebtoken'; 

export const signup = async (req, res, next) => {
  try {
    const { account, password, name, teamName } = req.body;
    const newUser = await signupService(account, password, name, teamName);
    res.status(201).json({ message: '회원가입 성공', newUser });
  } catch (error) {
    next(new CustomError('회원가입 실패: ' + error.message, 500));
  }
};

export const login = async (req, res, next) => {
  try {
    const { account, password } = req.body;
    const user = await loginService(account, password);

    const accessToken = createAccessToken(user.userId);
    const refreshToken = createRefreshToken(user.userId);

    res.status(200).json({ message: '로그인 성공', accessToken, refreshToken });
  } catch (error) {
    next(new CustomError('로그인 실패: ' + error.message, 500));
  }
};

// 유저 정보 조회
export const getUser = async (req, res, next) => {
  try {
    const userId = parseInt(req.params.id, 10); // 10진수로 변환
    if (isNaN(userId)) {
      throw new CustomError('유효하지 않은 사용자 ID입니다.', 400);
    }

    const user = await prisma.user.findUnique({
      where: { userId: userId },
    });

    if (!user) {
      throw new CustomError('사용자를 찾을 수 없습니다.', 404);
    }

    res.status(200).json(user);
  } catch (error) {
    next(new CustomError(`유저 정보 조회 실패: ${error.message}`, 500));
  }
};

// Refresh Token으로 Access Token 재발급
export const refreshAccessToken = async (req, res, next) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return next(new CustomError('Refresh Token이 없습니다.', 403));
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const accessToken = createAccessToken(decoded.userId);
    res.status(200).json({ accessToken });
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return next(new CustomError('Refresh Token이 만료되었습니다.', 403));
    }
    next(new CustomError('유효하지 않은 Refresh Token입니다.', 403));
  }
};