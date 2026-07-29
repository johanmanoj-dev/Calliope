'use client';

import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { GoogleLogin } from '@react-oauth/google';
import { FRONTEND_ROUTES } from '@shared/constants/routes';

export function Navbar() {
  const { user, login } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.06] bg-[#0A0A0F]/80 backdrop-blur-xl">
      <div className="w-full flex h-14 sm:h-20 items-center justify-between px-5 sm:px-12">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 sm:gap-3.5 hover:opacity-90 transition-opacity">
            <img src="/logo.png" alt="Calliope Logo" className="h-8 w-8 sm:h-10 sm:w-10 object-contain" />
            <span className="font-extrabold tracking-[0.2em] text-white text-base sm:text-2xl">
              CΛLL<span className="text-violet-400 font-normal">i</span>OPE
            </span>
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <nav className="flex items-center">
            {user ? (
              <Link
                href={FRONTEND_ROUTES.DASHBOARD}
                className="inline-flex items-center px-4 sm:px-5 py-1.5 sm:py-2 rounded-full bg-violet-600 hover:bg-violet-500 text-white text-xs sm:text-sm font-semibold transition-all hover:scale-[1.02] shadow-lg shadow-violet-900/30"
              >
                Dashboard
              </Link>
            ) : (
              <div className="scale-75 sm:scale-90 origin-right">
                <div className="rounded-full overflow-hidden" style={{ background: '#e8e4df' }}>
                  <GoogleLogin
                    onSuccess={(res) => {
                      if (res.credential) login(res.credential);
                    }}
                    onError={() => console.error('Login Failed')}
                    theme="filled_black"
                    shape="pill"
                    text="signin_with"
                  />
                </div>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
