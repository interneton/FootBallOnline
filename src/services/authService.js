import { prisma } from "../utils/prisma/index.js";

export const getUser = async (email) => {
    try {
        return await prisma.user.findFirst({
            where: { account: email },
        });
    } catch (error) {
        console.error("이메일로 사용자 조회 중 오류 발생:", error);
        throw error;
    }
};

export const createUser = async (email, password, name, teamname) => {
    try {
        return await prisma.user.create({
            data: {
                account: email,
                password: password,
                name: name,
                teamName: teamname,
                cashAmount: 1000,
            },
        });
    } catch (error) {
        console.error("새 사용자 생성 중 오류 발생:", error);
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
