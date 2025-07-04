import { CookieOptions, Request, Response } from "express";
import { authService } from "../services/AuthService";
import { LoginType, RegisterTypeSchema, validateLogin, validateRegister } from "../schemas/AuthSchema";
import { createToken } from "../utils/authUtils";



export class AuthController {

    public static registerC = async (req: Request, res: Response) => {
        try {
            const validatedData: RegisterTypeSchema = validateRegister(req.body);
            const newUser = await authService.registerService(validatedData)

            res.status(200).json({
                succes: "Te registraste correctamente",
                userInfo: newUser
            })

        } catch (error) {
            console.error("Error en registro:", error);
            res.status(400).json({
                error
            });
        }
    }


    public static loginUserController = async (req: Request, res: Response) => {
        try {
            const valiteLogin: LoginType = validateLogin(req.body);

            const user = await authService.loginService(valiteLogin.email, valiteLogin.password);

            const token = createToken(user);

            const options: CookieOptions = {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                maxAge: 24 * 60 * 60 * 1000,
            };

            res
                .status(200)
                .cookie("access_token", token, options)
                .json({
                    message: "El usuario inició sesión con éxito!",
                    user,
                });
        } catch (error) {
            throw new Error("Error al iniciar sesion");

        }
    }

}

