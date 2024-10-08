import { prisma } from "../utils/prisma/client.js";

// 선수 장착
export const equipPlayer = async (userId, soccerPlayerId) => {
  const player = await prisma.userPlayer.findFirst({
    where: {
      userId: userId,
      soccerPlayerId: soccerPlayerId,
    },
  });

  if (!player) {
    throw new Error('선수가 존재하지 않습니다');
  }

  return await prisma.userPlayer.update({
    where: { userPlayerId: player.userPlayerId },
    data: { isEquipped: true },
  });
};

// 선수 장착 해제
export const unequipPlayer = async (userId, soccerPlayerId) => {
  const player = await prisma.userPlayer.findFirst({
    where: {
      userId: userId,
      soccerPlayerId: soccerPlayerId,
    },
  });

  if (!player) {
    throw new Error('선수가 없거나 선수가 장착되어 있지 않습니다');
  }

  return await prisma.userPlayer.update({
    where: { userPlayerId: player.userPlayerId },
    data: { isEquipped: false },
  });
};

// 모든 선수 능력치 조회
export const getAllPlayerStats = async () => {
  return await prisma.soccerPlayer.findMany({
    select: {
      name: true,
      speed: true,
      goalDecision: true,
      shootPower: true,
      defense: true,
      stamina: true,
      rank: true,
    }
  });
};

// 자기 자신의 선수 명단 및 능력치 조회
export const getMyPlayer = async(userId)=>{
    return await prisma.userPlayer.findMany({
      where: { userId },
      select:{
        isEquipped: true, 
        soccerPlayer: {
          select: {
            soccerPlayerId: true,
            name: true,
            speed: true,
            goalDecision: true,
            shootPower: true,
            defense: true,
            stamina: true,
            rank: true
          }
        }
      }
    });
}

//장착된 선수
export const equipList = async(userId)=>{
  return await prisma.userPlayer.findMany({
    where:{
      isEquipped : true,
      userId
    },
    select:{
      soccerPlayer: {
        select: {
          soccerPlayerId: true,
          name: true,
          speed: true,
          goalDecision: true,
          shootPower: true,
          defense: true,
          stamina: true,
          rank : true
        }
      }
    }
  })
}

//특정 랭크 선수 조회
export const getPlayersByRank = async(rank) => {
  return await prisma.soccerPlayer.findMany({
    where: { rank },
    select: {
      name: true,
      speed: true,
      goalDecision: true,
      shootPower: true,
      defense: true,
      stamina: true,
    }
  });
}

export const createUserPlayer = async (userId, soccerPlayerId) => {
  return await prisma.userPlayer.create({
    data: {
      userId,
      soccerPlayerId,
      isEquipped: false
    }
  });
}

export const getRandomUser = async (userId) => {
  const user = await prisma.user.findFirst({ where: { userId } });
  if (!user) {
    throw new Error('User not found');
  }
  const userScore = user.score;
  let players = await prisma.user.findMany({
    where: {
      NOT: {
        userId: userId
      },
      score: {
        gte: userScore - 100,
        lte: userScore + 100
      }
    }
  });
  for (let i = 0; i < players.length; i++) {
    const playerCount = await prisma.userPlayer.count({
      where: {
        userId: players[i].userId,
        isEquipped: true
      }
    });
    if (playerCount < 3) {
      players[i] = null;
    }
  }
  
  players = players.filter(player => player !== null);
  console.log(players);
  return players;
};

export const createPlayer = async (playerData) => {
  return await prisma.soccerPlayer.create({
    data: playerData
  });
}

// 특정 이름으로 선수 확인
export const getPlayerByName = async (name) => {
  return await prisma.soccerPlayer.findFirst({
    where: { name },
    select: {
      name: true,
      speed: true,
      goalDecision: true,
      shootPower: true,
      defense: true,
      stamina: true,
      rank : true,
    }
  });
}
