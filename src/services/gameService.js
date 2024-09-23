import { prisma } from "../utils/prisma/index.js";

export const recordMatchResult = async (userId, opponentId, result, username, opponentname) => {
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

        let opponentMatchManager = await prisma.matchManager.findUnique({
            where: { userId: opponentId },
        });

        if (!opponentMatchManager) {
            opponentMatchManager = await prisma.matchManager.create({
                data: {
                    userId: opponentId,
                    winCount: 0,
                    lossCount: 0,
                    drawCount: 0,
                },
            });
        }

        let updateData = {};
        let opponentUpdateData = {};
        let scoreChange = 0;
        let opponentresult = '';

        if (result === 'win') 
        {
            updateData = { winCount: matchManager.winCount + 1 };
            opponentUpdateData = { lossCount: opponentMatchManager.lossCount + 1 };
            scoreChange = 10;
            opponentresult = 'loss'
        } 
        else if (result === 'loss') 
        {
            updateData = { lossCount: matchManager.lossCount + 1 };
            opponentUpdateData = { winCount: opponentMatchManager.winCount + 1 };
            scoreChange = -10;
            opponentresult = 'win'
        } 
        else if (result === 'draw') 
        {
            updateData = { drawCount: matchManager.drawCount + 1 };
            opponentUpdateData = { drawCount: opponentMatchManager.drawCount + 1 };
            opponentresult = 'draw'
        } 
        else 
        {
            throw new Error("잘못된 결과 값입니다.");
        }

        await prisma.matchManager.update({
            where: { userId: userId },
            data: updateData,
        });

        await prisma.matchManager.update({
            where: { userId: opponentId },
            data: opponentUpdateData,
        });

        await prisma.user.update({
            where: { userId: userId },
            data: { score: { increment: scoreChange } },
        });

        await prisma.user.update({
            where: { userId: opponentId },
            data: { score: { increment: -scoreChange } },
        });

        await prisma.fightRecord.create({
            data: {
                username: username,
                opponentname: opponentname,
                result: result,
            },
        });

        await prisma.fightRecord.create({
            data: {
                username: opponentname,
                opponentname: username,
                result: opponentresult,
            },
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