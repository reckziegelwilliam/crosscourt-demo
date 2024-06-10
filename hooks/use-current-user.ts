// src/hooks/use-current-user.ts
import { useSession } from "next-auth/react";
import { ExtendedUser } from "@/types/next-auth";

export const useCurrentUser = (): ExtendedUser | undefined => {
  const { data: session } = useSession();
  
  if (session?.user?.id) {
    return session.user as ExtendedUser;
  }

  return undefined;
};
