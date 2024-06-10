// src/app/(protected)/client/page.tsx
"use client";

import UserInfo from "@/components/user-info";
import { useCurrentUser } from "@/hooks/use-current-user";
import { isExtendedUser } from "@/types/type-guards";

const ClientPage = () => {
  const user = useCurrentUser();

  if (!isExtendedUser(user)) {
    return <div>Loading or error...</div>;
  }

  return <UserInfo label="📱 Client Component" user={user} />;
};

export default ClientPage;
