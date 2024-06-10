import { UserRole } from "@prisma/client";
import { DefaultSession, DefaultUser } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

export interface ExtendedUser extends DefaultUser {
  id: string;
  email: string;
  password?: string; // Optional to reflect the real-world scenario
  role: UserRole;
  isTwoFactorEnabled: boolean;
  isOAuth: boolean;
}

export interface ExtendedSession extends DefaultSession {
  user: ExtendedUser;
}

export interface ExtendedJWT extends DefaultJWT {
  sub?: string;
  role?: UserRole;
  isTwoFactorEnabled?: boolean;
  isOAuth?: boolean;
}

declare module "next-auth" {
  interface User extends ExtendedUser {}
  interface Session extends ExtendedSession {}
}

declare module "next-auth/jwt" {
  interface JWT extends ExtendedJWT {}
}