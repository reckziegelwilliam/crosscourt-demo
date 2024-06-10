// src/auth/credentials.ts
import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { ExtendedUser } from "@/types/next-auth"; // Import the type

export default {
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials: any) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;
          const user = await getUserByEmail(email);

          if (!user || !user.password) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) {
            // Ensure to include all properties of ExtendedUser
            return {
              id: user.id,
              email: user.email,
              name: user.name || null,
              emailVerified: user.emailVerified || null,
              password: user.password,
              role: user.role,
              isTwoFactorEnabled: user.isTwoFactorEnabled,
              isOAuth: user.isOAuth,
              image: user.image || null, // Add other necessary properties
            } as ExtendedUser; // Return ExtendedUser
          }
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
