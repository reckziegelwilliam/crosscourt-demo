// src/hooks/use-current-role.ts
import { useSession } from "next-auth/react";
import { ExtendedUser } from "@/types/next-auth";
import { UserRole } from "@/app/generated/client";

// Hook to get the current user
export const useCurrentUser = (): ExtendedUser | undefined => {
  const { data: session } = useSession();
  return session?.user as ExtendedUser | undefined;
};

// Hook to get the current user's role
export const useCurrentRole = (): UserRole | undefined => {
  const user = useCurrentUser();
  return user?.role;
};
