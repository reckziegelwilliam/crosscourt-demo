import type { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { LoginSchema, CredentialsInputs } from "@/schemas/index";
import prisma from "@/lib/db";
import bcrypt from "bcryptjs";

export default {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials: Partial<CredentialsInputs>): Promise<CredentialsInputs | null> {
        // Validate the credentials using Zod schema
        const validatedFields = LoginSchema.safeParse(credentials);

        if (!validatedFields.success) {
          // If validation fails, return null
          return null;
        }

        const { email, password } = validatedFields.data;

        // Find the user in the database
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user || !user.password) {
          // If the user does not exist or has no password, return null
          return null;
        }

        // Compare the provided password with the stored password
        const passwordsMatch = await bcrypt.compare(password, user.password);
        if (!passwordsMatch) {
          // If passwords do not match, return null
          return null;
        }

        // If all checks pass, return the user object
        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;
