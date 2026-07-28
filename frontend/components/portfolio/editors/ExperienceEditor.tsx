'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ExperienceArraySchema } from '@shared/schemas/portfolio';
import { usePortfolio } from '@/context/PortfolioContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2 } from 'lucide-react';
import { useEffect } from 'react';

import { TextFormattingControls } from './TextFormattingControls';

export function ExperienceEditor() {
  const { portfolio, updateSection } = usePortfolio();

  const form = useForm({
    resolver: zodResolver(ExperienceArraySchema),
    defaultValues: {
      experience: portfolio?.experience || [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'experience',
  });

  useEffect(() => {
    const subscription = form.watch((value) => {
      if (value.experience) {
        updateSection('experience', value.experience);
      }
    });
    return () => subscription.unsubscribe();
  }, [form, updateSection]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Experience</h3>
        <Button size="sm" onClick={() => append({ organization: '', position: '', period: '', description: '' })}>
          <Plus className="w-4 h-4 mr-2" /> Add Experience
        </Button>
      </div>

      <div className="space-y-4">
        {fields.map((field, index) => (
          <div key={field.id} className="relative space-y-4 p-4 border rounded-md bg-slate-50 dark:bg-slate-900">
            <Button variant="ghost" size="icon" onClick={() => remove(index)} className="absolute top-2 right-2 text-destructive">
              <Trash2 className="w-4 h-4" />
            </Button>
            
            <div className="space-y-2 pt-4">
              <Label>Organization</Label>
              <Input {...form.register(`experience.${index}.organization`)} />
            </div>

            <TextFormattingControls fieldKey={`experience.${index}.lineColor`} colorOnly label="Line Color" defaultColor="#7C3AED" />

            <div className="space-y-2">
              <Label>Position</Label>
              <Input {...form.register(`experience.${index}.position`)} />
            </div>

            <div className="space-y-2">
              <Label>Period</Label>
              <Input {...form.register(`experience.${index}.period`)} />
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea {...form.register(`experience.${index}.description`)} />
            </div>
          </div>
        ))}
        {fields.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-4">No experience added yet.</p>
        )}
      </div>
    </div>
  );
}
