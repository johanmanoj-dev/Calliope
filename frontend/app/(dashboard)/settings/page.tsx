'use client';

import { useTheme } from 'next-themes';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Moon, Sun, Monitor, LogOut, Mail, Settings as SettingsIcon, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { FRONTEND_ROUTES } from '@shared/constants/routes';

import { useRouter } from 'next/navigation';

export default function SettingsPage() {
  const { theme } = useTheme();
  const { logout, updateThemePreference } = useAuth();
  const router = useRouter();

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
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant={theme === 'light' ? 'default' : 'outline'}
                className="flex-1 justify-start"
                onClick={() => updateThemePreference('light')}
              >
                <Sun className="w-4 h-4 mr-2" />
                Light
              </Button>
              <Button
                variant={theme === 'dark' ? 'default' : 'outline'}
                className="flex-1 justify-start"
                onClick={() => updateThemePreference('dark')}
              >
                <Moon className="w-4 h-4 mr-2" />
                Dark
              </Button>
              <Button
                variant={theme === 'system' ? 'default' : 'outline'}
                className="flex-1 justify-start"
                onClick={() => updateThemePreference('system')}
              >
                <Monitor className="w-4 h-4 mr-2" />
                System
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
          <CardContent>
            <Button variant="destructive" onClick={() => logout()}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
    </div>
  );
}
