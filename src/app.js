import express from 'express';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors'; // CORS 미들웨어 추가
import userRouter from './routes/userRouter.js';
import playerRouter from './routes/playerRouter.js';
import gameRouter from './routes/gameRouter.js';
import shopRouter from './routes/shopRouter.js';
import { errorHandler } from './middlewares/errorMiddleware.js';
import { logMiddleware } from './middlewares/logMiddleware.js';
import dotenv from 'dotenv';

import YAML from 'yamljs';

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use(logMiddleware);

const swaggerDocument = YAML.load('./swagger.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/users', userRouter);
app.use('/players', playerRouter);
app.use('/game', gameRouter);
app.use('/shop', shopRouter);

app.use(errorHandler);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`서버가 ${PORT} 포트로 실행되었습니다`);
});
