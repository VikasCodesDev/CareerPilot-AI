"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { ProfileMetadata } from "../types";

export function useAuth() {
  const { data: session, status, update } = useSession();

  const user = session?.user;
  const isLoading = status === "loading";
  const isAuthenticated = status === "authenticated";

  const isAdmin = user?.role === "admin";
  const isMentor = user?.role === "mentor";
  const isUser = user?.role === "user";

  const completedOnboarding = user?.metadata?.completedOnboarding ?? false;
  const careerGoal = user?.metadata?.careerGoal;
  const targetRole = user?.metadata?.targetRole;

  const updateProfile = async (metadata: Partial<ProfileMetadata>) => {
    if (!isAuthenticated) return;
    await update({
      metadata: {
        ...user?.metadata,
        ...metadata,
      },
    });
  };

  return {
    session,
    user,
    status,
    isLoading,
    isAuthenticated,
    isAdmin,
    isMentor,
    isUser,
    completedOnboarding,
    careerGoal,
    targetRole,
    updateProfile,
    login: signIn,
    logout: signOut,
  };
}
