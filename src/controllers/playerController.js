import * as playerService from "../services/playerService";

// 선수 장착
export const equipPlayer = async (req, res, next) => {
  const { userId } = req.user;
  const { soccerPlayerId } = req.body;
  try {
    const result = await playerService.equipPlayer(userId, soccerPlayerId);
    res.status(200).json(result);
  } catch (error) {
    next(error); // 에러를 next로 전달
  }
};

// 선수 장착 해제
export const unequipPlayer = async (req, res, next) => {
  const { userId } = req.user;
  const { soccerPlayerId } = req.body;
  try {
    const result = await playerService.unequipPlayer(userId, soccerPlayerId);
    res.status(200).json(result);
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
