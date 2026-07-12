import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { AuthService } from "@/services";
import { env } from "@/config/env";
import { UserRole, ProfileMetadata } from "../types";

const providers: Array<
  | ReturnType<typeof CredentialsProvider>
  | ReturnType<typeof GoogleProvider>
  | ReturnType<typeof GitHubProvider>
> = [
  CredentialsProvider({
    name: "Credentials",
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials) {
      if (!credentials?.email || !credentials?.password) {
        throw new Error("Email and password are required.");
      }

      try {
        const user = await AuthService.authenticateUser(
          credentials.email.toLowerCase(),
          credentials.password,
        );

        if (!user) {
          throw new Error("Invalid email or password.");
        }

        return {
          id: user._id,
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role,
          metadata: user.metadata,
        };
      } catch (e: unknown) {
        const err = e as Error;
        throw new Error(err.message || "Authentication failed.");
      }
    },
  }),
];

if (env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET) {
  providers.unshift(
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role: "user" as UserRole,
          metadata: {
            completedOnboarding: false,
            skills: [],
          } as ProfileMetadata,
        };
      },
    }) as ReturnType<typeof GoogleProvider>,
  );
}

if (env.GITHUB_CLIENT_ID && env.GITHUB_CLIENT_SECRET) {
  providers.unshift(
    GitHubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name || profile.login,
          email: profile.email || "",
          image: profile.avatar_url,
          role: "user" as UserRole,
          metadata: {
            completedOnboarding: false,
            skills: [],
          } as ProfileMetadata,
        };
      },
    }) as ReturnType<typeof GitHubProvider>,
  );
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user.role as UserRole) || "user";
        token.metadata = (user.metadata as ProfileMetadata) || {
          completedOnboarding: false,
          skills: [],
        };
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.metadata = token.metadata;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    signOut: "/",
    error: "/auth/error",
  },
  secret: env.NEXTAUTH_SECRET,
};
