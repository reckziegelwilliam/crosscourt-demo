import { UserRole } from "@/app/generated/client";

export interface BaseEntity {
    id: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface User extends BaseEntity {
    email: string;
    name?: string | null;
    image?: string | null;
    role: UserRole;
    isTwoFactorEnabled: boolean;
    isOAuth: boolean;
  }
  
  export interface SessionUser extends User {
    emailVerified?: Date | null;
  }
  
  export interface JWTUser {
    id: string;
    email: string;
    role: UserRole;
    isTwoFactorEnabled: boolean;
    isOAuth: boolean;
  }
  