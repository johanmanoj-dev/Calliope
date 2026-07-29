'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { authService } from '../services/auth';
import type { IUser } from '@shared/types/user';
import { FRONTEND_ROUTES } from '@shared/constants/routes';
import { useTheme } from 'next-themes';

interface AuthContextType {
  user: IUser | null;
  isLoading: boolean;
  login: (credential: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfilePicture: (profilePicture: string) => Promise<void>;
  updateThemePreference: (theme: string) => Promise<void>;
  deleteAccount: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { setTheme } = useTheme();
  
  const { data: user, isLoading } = useQuery({
    queryKey: ['auth', 'me'],
    queryFn: authService.getMe,
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  useEffect(() => {
    if (user) {
      setTheme(user.themePreference || 'dark');
    }
  }, [user, setTheme]);

  useEffect(() => {
    const handleAuthExpired = () => {
      queryClient.setQueryData(['auth', 'me'], null);
      setTheme('dark');
      // Don't redirect if on a public page
      if (!window.location.pathname.startsWith('/p/')) {
        router.push(FRONTEND_ROUTES.HOME);
      }
    };

    window.addEventListener('auth:expired', handleAuthExpired);
    return () => window.removeEventListener('auth:expired', handleAuthExpired);
  }, [queryClient, router, setTheme]);

  const loginMutation = useMutation({
    mutationFn: authService.loginWithGoogle,
    onSuccess: (data) => {
      queryClient.setQueryData(['auth', 'me'], data);
      setTheme(data.themePreference || 'dark');
      router.push(FRONTEND_ROUTES.DASHBOARD);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      queryClient.setQueryData(['auth', 'me'], null);
      queryClient.clear();
      setTheme('dark');
      // Don't redirect if on a public page
      if (!window.location.pathname.startsWith('/p/')) {
        router.push(FRONTEND_ROUTES.HOME);
      }
    },
  });

  const updatePfpMutation = useMutation({
    mutationFn: authService.updateProfilePicture,
    onSuccess: (data) => {
      queryClient.setQueryData(['auth', 'me'], data);
    },
  });

  const updateThemeMutation = useMutation({
    mutationFn: authService.updateThemePreference,
    onSuccess: (data) => {
      queryClient.setQueryData(['auth', 'me'], data);
      setTheme(data.themePreference || 'dark');
    },
  });

  const deleteAccountMutation = useMutation({
    mutationFn: authService.deleteAccount,
    onSuccess: () => {
      queryClient.clear();
      setTheme('dark');
      router.push(FRONTEND_ROUTES.HOME);
    },
  });

  const login = async (credential: string) => {
    await loginMutation.mutateAsync(credential);
  };

  const logout = async () => {
    await logoutMutation.mutateAsync();
  };

  const updateProfilePicture = async (profilePicture: string) => {
    await updatePfpMutation.mutateAsync(profilePicture);
  };

  const updateThemePreference = async (theme: string) => {
    await updateThemeMutation.mutateAsync(theme);
  };

  const deleteAccount = async () => {
    await deleteAccountMutation.mutateAsync();
  };

  return (
    <AuthContext.Provider
      value={{
        user: user || null,
        isLoading,
        login,
        logout,
        updateProfilePicture,
        updateThemePreference,
        deleteAccount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
