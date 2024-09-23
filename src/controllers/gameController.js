import { getRandomUser, equipList  } from '../services/playerService.js';
import { recordMatchResult ,getUsername} from '../services/gameService.js';
import { CustomError } from '../utils/customError.js';

export const playGame = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const username = await getUsername(userId);
    console.log(userId)
    // 유저와 상대방의 장착된 선수들의 스탯 합산
    const userPlayers = await equipList(userId);
    if (userPlayers.length < 3) {
      throw new CustomError("유저의 구단은 최소 3명의 선수로 구성되어야 합니다.", 400);
    }

    const Players = await getRandomUser(userId);
    if (Players.length === 0) {
      throw new CustomError("상대방 유저를 찾을 수 없습니다.", 400);
    }
    
    let randomIndex = Math.floor(Math.random() * Players.length);
    let opponentUser = Players[randomIndex];
    let opponentname = await getUsername(opponentUser.userId);
    let opponentPlayers = await equipList(opponentUser.userId);

    let attempts = 0;
    const maxAttempts = 50;
    while (opponentPlayers.length < 3 && attempts < maxAttempts) {
      randomIndex = Math.floor(Math.random() * Players.length);
      opponentUser = Players[randomIndex];
      opponentname = await getUsername(opponentUser.userId);
      opponentPlayers = await equipList(opponentUser.userId);
      attempts++;
    }
    if (opponentPlayers.length < 3) {
      throw new CustomError("충분한 유저를 찾지 못했습니다.", 400);
    }

    const userScore = userPlayers.reduce((sum, player) => {
      return sum + player.soccerPlayer.speed + player.soccerPlayer.goalDecision + player.soccerPlayer.shootPower + player.soccerPlayer.defense + player.soccerPlayer.stamina;
    }, 0);

    const opponentScore = opponentPlayers.reduce((sum, player) => {
      return sum + player.soccerPlayer.speed + player.soccerPlayer.goalDecision + player.soccerPlayer.shootPower + player.soccerPlayer.defense + player.soccerPlayer.stamina;
    }, 0);

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
    const rankings = await prisma.matchManager.findMany({
      select: {
        userId: true,
        winCount: true,
        lossCount: true,
      },
    });

    if (rankings.length === 0) {
      throw new CustomError("랭킹 데이터가 없습니다.", 404);
    }

    const sortedRankings = rankings
      .map((rank) => ({
        userId: rank.userId,
        score: rank.winCount * 10 + rank.lossCount * 7,
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 100);

    res.status(200).json(sortedRankings);
  } catch (error) {
    next(error);
  }
};

