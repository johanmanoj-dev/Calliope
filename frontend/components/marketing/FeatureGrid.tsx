'use client';

import { FileText, LayoutTemplate, Palette, Globe, Send, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: <LayoutTemplate className="h-5 w-5" />,
    title: 'Visual Builder',
    description: 'Build section by section with an intuitive drag-and-edit interface. No code ever.',
  },
  {
    icon: <Palette className="h-5 w-5" />,
    title: 'Light & Dark Themes',
    description: 'Switch modes instantly. Your portfolio looks stunning in both.',
  },
  {
    icon: <Globe className="h-5 w-5" />,
    title: 'Instant Public URL',
    description: 'One click to publish. Get a permanent link you can share anywhere.',
  },
  {
    icon: <FileText className="h-5 w-5" />,
    title: 'Structured Sections',
    description: 'Hero, About, Skills, Projects, Experience, Education — all in one place.',
  },
  {
    icon: <Send className="h-5 w-5" />,
    title: 'Built-in Inbox',
    description: 'Visitors message you directly through your portfolio. No email required.',
  },
  {
    icon: <Shield className="h-5 w-5" />,
    title: 'Yours to control',
    description: 'Secure Google sign-in. Unpublish anytime. Your data stays yours.',
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as any } },
} as any;

export function FeatureGrid() {
  return (
    <section className="relative w-full py-16 sm:py-28 bg-[#0A0A0F] overflow-hidden">
      {/* Subtle divider glow */}
      <div
        className="absolute top-0 inset-x-0 h-px opacity-30"
        style={{ background: 'linear-gradient(90deg, transparent, #7C3AED, transparent)' }}
      />
      {/* Background ambient */}
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] opacity-20 blur-[100px]"
        style={{ background: 'radial-gradient(ellipse, #7C3AED 0%, transparent 70%)' }}
      />

      <div className="container relative z-10 px-4 md:px-6 max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center mb-10 sm:mb-16"
        >
          <p className="text-violet-400 text-xs font-semibold tracking-widest uppercase mb-4">Why Calliope</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight">
            Everything a great portfolio needs.
            <br />
            <span className="text-[#9E9BAE] font-normal">Nothing it doesn't.</span>
          </h2>
        </motion.div>

        {/* Feature cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {features.map((feature, i) => (
            <motion.div
              key={i}
              variants={item}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="group relative p-6 rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm hover:border-violet-500/40 hover:bg-white/[0.06] hover:shadow-xl hover:shadow-violet-900/20 transition-colors duration-300"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(124,58,237,0.08) 0%, transparent 70%)' }}
              />
              <div className="relative">
                <div className="inline-flex p-2.5 rounded-xl bg-violet-500/10 text-violet-400 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-base font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-[#9E9BAE] leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
