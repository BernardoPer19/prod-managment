import type { Role, Product } from '@prisma/client';

export interface UserType {
  userId: string;              // corresponde a user_id
  username: string;
  email: string;
  password?: string | null;    // puede ser opcional o null según Prisma
  avatarUrl?: string | null;   // igual que password
  createdAt: Date;
  lastLogin?: Date | null;
  isActive: boolean;
  rolId: number;               // corresponde a rol_id
  role?: Role | null;          // puede ser opcional o null si no se incluye la relación
  productos?: Product[] | null;// igual para productos
}


export type registerType = Pick<UserType, "email" | "username" | "password">

export type login = Pick<UserType, "email" | "password">

export interface Role {
    rolId: number;
    rol: string;
    users?: User[];
}