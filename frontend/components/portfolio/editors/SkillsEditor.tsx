'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { usePortfolio } from '@/context/PortfolioContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Trash2 } from 'lucide-react';
import { useEffect } from 'react';

export function SkillsEditor() {
  const { portfolio, updateSection } = usePortfolio();

  const form = useForm({
    defaultValues: {
      skills: portfolio?.skills || [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'skills',
  });

  useEffect(() => {
    const subscription = form.watch((value) => {
      updateSection('skills', value.skills);
    });
    return () => subscription.unsubscribe();
  }, [form, updateSection]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Skills</h3>
        <Button size="sm" onClick={() => append({ name: '', logoUrl: '' })}>
          <Plus className="w-4 h-4 mr-2" /> Add Skill
        </Button>
      </div>

      <div className="space-y-4">
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-start gap-4 p-4 border rounded-md bg-slate-50 dark:bg-slate-900">
            <div className="flex-1 space-y-4">
              <div className="space-y-2">
                <Label>Skill Name</Label>
                <Input {...form.register(`skills.${index}.name`)} placeholder="e.g. React" />
              </div>
              <div className="space-y-2">
                <Label>Logo URL</Label>
                <Input {...form.register(`skills.${index}.logoUrl`)} placeholder="https://..." />
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => remove(index)} className="text-destructive mt-8">
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
        {fields.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-4">No skills added yet.</p>
        )}
      </div>
    </div>
  );
}
