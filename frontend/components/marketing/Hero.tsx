'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { GoogleLogin } from '@react-oauth/google';
import Link from 'next/link';
import { FRONTEND_ROUTES } from '@shared/constants/routes';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';

export function Hero() {
  const { user, login } = useAuth();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const laptopY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const laptopOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex flex-col items-center overflow-hidden bg-[#0A0A0F]">
      {/* Animated orb layer */}
      <style>{`
        @keyframes orb-sweep-main {
          0%   { transform: translate(-40%, -5%) scale(1); }
          50%  { transform: translate(40%, 5%) scale(1.15); }
          100% { transform: translate(-40%, -5%) scale(1); }
        }
        @keyframes orb-sweep-secondary {
          0%   { transform: translate(35%, 0%) scale(1.1); }
          50%  { transform: translate(-35%, 0%) scale(0.9); }
          100% { transform: translate(35%, 0%) scale(1.1); }
        }
      `}</style>
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Main violet orb - slow side sweep */}
        <div
          style={{
            position: 'absolute',
            top: '-15%',
            left: '50%',
            width: 1400,
            height: 950,
            borderRadius: '50%',
            background: 'radial-gradient(ellipse at 50% 45%, #7C3AED 0%, #6d28d9 35%, #4c1d95 60%, transparent 75%)',
            opacity: 0.75,
            filter: 'blur(90px)',
            animation: 'orb-sweep-main 24s ease-in-out infinite',
          }}
        />
        {/* Secondary deep purple bloom - counter sweep */}
        <div
          style={{
            position: 'absolute',
            top: '-5%',
            left: '50%',
            width: 1100,
            height: 700,
            borderRadius: '50%',
            background: 'radial-gradient(ellipse, #8b5cf6 0%, #6d28d9 50%, transparent 70%)',
            opacity: 0.55,
            filter: 'blur(100px)',
            animation: 'orb-sweep-secondary 28s ease-in-out infinite',
          }}
        />
        {/* Rose accent orb */}
        <div
          style={{
            position: 'absolute',
            top: '5%',
            left: '60%',
            width: 650,
            height: 450,
            borderRadius: '50%',
            background: 'radial-gradient(ellipse, #db2777 0%, transparent 65%)',
            opacity: 0.25,
            filter: 'blur(70px)',
            animation: 'orb-drift-2 16s ease-in-out infinite',
          }}
        />
        {/* Blue-indigo orb */}
        <div
          style={{
            position: 'absolute',
            top: '5%',
            left: '20%',
            width: 550,
            height: 400,
            borderRadius: '50%',
            background: 'radial-gradient(ellipse, #4338ca 0%, transparent 65%)',
            opacity: 0.3,
            filter: 'blur(80px)',
            animation: 'orb-drift-3 18s ease-in-out infinite',
          }}
        />
      </div>

      {/* Noise texture overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Hero Text */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 pt-16 sm:pt-28 pb-16 max-w-4xl mx-auto">
        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-4xl sm:text-6xl md:text-7xl font-bold leading-[1.05] tracking-tight text-white"
        >
          Your work deserves
          <br />
          <span
            className="inline-block"
            style={{
              background: 'linear-gradient(135deg, #a78bfa 0%, #f472b6 60%, #fb923c 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            a real stage.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-5 sm:mt-6 max-w-xl text-[#9E9BAE] text-base sm:text-lg leading-relaxed"
        >
          Build a stunning portfolio in minutes — no HTML, no hosting headaches.
          Just sign in and start telling your story.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 flex flex-col items-center gap-4"
        >
          {user ? (
            <Link
              href={FRONTEND_ROUTES.DASHBOARD}
              className="group inline-flex items-center gap-2 px-7 py-3 rounded-full bg-violet-600 hover:bg-violet-500 text-white font-semibold text-sm transition-all duration-200 shadow-lg shadow-violet-900/40 hover:shadow-violet-700/50 hover:scale-[1.02]"
            >
              Go to Dashboard
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          ) : (
            <div className="flex justify-center">
              <div className="scale-[1.05] origin-center">
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
            </div>
          )}
        </motion.div>
      </div>

      {/* Laptop Mockup */}
      <motion.div
        style={{ y: laptopY, opacity: laptopOpacity }}
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-5xl mx-auto px-4 pb-0"
      >
        {/* Laptop shell */}
        <div className="relative mx-auto" style={{ maxWidth: 860 }}>
          {/* Screen bezel */}
          <div
            className="relative rounded-t-2xl overflow-hidden"
            style={{
              background: '#1C1C1E',
              padding: '12px 12px 0 12px',
              boxShadow: '0 0 0 1px rgba(255,255,255,0.08), 0 40px 80px -20px rgba(0,0,0,0.8)',
            }}
          >
            {/* Camera dot */}
            <div className="flex justify-center mb-2">
              <div className="w-2 h-2 rounded-full bg-[#2C2C2E]" />
            </div>
            {/* Screen content */}
            <div
              className="rounded-t-lg overflow-hidden relative"
              style={{ aspectRatio: '16/10', background: '#111118' }}
            >
              {/* Glassmorphic app preview placeholder */}
              <div className="absolute inset-0 flex">
                {/* Sidebar */}
                <div className="w-[20%] border-r border-white/5 bg-white/[0.03] flex flex-col gap-1 p-2 shrink-0">
                  <div className="text-[0.6vw] md:text-[8px] text-white/30 font-medium mb-2 tracking-widest uppercase px-1">Builder</div>
                  {['Hero Section', 'About Me', 'Skills', 'Projects', 'Education', 'Experience', 'Contact'].map((s, i) => (
                    <div
                      key={s}
                      className={`text-[0.5vw] md:text-[7px] px-1.5 py-1 rounded-md ${i === 0 ? 'bg-violet-600/80 text-white' : 'text-white/30 hover:bg-white/5'}`}
                    >
                      {s}
                    </div>
                  ))}
                </div>
                {/* Editor panel */}
                <div className="w-[30%] border-r border-white/5 bg-white/[0.02] p-2 shrink-0">
                  <div className="text-[0.6vw] md:text-[8px] text-white/40 mb-2 font-semibold">Hero Editor</div>
                  {['Name', 'Title', 'Introduction', 'Location'].map((f) => (
                    <div key={f} className="mb-1">
                      <div className="text-[0.5vw] md:text-[6px] text-white/30 mb-0.5">{f}</div>
                      <div className="h-4 sm:h-5 rounded bg-white/5 border border-white/8" />
                    </div>
                  ))}
                </div>
                {/* Preview pane */}
                <div className="flex-1 bg-[#F2EAE0]/5 p-3 flex flex-col items-center gap-1.5">
                  <div className="text-[0.6vw] md:text-[7px] text-white/30 self-start mb-1 font-medium">Live Preview</div>
                  <div className="w-8 h-8 sm:w-16 sm:h-16 rounded-full bg-violet-500/20 border border-violet-400/20" />
                  <div className="w-16 sm:w-32 h-1 rounded-full bg-white/10 mt-1" />
                  <div className="w-10 sm:w-20 h-0.5 sm:h-1.5 rounded-full bg-white/6" />
                  <div className="w-20 sm:w-40 h-0.5 sm:h-1 rounded-full bg-white/4 mt-1" />
                  <div className="w-18 sm:w-36 h-0.5 sm:h-1 rounded-full bg-white/4" />
                  <div className="w-16 sm:w-32 h-0.5 sm:h-1 rounded-full bg-white/4" />
                </div>
              </div>
              {/* Subtle gradient overlay at bottom for depth */}
              <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
            </div>
          </div>
          {/* Laptop base */}
          <div
            style={{
              background: 'linear-gradient(180deg, #2A2A2C 0%, #1A1A1C 100%)',
              height: 22,
              borderBottomLeftRadius: 12,
              borderBottomRightRadius: 12,
              boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
            }}
          >
            {/* Hinge line */}
            <div
              className="mx-auto"
              style={{
                width: '40%',
                height: 4,
                marginTop: 0,
                background: '#111113',
                borderBottomLeftRadius: 6,
                borderBottomRightRadius: 6,
              }}
            />
          </div>
          {/* Laptop foot shadow */}
          <div
            className="mx-auto mt-1 opacity-60 blur-2xl"
            style={{
              width: '85%',
              height: 20,
              background: 'rgba(124, 58, 237, 0.3)',
              borderRadius: '50%',
            }}
          />
        </div>
      </motion.div>
    </section>
  );
}
