import { UserType } from "../AuthTypes";


export {};

declare global {
  namespace Express {
    interface Request {
      user?: UserType;
    }
  }
}