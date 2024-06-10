// src/types/type-guards.ts
import { ExtendedUser } from "@/types/next-auth";

export function isExtendedUser(user: any): user is ExtendedUser {
  return user && typeof user.id === "string";
}
