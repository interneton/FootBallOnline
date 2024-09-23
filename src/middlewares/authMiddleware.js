import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: '인증 토큰이 없습니다.' });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      // 토큰 만료 처리
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ message: '토큰이 만료되었습니다.' });
      }
      // 그 외의 유효하지 않은 토큰 처리
      return res.status(403).json({ message: '유효하지 않은 토큰입니다.' });
    }
    
    req.user = { userId: +decoded.userId };
    next();
  });
};

