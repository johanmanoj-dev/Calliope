'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { FullPortfolioPreview } from '@/components/portfolio/PreviewComponents';
import { ContactForm } from '@/components/portfolio/ContactForm';
import type { IPortfolio } from '@shared/types/portfolio';
import { Loader2 } from 'lucide-react';

export default function PublicPortfolioPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [portfolio, setPortfolio] = useState<IPortfolio | null>(null);
  const [status, setStatus] = useState<'loading' | 'found' | 'notfound'>('loading');

  useEffect(() => {
    if (!slug) return;
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

    fetch(`${apiUrl}/api/portfolio/public/${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error('not found');
        return res.json();
      })
      .then((json) => {
        setPortfolio(json.data.portfolio);
        setStatus('found');
      })
      .catch(() => setStatus('notfound'));
  }, [slug]);

  if (status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (status === 'notfound' || !portfolio) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center text-center p-8">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-muted-foreground">This portfolio doesn't exist or hasn't been published yet.</p>
      </div>
    );
  }

  const ts = portfolio.themeSettings || {};
  const bgColor = ts.bgColor || '#F2EAE0';
  const cardBgColor = ts.cardBgColor || 'rgba(255, 255, 255, 0.92)';
  const textColor = ts.textColor || '#1E293B';
  const fontFamily = ts.fontFamily || 'Plus Jakarta Sans';

  return (
    <div
      className="min-h-screen flex flex-col items-center p-4 md:p-8 transition-colors duration-300"
      style={{ backgroundColor: bgColor, fontFamily: fontFamily }}
    >
      <div className="w-full max-w-5xl space-y-8">
        <FullPortfolioPreview portfolio={portfolio} />

        <div
          className="shadow-xl border border-black/10 rounded-2xl overflow-hidden p-4 sm:p-8 backdrop-blur-md transition-all duration-300"
          style={{ backgroundColor: cardBgColor, color: textColor }}
        >
          <h2 className="text-2xl font-bold mb-6 text-center tracking-tight">Get in Touch</h2>
          <div className="max-w-lg mx-auto">
            <ContactForm slug={slug} />
          </div>
        </div>
      </div>
    </div>
  );
}
