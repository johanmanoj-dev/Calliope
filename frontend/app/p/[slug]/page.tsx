import { notFound } from 'next/navigation';
import { portfolioService } from '@/services/portfolio';
import { FullPortfolioPreview } from '@/components/portfolio/PreviewComponents';
import type { Metadata } from 'next';

type Props = {
  params: { slug: string };
};

// Generate metadata for SEO based on portfolio data
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const portfolio = await portfolioService.getPublicPortfolio(params.slug);
  
  if (!portfolio) {
    return { title: 'Not Found' };
  }

  return {
    title: portfolio.hero?.name ? `${portfolio.hero.name} - Portfolio` : 'Portfolio',
    description: portfolio.hero?.intro || portfolio.about?.shortBio || 'A Calliope Portfolio',
  };
}

export default async function PublicPortfolioPage({ params }: Props) {
  const portfolio = await portfolioService.getPublicPortfolio(params.slug);

  if (!portfolio) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 flex flex-col items-center p-4 md:p-8">
      <div className="w-full max-w-4xl">
        <FullPortfolioPreview portfolio={portfolio} />
      </div>
    </div>
  );
}
