import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { compare } from 'bcrypt-ts';
import { getUserByEmail } from '@/app/actions/userActions';
import { authConfig } from '@/lib/auth.config';
import { User } from '@prisma/client';
import { CredentialsSignin } from "next-auth" 

class InvalidLoginError extends CredentialsSignin {
  code = 'Invalid identifier or password'
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials: any, request: any): Promise<any> {
        const { email, password } = credentials;
        let user: User | null = await getUserByEmail(email);
        if (user === null) return null; // assuming it returns a User or null
        const isValid = await compare(password, user.password);
        if (!isValid) throw new InvalidLoginError();
        return user;
      }
    }),
  ],
});
