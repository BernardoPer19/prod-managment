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
export const createToken = (user: UserType) => { }

