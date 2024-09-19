import { prisma } from "../utils/prisma/index.js";

export const getUser = async (email) => {
    try {
        const user = await prisma.user.findUnique({
            where: { email: email },
        });
        return user;
    } catch (error) {
        console.error("Error fetching user by email:", error);
        throw error;
    }
};

export const createUser = async (email, password) => {
    try {
        const newUser = await prisma.user.create({
            data: {
                email: email,
                password: password,
            },
        });
        return newUser;
    } catch (error) {
        console.error("Error creating new user:", error);
        throw error;
    }
};

