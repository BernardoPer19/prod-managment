import { Request, Response } from "express";
import { authService } from "../services/AuthService";
import { RegisterTypeSchema, validateRegister } from "../schemas/AuthSchema";



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
                error: "Ocurrió un error al registrarse"
            });
        }
    }

}

