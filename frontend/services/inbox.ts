import api from '../lib/axios';
import { API_ROUTES } from '@shared/constants/routes';

export interface IMessage {
  _id: string;
  visitorName: string;
  visitorContact: string;
  message: string;
  submittedAt: string;
  portfolioOwnerId: string;
}

export const inboxService = {
  async submitMessage(slug: string, data: { visitorName: string; visitorContact: string; message: string; honeypot?: string }): Promise<void> {
    await api.post(`/api/messages/${slug}`, data);
  },

  async getInboxMessages(): Promise<IMessage[]> {
    const response = await api.get('/api/messages');
    return response.data.data.messages;
  },

  async deleteMessage(id: string): Promise<void> {
    await api.delete(`/api/messages/${id}`);
  },
};
