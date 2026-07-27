'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { portfolioService } from '@/services/portfolio';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { FRONTEND_ROUTES } from '@shared/constants/routes';

export default function DashboardPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: portfolio, isLoading } = useQuery({
    queryKey: ['portfolio', 'me'],
    queryFn: portfolioService.getMyPortfolio,
  });

  const createPortfolioMutation = useMutation({
    mutationFn: portfolioService.createPortfolio,
    onSuccess: (data) => {
      queryClient.setQueryData(['portfolio', 'me'], data);
      router.push('/builder'); // will be implemented in Phase 5
    },
  });

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!portfolio) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center space-y-6 text-center">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Welcome to Calliope</h1>
          <p className="text-muted-foreground">You don't have a portfolio yet. Let's create one!</p>
        </div>
        <Button 
          size="lg" 
          onClick={() => createPortfolioMutation.mutate()}
          disabled={createPortfolioMutation.isPending}
        >
          {createPortfolioMutation.isPending ? 'Creating...' : 'Create My Portfolio'}
        </Button>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Portfolio Builder</CardTitle>
          <CardDescription>Edit your portfolio content and design</CardDescription>
        </CardHeader>
        <CardContent>
          <Button className="w-full" onClick={() => router.push('/builder')}>
            Open Builder
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Inbox</CardTitle>
          <CardDescription>Check messages from visitors</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="outline" className="w-full" onClick={() => router.push('/dashboard/inbox')}>
            View Messages
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Status</CardTitle>
          <CardDescription>
            {portfolio.isPublished ? 'Published' : 'Draft'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {portfolio.isPublished && portfolio.slug ? (
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground break-all">
                {process.env.NEXT_PUBLIC_APP_URL}/p/{portfolio.slug}
              </p>
              <Button variant="secondary" className="w-full" onClick={() => window.open(`/p/${portfolio.slug}`, '_blank')}>
                View Live
              </Button>
            </div>
          ) : (
            <Button variant="secondary" className="w-full" disabled>
              Not Published Yet
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
