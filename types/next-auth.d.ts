import { UserRole } from "@prisma/client";
import { DefaultSession, DefaultUser } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

export interface ExtendedUser extends DefaultUser {
  id: string; // Ensure id is always a string
  email: string;
  emailVerified: Date | null;
  password?: string;
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
