import { NextFunction, Request, Response } from "express";
import { UserType } from "../types/AuthType";
import jwt from 'jsonwebtoken'


export const verify = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.access_token


        if (!token) {
            res.status(401).json({ message: "No autorizado: Token no proporcionado" });
            return
        }
        const jwtSecret = process.env.JWT_PASSWORD;
        if (!jwtSecret) {
            res.status(500).json({ message: "Error de configuración del servidor" });
            return
        }

        const decoded = jwt.verify(token, jwtSecret) as UserType;

        req.user = decoded;

        next();
    } catch (error) {

    }
}