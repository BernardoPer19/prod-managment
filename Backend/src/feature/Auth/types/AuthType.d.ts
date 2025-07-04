import type { Role, Product } from '@prisma/client';

export interface UserType {
  user_id: string;
  username: string;
  email: string;
  password: string | null;
  avatar_url: string | null;
  createdAt: Date;
  lastLogin: Date | null;
  isActive: boolean;
}


export type registerType = Pick<UserType, "email" | "username" | "password">

export type login = Pick<UserType, "email" | "password">

export interface Role {
  rolId: number;
  rol: string;
  users?: User[];
}