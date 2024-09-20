import { prisma } from "../utils/prisma/index.js";

//전체 팩 정보 조회
export const getPackInfo = async () => {
  return await prisma.pack.findMany({
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
            SSPB: true,
            APB: true,
            BPB: true,
            CPB: true,
            FPB: true,
        },
    });
}
