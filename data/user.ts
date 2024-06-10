// src/data/user.ts
import { db } from "@/lib/db";
import { ExtendedUser } from "@/types/next-auth"; // Ensure to import the type

export const getUserByEmail = async (email: string): Promise<ExtendedUser | null> => {
  try {
    const user = await db.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        name: true,
        emailVerified: true,
        password: true,
        role: true,
        isTwoFactorEnabled: true,
        isOAuth: true,
        image: true, // Include other necessary properties
      }
    });

    return user as ExtendedUser | null;
  } catch (error) {
    return null;
  }
};

export const getUserById = async (id: string): Promise<ExtendedUser | null> => {
  try {
    const user = await db.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        emailVerified: true,
        password: true,
        role: true,
        isTwoFactorEnabled: true,
        isOAuth: true,
        image: true, // Include other necessary properties
      }
    });

    return user as ExtendedUser | null;
  } catch (error) {
    return null;
  }
};
