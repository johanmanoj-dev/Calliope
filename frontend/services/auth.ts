import api from '../lib/axios';
import { API_ROUTES } from '@shared/constants/routes';
import type { IUser } from '@shared/types/user';

export const authService = {
  async loginWithGoogle(credential: string): Promise<IUser> {
    const response = await api.post(API_ROUTES.AUTH.GOOGLE, { credential });
    return response.data.data.user;
  },

  async logout(): Promise<void> {
    await api.post(API_ROUTES.AUTH.LOGOUT);
  },

  async getMe(): Promise<IUser | null> {
    try {
      const response = await api.get(API_ROUTES.AUTH.ME);
      return response.data.data.user;
    } catch (error) {
      return null;
    }
  },

  async updateProfilePicture(profilePicture: string): Promise<IUser> {
    const response = await api.patch('/api/auth/profile-picture', { profilePicture });
    return response.data.data.user;
  },

  async updateThemePreference(themePreference: string): Promise<IUser> {
    const response = await api.patch('/api/auth/theme', { themePreference });
    return response.data.data.user;
  },

  async deleteAccount(): Promise<void> {
    await api.delete('/api/auth/account');
  },
};
