import { prisma } from "../utils/prisma/client.js";

export const recordMatchResult = async (userId, opponentId, result, username, opponentname) => {
  try {
    const [matchManager, opponentMatchManager] = await Promise.all([
      prisma.matchManager.findFirst({ where: { userId: userId } }),
      prisma.matchManager.findFirst({ where: { userId: opponentId } }),
    ]);

    const userMatchManager =
      matchManager ||
      (await prisma.matchManager.create({
        data: {
          userId: userId,
          winCount: 0,
          lossCount: 0,
          drawCount: 0,
        },
      }));

    const opponentManager =
      opponentMatchManager ||
      (await prisma.matchManager.create({
        data: {
          userId: opponentId,
          winCount: 0,
          lossCount: 0,
          drawCount: 0,
        },
      }));

    let updateData = {};
    let opponentUpdateData = {};
    let scoreChange = 0;
    let opponentresult = "";

    switch (result) {
      case "win":
        updateData = { winCount: userMatchManager.winCount + 1 };
        opponentUpdateData = { lossCount: opponentManager.lossCount + 1 };
        scoreChange = 10;
        opponentresult = "loss";
        break;
      case "loss":
        updateData = { lossCount: userMatchManager.lossCount + 1 };
        opponentUpdateData = { winCount: opponentManager.winCount + 1 };
        scoreChange = -10;
        opponentresult = "win";
        break;
      case "draw":
        updateData = { drawCount: userMatchManager.drawCount + 1 };
        opponentUpdateData = { drawCount: opponentManager.drawCount + 1 };
        opponentresult = "draw";
        break;
      default:
        throw new Error("잘못된 결과 값입니다.");
    }

    await prisma.$transaction(async (tx) => {
      tx.matchManager.update({
        where: { id: userMatchManager.id },
        data: updateData,
      }),
      tx.matchManager.update({
        where: { id: opponentManager.id },
        data: opponentUpdateData,
      }),
      tx.user.update({
        where: { userId: userId },
        data: { score: { increment: scoreChange } },
      }),
      tx.user.update({
        where: { userId: opponentId },
        data: { score: { increment: -scoreChange } },
      }),
      tx.fightRecord.create({
        data: {
          username: username,
          opponentname: opponentname,
          result: result,
        },
      }),
      tx.fightRecord.create({
        data: {
          username: opponentname,
          opponentname: username,
          result: opponentresult,
        },
      });
    });
  } catch (error) {
    console.error("경기 결과 기록 중 오류 발생:", error);
    throw error;
  }
};

export const getUsername = async (userId) => {
  try {
    const user = await prisma.user.findFirst({
      where: { userId: userId },
      select: { name: true },
    });
    return user?.name || null;
  } catch (error) {
    console.error("userId로 사용자 닉네임 조회 중 오류 발생:", error);
    throw error;
  }
};
