import express from 'express';
import authRouter from './routes/authRouter.js';
import playerRouter from './routes/playerRouter.js';
import gameRouter from './routes/gameRouter.js';
import shopRouter from './routes/shopRouter.js'; // 상점 라우터 (선수 뽑기 기능 포함)
import ErrorHandlingMiddleware from './middlewares/error-handling.middleware.js';

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.use('/players', playerRouter);
app.use(ErrorHandlingMiddleware)

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});