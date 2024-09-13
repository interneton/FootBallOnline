import express from 'express';

const app = express();

app.use(express.json());



app.listen(3000, () => {
  console.log(`포트 3000 서버가 시작`);
});
