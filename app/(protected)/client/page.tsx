"use client";

import UserInfo from "@/components/user-info";
import { useCurrentUser } from "@/hooks/use-current-user";
import { ExtendedUser } from "@/types/next-auth"; // Use ExtendedUser for type safety

const ClientPage = () => {
  const user: ExtendedUser | undefined = useCurrentUser();

  return <UserInfo label="📱 Client Component" user={user} />;
};

export default ClientPage;