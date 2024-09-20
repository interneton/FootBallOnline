import * as playerService from "../services/playerService.js";

// 선수 장착
export const equipPlayer = async (req, res, next) => {
  const { userId } = req.user;
  const { soccerPlayerId } = req.body;

  try {
    const equippedPlayer = await playerService.equipList(userId);
    const isequip = equip.some(player=>player.soccerPlayer.soccerPlayerId===soccerPlayerId);
    
    if (equippedPlayer.length >= 3) throw new Error("장착할 수 있는 선수는 최대 3명입니다.");
    if (isequip) throw new Error("캐릭터가 이미 장착되어있습니다.")

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
  
    if (!isequip) throw new Error("장착된 선수가 아닙니다.");

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
