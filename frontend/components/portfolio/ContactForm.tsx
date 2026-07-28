'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { inboxService } from '@/services/inbox';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, CheckCircle2 } from 'lucide-react';

const ContactFormSchema = z.object({
  visitorName: z.string().min(2, 'Name is required'),
  visitorContact: z.string().min(5, 'Contact info is required'),
  message: z.string().min(10, 'Message is too short'),
  honeypot: z.string().optional(),
});

type ContactFormData = z.infer<typeof ContactFormSchema>;

export function ContactForm({ slug }: { slug: string }) {
  const form = useForm<ContactFormData>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: { visitorName: '', visitorContact: '', message: '', honeypot: '' },
  });

  const mutation = useMutation({
    mutationFn: (data: ContactFormData) => inboxService.submitMessage(slug, data),
    onSuccess: () => {
      form.reset();
    },
  });

  if (mutation.isSuccess) {
    return (
      <div className="p-6 text-center border rounded-xl bg-slate-50 dark:bg-slate-900/50">
        <CheckCircle2 className="w-12 h-12 mx-auto text-green-500 mb-4" />
        <h3 className="text-xl font-medium mb-2">Message Sent</h3>
        <p className="text-muted-foreground">Thank you for reaching out! I'll get back to you soon.</p>
        <Button variant="outline" className="mt-6" onClick={() => mutation.reset()}>Send another message</Button>
      </div>
    );
  }

  return (
    <form onSubmit={form.handleSubmit((d) => mutation.mutate(d))} className="space-y-6">
      <div className="space-y-2 hidden">
        <Label htmlFor="honeypot">Leave this empty</Label>
        <Input id="honeypot" {...form.register('honeypot')} tabIndex={-1} autoComplete="off" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="visitorName">Name</Label>
        <Input id="visitorName" {...form.register('visitorName')} disabled={mutation.isPending} className="border border-black/20 dark:border-white/20" />
        {form.formState.errors.visitorName && <p className="text-sm text-destructive">{form.formState.errors.visitorName.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="visitorContact">Email or Phone</Label>
        <Input id="visitorContact" {...form.register('visitorContact')} disabled={mutation.isPending} className="border border-black/20 dark:border-white/20" />
        {form.formState.errors.visitorContact && <p className="text-sm text-destructive">{form.formState.errors.visitorContact.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" {...form.register('message')} rows={5} disabled={mutation.isPending} className="border border-black/20 dark:border-white/20" />
        {form.formState.errors.message && <p className="text-sm text-destructive">{form.formState.errors.message.message}</p>}
      </div>

      <Button type="submit" disabled={mutation.isPending} className="w-full">
        {mutation.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
        {mutation.isPending ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  );
}
