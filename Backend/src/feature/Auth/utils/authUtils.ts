import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserType } from "../types/AuthType";



export const comparePassword = async (password: string, hashPassword: string) => {
    const compare = await bcrypt.compare(password, hashPassword)
    return compare
}
export const hashingPassword = async (password: string) => {
    const hash = await bcrypt.hash(password, 10)
    return hash
}
export const createToken = (user: UserType): string => {
    const jwtToken = process.env.JWT_PASSWORD;

    if (!jwtToken) {
        throw new Error("JWT_PASSWORD environment variable is not defined");
    }

    const token = jwt.sign(
        {
            user_id: user.user_id,
            username: user.username,
            email: user.email,
        },
        jwtToken,
        { expiresIn: "24h" }
    );
    return token;
}

