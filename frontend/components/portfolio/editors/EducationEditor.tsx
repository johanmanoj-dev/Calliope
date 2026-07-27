'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { EducationArraySchema } from '@shared/schemas/portfolio';
import { usePortfolio } from '@/context/PortfolioContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2 } from 'lucide-react';
import { useEffect } from 'react';

export function EducationEditor() {
  const { portfolio, updateSection } = usePortfolio();

  const form = useForm({
    resolver: zodResolver(EducationArraySchema),
    defaultValues: {
      education: portfolio?.education || [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'education',
  });

  useEffect(() => {
    const subscription = form.watch((value) => {
      if (value.education) {
        updateSection('education', value.education);
      }
    });
    return () => subscription.unsubscribe();
  }, [form, updateSection]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Education</h3>
        <Button size="sm" onClick={() => append({ institution: '', degree: '', duration: '', description: '' })}>
          <Plus className="w-4 h-4 mr-2" /> Add Education
        </Button>
      </div>

      <div className="space-y-4">
        {fields.map((field, index) => (
          <div key={field.id} className="relative space-y-4 p-4 border rounded-md bg-slate-50 dark:bg-slate-900">
            <Button variant="ghost" size="icon" onClick={() => remove(index)} className="absolute top-2 right-2 text-destructive">
              <Trash2 className="w-4 h-4" />
            </Button>
            
            <div className="space-y-2 pt-4">
              <Label>Institution</Label>
              <Input {...form.register(`education.${index}.institution`)} placeholder="University Name" />
            </div>

            <div className="space-y-2">
              <Label>Degree</Label>
              <Input {...form.register(`education.${index}.degree`)} placeholder="B.S. Computer Science" />
            </div>

            <div className="space-y-2">
              <Label>Duration</Label>
              <Input {...form.register(`education.${index}.duration`)} placeholder="2018 - 2022" />
            </div>

            <div className="space-y-2">
              <Label>Description (Optional)</Label>
              <Textarea {...form.register(`education.${index}.description`)} placeholder="Minor, GPA, activities..." />
            </div>
          </div>
        ))}
        {fields.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-4">No education added yet.</p>
        )}
      </div>
    </div>
  );
}
