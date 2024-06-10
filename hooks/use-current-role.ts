import { useSession } from "next-auth/react";
import { ExtendedUser } from "@/types/next-auth";

export const useCurrentUser = (): ExtendedUser | undefined => {
  const { data: session } = useSession();
  return session?.user as ExtendedUser | undefined;
};