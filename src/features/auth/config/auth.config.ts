import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { AuthService } from "../services/auth.service";
import { UserRole, ProfileMetadata } from "../types";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "google_client_id_placeholder",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "google_client_secret_placeholder",
      // Map extra fields if needed or role mapping
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
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || "github_client_id_placeholder",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "github_client_secret_placeholder",
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name || profile.login,
          email: profile.email,
          image: profile.avatar_url,
          role: "user" as UserRole,
          metadata: {
            completedOnboarding: false,
            skills: [],
          } as ProfileMetadata,
        };
      },
    }),
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
          // Find standard mock user or existing mock user
          const user = await AuthService.getUserByEmail(credentials.email);
          
          if (!user) {
            // For prototype demonstration, if login doesn't match and was credentials,
            // let any account with Password123 successfully authenticate & create a new mock user
            if (credentials.password === "Password123") {
              const [namePart] = credentials.email.split("@");
              const formattedName = namePart.charAt(0).toUpperCase() + namePart.slice(1);
              return {
                id: `user-${Math.random().toString(36).substr(2, 9)}`,
                name: formattedName,
                email: credentials.email,
                role: "user" as UserRole,
                metadata: {
                  completedOnboarding: false,
                  skills: [],
                } as ProfileMetadata,
              };
            }
            throw new Error("No user found with this email. Use password 'Password123' to auto-register on login.");
          }

          // In standard flows, checking simple preset pwd
          if (credentials.password !== "Password123") {
            throw new Error("Invalid password credentials.");
          }

          return {
            id: user.id,
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
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.role = (user.role as UserRole) || "user";
        token.metadata = (user.metadata as ProfileMetadata) || { completedOnboarding: false, skills: [] };
      }
      
      // Handle session updates (e.g. onboarding completion updates)
      if (trigger === "update" && session?.metadata) {
        token.metadata = {
          ...token.metadata,
          ...session.metadata,
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
  secret: process.env.AUTH_SECRET || "fallback-secret-for-jwt-signing-careerpilot-ai",
};
