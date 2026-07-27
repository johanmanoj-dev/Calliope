'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AboutSchema } from '@shared/schemas/portfolio';
import { usePortfolio } from '@/context/PortfolioContext';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useEffect } from 'react';

export function AboutEditor() {
  const { portfolio, updateSection } = usePortfolio();

  const form = useForm({
    resolver: zodResolver(AboutSchema),
    defaultValues: portfolio?.about || {
      personalIntro: '',
      careerInterests: '',
      professionalGoals: '',
      areasOfExpertise: '',
      biography: '',
    },
  });

  useEffect(() => {
    const subscription = form.watch((value) => {
      updateSection('about', value);
    });
    return () => subscription.unsubscribe();
  }, [form, updateSection]);

  return (
    <form className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="biography">Biography</Label>
        <Textarea 
          id="biography" 
          {...form.register('biography')} 
          placeholder="Tell your story..." 
          className="min-h-[150px]"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="personalIntro">Personal Intro (Optional)</Label>
        <Textarea id="personalIntro" {...form.register('personalIntro')} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="areasOfExpertise">Areas of Expertise (Optional)</Label>
        <Textarea id="areasOfExpertise" {...form.register('areasOfExpertise')} />
      </div>
    </form>
  );
}
