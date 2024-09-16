import express from "express";
import { equipPlayer, unequipPlayer, getAllPlayerStats} from "../controllers/playerController";
import authMiddleware from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/equip", authMiddleware, equipPlayer);
router.post("/unequip", authMiddleware, unequipPlayer);
router.get("/stats", authMiddleware, getAllPlayerStats);

export default router;
