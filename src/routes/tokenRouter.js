import { Router } from 'express';
import { refreshAccessToken } from '../controllers/tokenController.js';

const router = Router();

router.post('/refresh-token', refreshAccessToken); 

export default router;
