import type { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  providers: [
    // Direct Google OAuth (from Google Cloud Console)
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? [
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          }),
        ]
      : []),

    // Local / Scribe Developer Credentials Provider (for offline & testing)
    CredentialsProvider({
      name: 'Scribe Demo Account',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'scribe@lipisabha.org' },
        name: { label: 'Name', type: 'text', placeholder: 'Priyanshu Mishra' },
      },
      async authorize(credentials) {
        if (!credentials?.email) return null;
        return {
          id: credentials.email.replace(/[^a-zA-Z0-9]/g, '_'),
          name: credentials.name || 'Lipi Scribe',
          email: credentials.email,
          image: '/mascot/lipi-avatar.png',
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (session.user && token.sub) {
        (session.user as { id?: string }).id = token.sub;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET || 'lipi-sabha-development-secret-key-32chars',
};
