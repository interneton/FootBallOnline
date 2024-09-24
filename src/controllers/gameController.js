import { CustomError } from '../utils/customError.js';
import { getRandomUser, equipList } from '../services/playerService.js';
import { getUsername, recordMatchResult ,rankings} from '../services/gameService.js';

export const playGame = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const username = await getUsername(userId);

    // 유저와 상대방의 장착된 선수들의 스탯 합산
    const userPlayers = await equipList(userId);
    if (userPlayers.length < 3) {
      throw new CustomError("유저의 구단은 최소 3명의 선수로 구성되어야 합니다.", 400);
    }

    const Players = await getRandomUser(userId);
    if (Players.length === 0) {
      throw new CustomError("상대방 유저를 찾을 수 없습니다.", 400);
    }

    let opponentUser, opponentname, opponentPlayers;
    for (let attempts = 0; attempts < 50; attempts++) {
      const randomIndex = Math.floor(Math.random() * Players.length);
      opponentUser = Players[randomIndex];
      opponentname = await getUsername(opponentUser.userId);
      opponentPlayers = await equipList(opponentUser.userId);
      if (opponentPlayers.length >= 3) break;
    }

    if (opponentPlayers.length < 3) {
      throw new CustomError("충분한 유저를 찾지 못했습니다.", 400);
    }

    const calculateScore = (players) => {
      return players.reduce((sum, player) => {
        return sum + player.soccerPlayer.speed + player.soccerPlayer.goalDecision + player.soccerPlayer.shootPower + player.soccerPlayer.defense + player.soccerPlayer.stamina;
      }, 0);
    };

    const userScore = calculateScore(userPlayers);
    const opponentScore = calculateScore(opponentPlayers);

    // 경기 결과 기록
    const userResult = userScore > opponentScore ? 'win' : userScore < opponentScore ? 'loss' : 'draw';

    const result = {
      user: username,
      opponent: opponentname,
      userScore: userScore,
      opponentScore: opponentScore,
      result: userResult
    };

    await recordMatchResult(userId, opponentUser.userId, userResult, username, opponentname);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getRanking = async (req, res, next) => {
  try {
    let ranking= await rankings();
    if (!Array.isArray(ranking)) {
      throw new CustomError("랭킹 데이터가 유효하지 않습니다.", 500);
    }
    if (ranking.length === 0) {
      throw new CustomError("랭킹 데이터가 없습니다.", 404);
    }

    const sortedRankings = ranking
      .sort((a, b) => b.score - a.score)
      .slice(0, 100);

    res.status(200).json(sortedRankings);
  } catch (error) {
    next(error);
  }
};
