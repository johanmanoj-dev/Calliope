'use client';

import { FileText, LayoutTemplate, Palette, Globe, Send, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: <LayoutTemplate className="h-10 w-10 text-primary" />,
    title: 'Visual Builder',
    description: 'Build your portfolio section by section with an intuitive visual interface.',
  },
  {
    icon: <Palette className="h-10 w-10 text-primary" />,
    title: 'Customizable Themes',
    description: 'Switch between light and dark modes, and choose colors that match your brand.',
  },
  {
    icon: <Globe className="h-10 w-10 text-primary" />,
    title: 'Custom URL',
    description: 'Publish your portfolio to a custom calliope.com/yourname URL instantly.',
  },
  {
    icon: <FileText className="h-10 w-10 text-primary" />,
    title: 'Structured Data',
    description: 'Dedicated sections for Hero, About, Skills, Projects, Experience, and Education.',
  },
  {
    icon: <Send className="h-10 w-10 text-primary" />,
    title: 'Built-in Inbox',
    description: 'Receive messages from visitors directly through your portfolio contact form.',
  },
  {
    icon: <Shield className="h-10 w-10 text-primary" />,
    title: 'Secure & Private',
    description: 'You own your data. Secure login via Google, and you can unpublish anytime.',
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export function FeatureGrid() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-slate-50 dark:bg-slate-900/20">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Everything you need</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Calliope gives you all the tools to showcase your professional journey without the hassle of maintaining code.
            </p>
          </div>
        </div>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12"
        >
          {features.map((feature, i) => (
            <motion.div key={i} variants={item} className="flex flex-col justify-center items-center space-y-4 text-center p-6 border rounded-xl bg-background shadow-sm">
              <div className="p-2 bg-primary/10 rounded-full">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
