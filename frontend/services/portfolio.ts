import api from '../lib/axios';
import { API_ROUTES } from '@shared/constants/routes';
import type { IPortfolio } from '@shared/types/portfolio';

export const portfolioService = {
  async getMyPortfolio(): Promise<IPortfolio | null> {
    try {
      const response = await api.get(API_ROUTES.PORTFOLIO.ME);
      return response.data.data.portfolio;
    } catch (error: any) {
      if (error.response?.status === 404) {
        return null;
      }
      throw error;
    }
  },

  async createPortfolio(): Promise<IPortfolio> {
    const response = await api.post(API_ROUTES.PORTFOLIO.BASE);
    return response.data.data.portfolio;
  },

  async updatePortfolio(id: string, data: Partial<IPortfolio>): Promise<IPortfolio> {
    const response = await api.put(`${API_ROUTES.PORTFOLIO.BASE}/${id}`, data);
    return response.data.data.portfolio;
  },

  async publishPortfolio(id: string): Promise<IPortfolio> {
    const response = await api.post(`${API_ROUTES.PORTFOLIO.BASE}/${id}/publish`);
    return response.data.data.portfolio;
  },

  async getPublicPortfolio(slug: string): Promise<IPortfolio | null> {
    try {
      const response = await api.get(`${API_ROUTES.PORTFOLIO.BASE}/public/${slug}`);
      return response.data.data.portfolio;
    } catch (error: any) {
      if (error.response?.status === 404) {
        return null;
      }
      throw error;
    }
  },
};
