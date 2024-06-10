"use client";

import UserInfo from "@/components/user-info";
import { useCurrentUser } from "@/hooks/use-current-user";
import { User, UserRole } from "@/app/generated/client"; // Assuming these types are defined

const ClientPage = () => {
  const user: User & { role: UserRole; isTwoFactorEnabled: boolean; isOAuth: boolean; } | undefined = useCurrentUser();

  return <UserInfo label="📱 Client Component" user={user} />;
};

export default ClientPage;