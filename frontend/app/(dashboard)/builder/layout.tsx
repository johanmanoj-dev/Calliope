'use client';

import { useQuery } from '@tanstack/react-query';
import { portfolioService } from '@/services/portfolio';
import { PortfolioProvider } from '@/context/PortfolioContext';

export default function BuilderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: portfolio, isLoading } = useQuery({
    queryKey: ['portfolio', 'me'],
    queryFn: portfolioService.getMyPortfolio,
  });

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
      </div>
    );
  }

  // If no portfolio, we should really redirect to dashboard, but we'll let page handle it or just render null
  if (!portfolio) {
    return <div className="p-8">No portfolio found. Go back to Dashboard to create one.</div>;
  }

  return (
    <PortfolioProvider initialPortfolio={portfolio}>
      {children}
    </PortfolioProvider>
  );
}
