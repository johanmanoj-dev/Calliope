'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { HeroSchema } from '@shared/schemas/portfolio';
import type { IPortfolio } from '@shared/types/portfolio';
import { usePortfolio } from '@/context/PortfolioContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { uploadImage } from '@/services/upload';
import { useState, useEffect } from 'react';

export function HeroEditor() {
  const { portfolio, updateSection } = usePortfolio();
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm({
    resolver: zodResolver(HeroSchema),
    defaultValues: portfolio?.hero || {
      name: '',
      title: '',
      introduction: '',
      location: '',
      photoUrl: '',
      resumeUrl: '',
    },
  });

  // Keep local preview in sync when values change
  useEffect(() => {
    const subscription = form.watch((value) => {
      updateSection('hero', value);
    });
    return () => subscription.unsubscribe();
  }, [form, updateSection]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIsUploading(true);
      try {
        const url = await uploadImage(e.target.files[0]);
        form.setValue('photoUrl', url);
        updateSection('hero', form.getValues());
      } catch (err) {
        console.error('Upload failed', err);
      } finally {
        setIsUploading(false);
      }
    }
  };

  return (
    <form className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="photo">Profile Photo</Label>
        <div className="flex items-center gap-4">
          {form.watch('photoUrl') && (
            <img src={form.watch('photoUrl')} alt="Profile" className="w-16 h-16 rounded-full object-cover" />
          )}
          <Input 
            id="photo" 
            type="file" 
            accept="image/*" 
            onChange={handleFileUpload} 
            disabled={isUploading} 
          />
        </div>
        {isUploading && <p className="text-sm text-muted-foreground">Uploading...</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input id="name" {...form.register('name')} placeholder="Jane Doe" />
        {form.formState.errors.name && <p className="text-sm text-destructive">{form.formState.errors.name.message as string}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="title">Headline / Title</Label>
        <Input id="title" {...form.register('title')} placeholder="Full Stack Developer" />
        {form.formState.errors.title && <p className="text-sm text-destructive">{form.formState.errors.title.message as string}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="introduction">Short Introduction</Label>
        <Textarea id="introduction" {...form.register('introduction')} placeholder="I build things for the web." />
        {form.formState.errors.introduction && <p className="text-sm text-destructive">{form.formState.errors.introduction.message as string}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">Location (Optional)</Label>
        <Input id="location" {...form.register('location')} placeholder="San Francisco, CA" />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="resumeUrl">Resume URL (Optional)</Label>
        <Input id="resumeUrl" {...form.register('resumeUrl')} placeholder="https://link-to-resume.pdf" />
      </div>
    </form>
  );
}
