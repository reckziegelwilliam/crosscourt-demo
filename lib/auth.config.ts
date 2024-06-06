import { NextAuthConfig } from 'next-auth';

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      let isLoggedIn = !!auth?.user;
      let isOnDashboard = nextUrl.pathname.startsWith('/protected');

      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/protected', nextUrl));
      }

      return true;
    },
    async signIn({ user, account, profile, email, credentials }) {
      
      return true;
    },
    async session({ session, user }) {
        if (user) {
        session.user.id = user.id;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Redirect logic
      if (url.startsWith('/protected')) {
        return baseUrl;
      }
      return url.startsWith(baseUrl) ? url : baseUrl;
    }
  },
  providers: [] // Add your provider configuration here
};
