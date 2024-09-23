export const refreshAccessToken = async (req, res, next) => {
    const { refreshToken } = req.body;
    
    if (!refreshToken) {
      return res.status(403).json({ message: 'Refresh Token이 없습니다.' });
    }
  
    try {
      const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
      const accessToken = createAccessToken(decoded.id);
      res.status(200).json({ accessToken });
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return res.status(403).json({ message: 'Refresh Token이 만료되었습니다.' });
      } 
      res.status(403).json({ message: '유효하지 않은 Refresh Token입니다.' });
    }
};
  