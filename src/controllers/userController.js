import { signupService, loginService, createAccessToken, createRefreshToken } from '../services/userService.js';
import { CustomError } from '../utils/customError.js'; 

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
