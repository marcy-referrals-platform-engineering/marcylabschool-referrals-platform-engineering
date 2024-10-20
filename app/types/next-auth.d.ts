import NextAuth, { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
  // Extending the Session interface
  interface Session {
    user: {
      role?: string;  // Add role to the user object in session
    } & DefaultSession['user'];
  }

  // Extending the JWT interface
  interface JWT {
    role?: string;  // Add role to the token object
  }

  // Extending the User interface
  interface User extends DefaultUser {
    role?: string;  // Add role during signIn
  }
}