import { Router } from 'express';
import { equipPlayer, unequipPlayer, getAllPlayerStats, createPlayer } from '../controllers/playerController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';
import { validateRequest } from '../middlewares/validationMiddleware.js';
import { equipPlayerSchema, upgradePlayerSchema, registerPlayerSchema } from '../schemas/validationSchemas.js'; // 스키마 경로

const router = Router();

router.post('/equip', authenticateToken, validateRequest(equipPlayerSchema), equipPlayer); // 선수 장착 (요청값 검증 + 토큰 필요)
router.post('/unequip', authenticateToken, validateRequest(equipPlayerSchema), unequipPlayer); // 선수 장착 해제 (요청값 검증 + 토큰 필요)
router.get('/stats', getAllPlayerStats); // 모든 선수 능력치 조회
/*router.post('/upgrade', authenticateToken, validateRequest(upgradePlayerSchema), upgrade); // 선수 강화 (요청값 검증 + 토큰 필요)*/
router.post('/register', authenticateToken, validateRequest(registerPlayerSchema), createPlayer );

export default router;
