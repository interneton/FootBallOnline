import express from 'express';
import swaggerUi from 'swagger-ui-express';
import userRouter from './routes/userRouter.js';
import playerRouter from './routes/playerRouter.js';
import gameRouter from './routes/gameRouter.js';
import shopRouter from './routes/shopRouter.js';
import { errorHandler } from './middlewares/errorMiddleware.js';

import YAML from 'yamljs';

const app = express();
app.use(express.json());

const swaggerDocument = YAML.load('./swagger.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// 라우터 연결
app.use('/users', userRouter);
app.use('/players', playerRouter);
app.use('/game', gameRouter);
app.use('/shop', shopRouter);

app.use(errorHandler);

app.listen(3000, () => {
  console.log('서버가 3000포트로 실행되었습니다');
});
