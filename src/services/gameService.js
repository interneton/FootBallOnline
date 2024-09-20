import { prisma } from "../utils/prisma/index.js";

export const recordMatchResult = async (userId, result) => {
    try {
        let matchManager = await prisma.matchManager.findUnique({
            where: { userId: userId },
        });

        if (!matchManager) {
            matchManager = await prisma.matchManager.create({
                data: {
                    userId: userId,
                    winCount: 0,
                    lossCount: 0,
                    drawCount: 0,
                },
            });
        }

        let updateData = {};
        if (result === 'win') {
            updateData = { winCount: matchManager.winCount + 1 };
        } else if (result === 'loss') {
            updateData = { lossCount: matchManager.lossCount + 1 };
        } else if (result === 'draw') {
            updateData = { drawCount: matchManager.drawCount + 1 };
        } else {
            throw new Error("잘못된 결과 값입니다.");
        }

        await prisma.matchManager.update({
            where: { userId: userId },
            data: updateData,
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