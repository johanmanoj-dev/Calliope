import { z } from 'zod';

export const MessageSchema = z.object({
  visitorName: z.string().min(1, 'Name is required'),
  visitorContact: z.string().min(1, 'Contact information is required'),
  message: z.string().min(1, 'Message is required'),
});

export type MessageFormData = z.infer<typeof MessageSchema>;
