import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Access Token 생성
function createAccessToken(id) {
  return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
}

// Refresh Token 생성
function createRefreshToken(id) {
  return jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
}

export const registerUser = async (req, res, next) => {
  try {
    const { account, password, name, teamName } = req.body;

    // 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ account, password: hashedPassword, name, teamName });
    await newUser.save();

    res.status(201).json({ message: '회원가입 성공' });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
    try {
      const { account, password } = req.body;
  
      // 사용자 찾기
      const user = await User.findOne({ account });
      if (!user) return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
  
      // 비밀번호 확인
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(401).json({ message: '비밀번호가 틀립니다.' });
  
      const accessToken = createAccessToken(user._id);
      const refreshToken = createRefreshToken(user._id);

      res.cookie('accessToken', accessToken, { httpOnly: true });
      res.cookie('refreshToken', refreshToken, { httpOnly: true });
  
      res.status(200).json({ message: '로그인 성공', token });
    } catch (error) {
      next(error);
    }
};