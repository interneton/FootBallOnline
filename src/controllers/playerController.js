import * as playerService from "../services/playerService.js";
import { CustomError } from '../utils/customError.js'; 

// 선수 장착
export const equipPlayer = async (req, res, next) => {
  const { userId } = req.user;
  const { soccerPlayerId } = req.body;

  try {
    const equippedPlayer = await playerService.equipList(userId);
    const isequip = equippedPlayer.some(player=>player.soccerPlayer.soccerPlayerId===soccerPlayerId);
    
    if (equippedPlayer.length >= 3) {
      throw new CustomError("장착할 수 있는 선수는 최대 3명입니다.", 400);
    }

    if (isequip) {
      throw new CustomError("선수가 이미 장착되어 있습니다.", 409);
    }

    const result = await playerService.equipPlayer(userId, soccerPlayerId);
    res.status(200).json({message: "선수 장착 완료"});
  } catch (error) {
    next(error); // 에러를 next로 전달
  }
};

// 선수 장착 해제
export const unequipPlayer = async (req, res, next) => {
  const { userId } = req.user;
  const { soccerPlayerId } = req.body;

  try {
    const equippedPlayer = await playerService.equipList(userId);
    const isequip = equippedPlayer.some(player => player.soccerPlayer.soccerPlayerId === soccerPlayerId);
    
    if (!isequip) {
      throw new CustomError("장착된 선수가 아닙니다.", 404);
    }

    await playerService.unequipPlayer(userId, soccerPlayerId);
    res.status(200).json({message: "선수 장착 해제 완료"});
  } catch (error) {
    next(error); // 에러를 next로 전달
  }
};

// 모든 선수 능력치 조회
export const getAllPlayerStats = async (req, res, next) => {
  try {
    const players = await playerService.getAllPlayerStats();
    res.status(200).json(players);
  } catch (error) {
    next(error); // 에러를 next로 전달
  }
};

// 선수 만들기
export const createPlayer = async (req, res, next) => {
  const { name, speed, goalDecision, shootPower, defense, stamina, rank } = req.body;

  try {
    const existingPlayer = await playerService.getPlayerByName(name);
    if (existingPlayer && existingPlayer.rank === rank) {
      throw new CustomError("이름과 랭크가 동일한 선수가 이미 존재합니다.", 409);
    }
    const newPlayer = await 
    playerService.createPlayer({
      name,
      speed,
      goalDecision,
      shootPower,
      defense,
      stamina,
      rank
    });

    res.status(201).json({ message: "선수 생성 완료", player: newPlayer });
  } catch (error) {
    next(error); // 에러를 next로 전달
  }
};

