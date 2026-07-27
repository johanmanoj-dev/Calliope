'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { GoogleLogin } from '@react-oauth/google';
import Link from 'next/link';
import { FRONTEND_ROUTES } from '@shared/constants/routes';

export function Hero() {
  const { user, login } = useAuth();

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 flex items-center justify-center">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-2"
          >
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              Build your professional portfolio.
              <br />
              Never touch HTML again.
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Create, customize, and publish a stunning portfolio in minutes. 
              No coding required. Just sign in and start building.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full max-w-sm space-y-2 flex flex-col items-center justify-center pt-4"
          >
            {user ? (
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href={FRONTEND_ROUTES.DASHBOARD}>Go to Dashboard</Link>
              </Button>
            ) : (
              <div className="w-full flex justify-center">
                <GoogleLogin
                  onSuccess={(res) => {
                    if (res.credential) login(res.credential);
                  }}
                  onError={() => console.error('Login Failed')}
                  useOneTap
                  theme="filled_black"
                  shape="pill"
                  text="continue_with"
                />
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
