'use client';

import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { GoogleLogin } from '@react-oauth/google';
import { Button } from '@/components/ui/button';
import { FRONTEND_ROUTES } from '@shared/constants/routes';

export function Navbar() {
  const { user, login } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold sm:inline-block">Calliope</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2 sm:space-x-4">
          <nav className="flex items-center space-x-1">
            {user ? (
              <Button asChild variant="default" size="sm">
                <Link href={FRONTEND_ROUTES.DASHBOARD}>Dashboard</Link>
              </Button>
            ) : (
              <div className="scale-90 origin-right">
                <GoogleLogin
                  onSuccess={(res) => {
                    if (res.credential) login(res.credential);
                  }}
                  onError={() => console.error('Login Failed')}
                  theme="outline"
                  shape="rectangular"
                  text="signin_with"
                />
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
