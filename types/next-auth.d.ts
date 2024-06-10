import { UserRole } from "@prisma/client";
import { DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  role: UserRole;
  isTwoFactorEnabled: boolean;
  isOAuth: boolean;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}

// // src/types/next-auth.d.ts
// import { DefaultSession, DefaultUser } from "next-auth";
// import { DefaultJWT } from "next-auth/jwt";
// import { UserRole } from "@/app/generated/client"; // Adjust the import path if necessary

// // Extend DefaultUser to include additional properties
// export interface ExtendedUser extends DefaultUser {
//   id: string;
//   role: UserRole;
//   isTwoFactorEnabled: boolean;
//   isOAuth: boolean;
// }

// // Extend DefaultSession to include user role
// export interface ExtendedSession extends DefaultSession {
//   user: ExtendedUser;
// }

// // Extend DefaultJWT to include additional properties
// export interface ExtendedJWT extends DefaultJWT {
//   sub?: string;
//   role?: UserRole;
//   isTwoFactorEnabled?: boolean;
//   isOAuth?: boolean;
// }

// // Role type for user roles
// export type Role = UserRole;

// // Declare module augmentation for next-auth
// declare module "next-auth" {
//   interface User extends ExtendedUser {}
//   interface Session extends ExtendedSession {}
// }

// // Declare module augmentation for next-auth/jwt
// declare module "next-auth/jwt" {
//   interface JWT extends ExtendedJWT {}
// }
