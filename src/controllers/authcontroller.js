import { createUser, getUser } from "../services/authService.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

export const signup = async (req, res, next) => {
    const { email, password, name, teamname } = req.body;
    const emailRegex = /^[a-z0-9]+$/; // 정규표현식 사용
    const passwordRegex = /^.{6,}$/;

    try {
        if (!emailRegex.test(email)) throw new Error("유효하지 않은 이메일입니다.");
        if (!passwordRegex.test(password)) throw new Error("유효하지 않은 비밀번호입니다.");

        const hashedPassword = await bcrypt.hash(password, 10);
        const isUserEmail = await getUser(email);

        if (isUserEmail) throw new Error("이 이메일을 사용할 수 없습니다.");
        
        const newUser = await createUser(email, hashedPassword, name, teamname);

        return res.status(201).json({ message: "회원가입 성공" });
        
    } catch (error) {
        next(error);
    }
};

export const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const isuseremail = await getUser(email);
        
        if (!isuseremail) throw new Error("아이디가 존재하지 않습니다.");
        else if (!(await bcrypt.compare(password, isuseremail.password))) throw new Error("비밀번호가 일치하지 않습니다.");

        const accesstoken = jwt.sign({ userId: isuseremail.id }, JWT_SECRET, { expiresIn: '1h' });
        const refreshtoken = jwt.sign({ userId: isuseremail.id }, JWT_REFRESH_SECRET, { expiresIn: '7d' });

        return res.status(200).json({ message: "로그인 성공", accesstoken, refreshtoken });
    } catch (error) {
        next(error);
    }
};

