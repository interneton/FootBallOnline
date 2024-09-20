import { getRandomPlayer, equipList } from '../services/playerService.js';
import { recordMatchResult ,getUsername} from '../services/gameService.js';

export const playGame = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const randomPlayer = await getRandomPlayer();

    const username = await getUsername(userId);
    const opponentname = await getUsername(randomPlayer.id);

    // 유저와 상대방의 장착된 선수들의 스탯 합산
    const userPlayers = await equipList(userId);
    const opponentPlayers = await equipList(randomPlayer.id);

    if (userPlayers.length < 3 || opponentPlayers.length < 3) {
      throw new Error("양 팀 모두 최소 3명의 장착된 선수가 필요합니다.");
    }

    const userScore = userPlayers.reduce((sum, player) => {
      return sum + player.soccerPlayer.speed + player.soccerPlayer.goalDecision + player.soccerPlayer.shootPower + player.soccerPlayer.defense + player.soccerPlayer.stamina;
    }, 0);

    const opponentScore = opponentPlayers.reduce((sum, player) => {
      return sum + player.soccerPlayer.speed + player.soccerPlayer.goalDecision + player.soccerPlayer.shootPower + player.soccerPlayer.defense + player.soccerPlayer.stamina;
    }, 0);

    const result = {
      user: username,
      opponent: opponentname,
      userScore: userScore,
      opponentScore: opponentScore,
    };

    // 경기 결과 기록
    if (userScore > opponentScore) {
      await recordMatchResult(userId, 'win');
      await recordMatchResult(randomPlayer.id, 'loss');
    } else if (userScore < opponentScore) {
      await recordMatchResult(userId, 'loss');
      await recordMatchResult(randomPlayer.id, 'win');
    } else {
      await recordMatchResult(userId, 'draw');
      await recordMatchResult(randomPlayer.id, 'draw');
    }

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
      return res.status(200).json({ message: "랭킹이 없습니다." });
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

