import { prisma } from "../utils/prisma/client.js";

//전체 팩 정보 조회
export const getPackInfo = async () => {
  return await prisma.pack.findMany({
    select: {
      id: true,
      name: true,
      price: true,
      SSPB: true,
      APB: true,
      BPB: true,
      CPB: true,
      FPB: true,
    },
  });
};

// 캐시 구매 및 사용
export const purch = async (userId, amount) => {
  return await prisma.user.update({
    where: { userId },
    data: { cashAmount: amount },
  });
};

// 현재 캐시 잔액 조회
export const getCash = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { userId },
    select: { cashAmount: true },
  });
  return user.cashAmount;
};

//팩 정보
export const getPackInfoOne = async(id)=>{
    return await prisma.pack.findFirst({
        where: { id: parseInt(id) },
        select: {
            name: true,
            price: true,
            SSPB: true,
            APB: true,
            BPB: true,
            CPB: true,
            FPB: true,
        },
    });
}

//팩 만들기
export const makePack = async (packname, SSPB, APB, BPB, CPB, FPB, price) => {
  return await prisma.pack.create({
    data: {
      name: packname,
      SSPB: SSPB,
      APB: APB,
      BPB: BPB,
      CPB: CPB,
      FPB: FPB,
      price: price
      
    },
  });
};

//특정 랭크 선수 조회
export const getPlayersByRank = async(rank) => {
    return await prisma.soccerPlayer.findMany({
      where: { rank },
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
    });
  }

  export const createUserPlayer = async (userId, playerId) => {
    return await prisma.userPlayer.create({
      data: {
        userId: userId,
        soccerPlayerId: playerId,
      },
    });
  }