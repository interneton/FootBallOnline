import prisma from '../prismaClient'; // Prisma 클라이언트 임포트

// 선수 장착
export const equipPlayer = async (userId, soccerPlayerId) => {
  return await prisma.userPlayer.updateMany({
    where: { userId, soccerPlayerId },
    data: { isEquipped: true },
  });
};

// 선수 장착 해제
export const unequipPlayer = async (userId, soccerPlayerId) => {
  return await prisma.userPlayer.updateMany({
    where: { userId, soccerPlayerId },
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
      stamina: true
    }
  });
};

// 자기 자신의 선수 명단 및 능력치 조회
export const getAllMyPlayer = async(userId)=>{
    return await prisma.userPlayer.findMany({
      where: { userId },
      select:{
        soccerPlayer: {
          select: {
            name: true,
            speed: true,
            goalDecision: true,
            shootPower: true,
            defense: true,
            stamina: true
          }
        }
      }
    });
}

//장착된 선수
export const equipList = async()=>{
  return await prisma.userPlayer.findMany({
    where:{
      isEquipped :true,
    },
    select:{
      soccerPlayer: {
        select: {
          name: true,
          speed: true,
          goalDecision: true,
          shootPower: true,
          defense: true,
          stamina: true
        }
      }
    }
  })
}