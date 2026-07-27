'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { usePortfolio } from '@/context/PortfolioContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2, Image as ImageIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { uploadImage } from '@/services/upload';

export function ProjectsEditor() {
  const { portfolio, updateSection } = usePortfolio();
  const [uploadingIdx, setUploadingIdx] = useState<number | null>(null);

  const form = useForm({
    defaultValues: {
      projects: portfolio?.projects || [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'projects',
  });

  useEffect(() => {
    const subscription = form.watch((value) => {
      updateSection('projects', value.projects);
    });
    return () => subscription.unsubscribe();
  }, [form, updateSection]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    if (e.target.files && e.target.files[0]) {
      setUploadingIdx(index);
      try {
        const url = await uploadImage(e.target.files[0]);
        form.setValue(`projects.${index}.thumbnailUrl`, url);
      } catch (err) {
        console.error('Upload failed', err);
      } finally {
        setUploadingIdx(null);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Projects</h3>
        <Button size="sm" onClick={() => append({ title: '', description: '', thumbnailUrl: '', technologies: [], sourceLink: '', liveLink: '' })}>
          <Plus className="w-4 h-4 mr-2" /> Add Project
        </Button>
      </div>

      <div className="space-y-6">
        {fields.map((field, index) => (
          <div key={field.id} className="relative space-y-4 p-4 border rounded-md bg-slate-50 dark:bg-slate-900">
            <Button variant="ghost" size="icon" onClick={() => remove(index)} className="absolute top-2 right-2 text-destructive">
              <Trash2 className="w-4 h-4" />
            </Button>
            
            <div className="space-y-2 pt-4">
              <Label>Project Title</Label>
              <Input {...form.register(`projects.${index}.title`)} placeholder="Awesome App" />
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea {...form.register(`projects.${index}.description`)} placeholder="What does it do?" />
            </div>

            <div className="space-y-2">
              <Label>Thumbnail Image</Label>
              <div className="flex items-center gap-4">
                {form.watch(`projects.${index}.thumbnailUrl`) ? (
                  <img src={form.watch(`projects.${index}.thumbnailUrl`)} alt="Thumbnail" className="w-16 h-16 rounded object-cover" />
                ) : (
                  <div className="w-16 h-16 rounded bg-muted flex items-center justify-center">
                    <ImageIcon className="w-6 h-6 text-muted-foreground" />
                  </div>
                )}
                <Input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, index)} disabled={uploadingIdx === index} />
              </div>
              {uploadingIdx === index && <p className="text-sm text-muted-foreground">Uploading...</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Live Link (Optional)</Label>
                <Input {...form.register(`projects.${index}.liveLink`)} placeholder="https://..." />
              </div>
              <div className="space-y-2">
                <Label>Source Link (Optional)</Label>
                <Input {...form.register(`projects.${index}.sourceLink`)} placeholder="https://github.com/..." />
              </div>
            </div>
          </div>
        ))}
        {fields.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-4">No projects added yet.</p>
        )}
      </div>
    </div>
  );
}
