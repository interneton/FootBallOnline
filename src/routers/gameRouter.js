import { Router } from 'express';
import { playGame, getRanking } from '../controllers/gameController.js';

const router = Router();

router.post('/play', playGame);
router.get('/ranking', getRanking);

export default router;