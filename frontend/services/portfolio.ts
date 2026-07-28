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
    const response = await api.post(API_ROUTES.PORTFOLIO.CREATE);
    return response.data.data.portfolio;
  },

  async updatePortfolio(id: string, data: Partial<IPortfolio>): Promise<IPortfolio> {
    const response = await api.put(API_ROUTES.PORTFOLIO.UPDATE(id), data);
    return response.data.data.portfolio;
  },

  async publishPortfolio(id: string): Promise<IPortfolio> {
    const response = await api.post(API_ROUTES.PORTFOLIO.PUBLISH(id));
    return response.data.data.portfolio;
  },

  async getPublicPortfolio(slug: string): Promise<IPortfolio | null> {
    try {
      const response = await api.get(`/api/portfolio/public/${slug}`);
      return response.data.data.portfolio;
    } catch (error: any) {
      if (error.response?.status === 404) {
        return null;
      }
      throw error;
    }
  },
};

