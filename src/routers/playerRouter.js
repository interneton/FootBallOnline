import express from "express";
import { equipPlayer, unequipPlayer, getAllPlayerStats, createPlayer} from "../controllers/playercontroller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/equip", authMiddleware, equipPlayer);
router.post("/unequip", authMiddleware, unequipPlayer);
router.get("/stats", getAllPlayerStats);
router.post("/createPlayer",createPlayer);

export default router;
