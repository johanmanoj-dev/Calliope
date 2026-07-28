'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FRONTEND_ROUTES } from '@shared/constants/routes';
import Link from 'next/link';
import { Settings, Camera, X } from 'lucide-react';
import { uploadImage } from '@/services/upload';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading, updateProfilePicture } = useAuth();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace(FRONTEND_ROUTES.HOME);
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
      </div>
    );
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIsUploading(true);
      try {
        const url = await uploadImage(e.target.files[0]);
        await updateProfilePicture(url);
        setIsModalOpen(false);
      } catch (err) {
        console.error('Failed to upload profile picture', err);
      } finally {
        setIsUploading(false);
      }
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-slate-900/20">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
        <div className="flex h-14 sm:h-16 items-center justify-between px-4 sm:px-6">
          <Link href={FRONTEND_ROUTES.DASHBOARD} className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity">
            <img src="/logo.png" alt="Calliope Logo" className="h-7 w-7 sm:h-10 sm:w-10 object-contain" />
            <span className="font-extrabold tracking-[0.2em] text-foreground text-base sm:text-xl">
              CΛLL<span className="text-violet-500 font-normal">i</span>OPE
            </span>
            <span className="hidden sm:inline text-sm sm:text-lg font-bold text-foreground ml-1">Dashboard</span>
          </Link>
          <div className="flex items-center gap-2 sm:gap-4">
            <Link href={FRONTEND_ROUTES.SETTINGS} className="text-muted-foreground hover:text-foreground transition-colors p-1.5 sm:p-2 rounded-lg hover:bg-muted" title="Settings">
              <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2.5 hover:opacity-80 transition-opacity"
              title="Change Profile Picture"
            >
              <div className="relative group">
                <img src={user.profilePicture} alt="Avatar" className="h-8 w-8 rounded-full border shadow-sm" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="w-3 h-3 text-white" />
                </div>
              </div>
              <span className="text-sm font-semibold text-foreground hidden sm:block">
                {user.name || user.email.split('@')[0]}
              </span>
            </button>
          </div>
        </div>
      </header>
      <main className="flex-1 overflow-hidden flex flex-col w-full">
        {children}
      </main>

      {/* Profile Picture Upload Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs">
          <div className="w-full max-w-sm bg-background p-6 rounded-xl border shadow-lg relative">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-bold text-foreground mb-4">Change Profile Picture</h3>
            <div className="flex flex-col items-center gap-4 py-4">
              <img src={user.profilePicture} alt="Current profile picture" className="w-24 h-24 rounded-full border shadow-md object-cover" referrerPolicy="no-referrer" />
              <div className="text-center">
                {user.name && <p className="text-sm font-semibold text-foreground">{user.name}</p>}
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>
              <label className="w-full">
                <span className="sr-only">Choose profile photo</span>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleFileChange} 
                  disabled={isUploading}
                  className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 dark:file:bg-violet-900/30 dark:file:text-violet-400 cursor-pointer"
                />
              </label>
              {isUploading && (
                <div className="text-sm text-muted-foreground animate-pulse">Uploading to ImageKit...</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

