import { prisma } from "@/config/prisma";
import { registerType, UserType } from "../types/AuthType";
import { User } from "@prisma/client";
import { RegisterTypeSchema } from "../schemas/AuthSchema";
import { comparePassword, hashingPassword } from "../utils/authUtils";

class AuthService {

    private foundUser = (id: string) => prisma.user.findUnique({ where: { user_id: id } });
    private existingEmail = (email: string) => prisma.user.findUnique({ where: { email } });


    public registerService = async (data: RegisterTypeSchema): Promise<User> => {
        try {
            // Verificar si ya existe un usuario con ese ID (opcional: depende de tu lógica)
            if (data.user_id) {
                const existingUser = await this.foundUser(data.user_id);
                if (existingUser) {
                    throw new Error("El usuario ya existe con ese ID");
                }
            }

            if (data.email) {
                const existingUser = await this.existingEmail(data.email);
                if (existingUser) {
                    throw new Error("El usuario ya existe con ese ID");
                }
            }

            const hashedPassword = await hashingPassword(data.password);

            const registerUser = await prisma.user.create({
                data: {
                    username: data.username,
                    email: data.email,
                    password: hashedPassword,
                },
            });

            return registerUser;
        } catch (error) {
            console.error("Error al registrar usuario:", error);
            throw new Error("No se pudo registrar el usuario");
        }
    };

    public loginService = async (email: string, password: string) => {
        try {

            const user = await this.existingEmail(email)
            if (!user) {
                throw new Error("No existe el usuario")
            }

            const compareUserPassword = await comparePassword(password, user.password!)
            if (!compareUserPassword) {
                throw new Error("Contraseña incorrecta")
            }
            return user
        } catch (error) {
            throw new Error("Error al iniciar sesion");

        }
    }

    public getUserProfile = async (user_id:string) => {
        try {
            const user = await prisma.user.findUnique({
                where: {user_id}
            })

            if (!user) {
                throw new Error("No se encontro el usuario");
                
            }

            return user
        } catch (error) {
            
        }
    }

}

export const authService = new AuthService()