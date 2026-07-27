'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ContactSchema } from '@shared/schemas/portfolio';
import { usePortfolio } from '@/context/PortfolioContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useEffect } from 'react';

export function ContactEditor() {
  const { portfolio, updateSection } = usePortfolio();

  const form = useForm({
    resolver: zodResolver(ContactSchema),
    defaultValues: portfolio?.contact || {
      email: '',
      linkedin: '',
      github: '',
      website: '',
    },
  });

  useEffect(() => {
    const subscription = form.watch((value) => {
      updateSection('contact', value);
    });
    return () => subscription.unsubscribe();
  }, [form, updateSection]);

  return (
    <form className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="email">Public Email</Label>
        <Input id="email" type="email" {...form.register('email')} placeholder="hello@example.com" />
        {form.formState.errors.email && <p className="text-sm text-destructive">{form.formState.errors.email.message as string}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="linkedin">LinkedIn URL</Label>
        <Input id="linkedin" type="url" {...form.register('linkedin')} placeholder="https://linkedin.com/in/..." />
        {form.formState.errors.linkedin && <p className="text-sm text-destructive">{form.formState.errors.linkedin.message as string}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="github">GitHub URL</Label>
        <Input id="github" type="url" {...form.register('github')} placeholder="https://github.com/..." />
        {form.formState.errors.github && <p className="text-sm text-destructive">{form.formState.errors.github.message as string}</p>}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="website">Personal Website URL</Label>
        <Input id="website" type="url" {...form.register('website')} placeholder="https://..." />
        {form.formState.errors.website && <p className="text-sm text-destructive">{form.formState.errors.website.message as string}</p>}
      </div>
    </form>
  );
}
