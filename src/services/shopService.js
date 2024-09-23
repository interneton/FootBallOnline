import { prisma } from "../utils/prisma/client.js";

//전체 팩 정보 조회
export const getPackInfo = async () => {
  return await prisma.pack.findMany({
    select: {
      name: true,
      price: true,
      sspb: true,
      apb: true,
      bpb: true,
      cpb: true,
      fpb: true,
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
        where: { id },
        select: {
            name: true,
            price: true,
            sspb: true,
            apb: true,
            bpb: true,
            cpb: true,
            fpb: true,
        },
    });
}

//팩 만들기
export const makePack = async (packname, sspb, apb, bpb, cpb, fpb, price) => {
  return await prisma.pack.create({
    data: {
      name: packname,
      sspb: sspb,
      apb: apb,
      bpb: bpb,
      cpb: cpb,
      fpb: fpb,
      price: price
      
    },
  });
};

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
        stamina: true
      }
    });
  }