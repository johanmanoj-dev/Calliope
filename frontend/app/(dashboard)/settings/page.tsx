'use client';

import { useState } from 'react';
import { useTheme } from 'next-themes';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Moon, Sun, LogOut, Mail, Settings as SettingsIcon, ArrowLeft, Trash2, X, TriangleAlert } from 'lucide-react';
import Link from 'next/link';
import { FRONTEND_ROUTES } from '@shared/constants/routes';
import { useRouter } from 'next/navigation';

export default function SettingsPage() {
  const { theme } = useTheme();
  const { user, logout, updateThemePreference, deleteAccount } = useAuth();
  const router = useRouter();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState('');

  const emailMatches = emailInput.trim().toLowerCase() === user?.email?.toLowerCase();

  const handleOpenDeleteModal = () => {
    setEmailInput('');
    setDeleteError('');
    setShowDeleteModal(true);
  };

  const handleDeleteAccount = async () => {
    if (!emailMatches) return;
    setIsDeleting(true);
    setDeleteError('');
    try {
      await deleteAccount();
    } catch {
      setDeleteError('Failed to delete account. Please try again.');
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex-1 w-full overflow-y-auto p-4 sm:p-8 py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <Button variant="ghost" size="sm" onClick={() => router.back()} className="hover:bg-muted font-medium">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>

        <div className="flex items-center gap-3 border-b pb-4">
        <div className="w-12 h-12 bg-primary/10 flex items-center justify-center rounded-full text-primary">
          <SettingsIcon className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">Manage your preferences and account.</p>
        </div>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>Customize how Calliope looks on your device.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground mb-3">Applies to your dashboard and builder. Landing page is always dark.</p>
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant={theme === 'light' ? 'default' : 'outline'}
                className="w-full justify-start gap-2 h-11"
                onClick={() => updateThemePreference('light')}
              >
                <Sun className="w-4 h-4 shrink-0" />
                Light Mode
              </Button>
              <Button
                variant={theme === 'dark' ? 'default' : 'outline'}
                className="w-full justify-start gap-2 h-11"
                onClick={() => updateThemePreference('dark')}
              >
                <Moon className="w-4 h-4 shrink-0" />
                Dark Mode
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Links</CardTitle>
            <CardDescription>Navigate to other areas of your account.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" className="w-full sm:w-auto">
              <Link href="/inbox">
                <Mail className="w-4 h-4 mr-2" />
                Go to Inbox
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>Manage your session.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Button variant="outline" onClick={() => logout()}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="border-destructive/40">
          <CardHeader>
            <CardTitle className="text-destructive flex items-center gap-2">
              <TriangleAlert className="w-5 h-5" />
              Danger Zone
            </CardTitle>
            <CardDescription>
              Irreversible and destructive actions. Proceed with caution.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-start justify-between gap-4 p-4 rounded-lg border border-destructive/30 bg-destructive/5">
              <div>
                <p className="text-sm font-semibold text-foreground">Delete Account</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Permanently deletes your account, portfolio, and all messages. This cannot be undone.
                </p>
              </div>
              <Button
                variant="destructive"
                size="sm"
                className="shrink-0"
                onClick={handleOpenDeleteModal}
              >
                <Trash2 className="w-4 h-4 mr-1.5" />
                Delete Account
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>

      {/* Delete Account Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-background rounded-xl border border-destructive/30 shadow-2xl relative">
            <button
              onClick={() => setShowDeleteModal(false)}
              disabled={isDeleting}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors disabled:opacity-40"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center shrink-0">
                  <TriangleAlert className="w-5 h-5 text-destructive" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">Delete Account</h3>
                  <p className="text-xs text-muted-foreground">This action is permanent and cannot be undone.</p>
                </div>
              </div>

              <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 mb-5 space-y-1.5">
                <p className="text-sm font-semibold text-destructive">What will be deleted:</p>
                <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Your account and profile</li>
                  <li>Your entire portfolio and all its content</li>
                  <li>All messages received via your portfolio</li>
                  <li>All settings and preferences</li>
                </ul>
              </div>

              <div className="space-y-2 mb-5">
                <Label htmlFor="confirm-email" className="text-sm font-medium">
                  Type your email address to confirm
                </Label>
                <p className="text-xs text-muted-foreground">
                  Enter <span className="font-mono font-semibold text-foreground">{user?.email}</span> to unlock deletion.
                </p>
                <Input
                  id="confirm-email"
                  type="email"
                  placeholder={user?.email ?? 'your@email.com'}
                  value={emailInput}
                  onChange={(e) => {
                    setEmailInput(e.target.value);
                    setDeleteError('');
                  }}
                  disabled={isDeleting}
                  autoComplete="off"
                  className="font-mono"
                />
                {deleteError && (
                  <p className="text-xs text-destructive">{deleteError}</p>
                )}
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowDeleteModal(false)}
                  disabled={isDeleting}
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  className="flex-1"
                  disabled={!emailMatches || isDeleting}
                  onClick={handleDeleteAccount}
                >
                  {isDeleting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Deleting...
                    </span>
                  ) : (
                    <>
                      <Trash2 className="w-4 h-4 mr-1.5" />
                      Delete My Account
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
