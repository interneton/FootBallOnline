import express from 'express';
import authRouter from './routes/authRouter.js';
import playerRouter from './routes/playerRouter.js';
import gameRouter from './routes/gameRouter.js';
import shopRouter from './routes/shopRouter.js'; // 상점 라우터 (선수 뽑기 기능 포함)
import errorHandler from './middlewares/errorHandler.middleware.js';

const app = express();
app.use(express.json());

app.use('/auth', authRouter);       // 로그인 및 회원가입 처리
app.use('/players', playerRouter);  // 선수 관련 기능 처리
app.use('/game', gameRouter);       // 게임 플레이 및 랭킹 기능 처리
app.use('/shop', shopRouter);       // 캐시 및 선수 뽑기 처리
app.use(errorHandler);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});