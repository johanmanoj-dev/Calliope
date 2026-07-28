'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AboutSchema } from '@shared/schemas/portfolio';
import { usePortfolio } from '@/context/PortfolioContext';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useEffect } from 'react';

import { TextFormattingControls } from './TextFormattingControls';

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
      <div className="space-y-1">
        <Label htmlFor="biography">Biography</Label>
        <Textarea 
          id="biography" 
          {...form.register('biography')} 
          className="min-h-[120px]"
        />
        <TextFormattingControls fieldKey="about.biography" />
      </div>

      <div className="space-y-1">
        <Label htmlFor="personalIntro">Personal Intro (Optional)</Label>
        <Textarea id="personalIntro" {...form.register('personalIntro')} />
        <TextFormattingControls fieldKey="about.personalIntro" />
      </div>

      <div className="space-y-1">
        <Label htmlFor="areasOfExpertise">Areas of Expertise (Optional)</Label>
        <Textarea id="areasOfExpertise" {...form.register('areasOfExpertise')} />
        <TextFormattingControls fieldKey="about.areasOfExpertise" />
      </div>
    </form>
  );
}
