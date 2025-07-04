import { Router } from "express";
import { AuthController } from "../controllers/AuthController";

const AuthRouter = Router();

// Ruta de registro
AuthRouter.post("/register", AuthController.registerC);
AuthRouter.post("/login", AuthController.loginUserController)
// Puedes agregar más rutas aquí en el futuro (login, logout, etc.)

export default AuthRouter;
