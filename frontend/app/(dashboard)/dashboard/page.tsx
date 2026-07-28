'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { portfolioService } from '@/services/portfolio';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { FRONTEND_ROUTES } from '@shared/constants/routes';
import { useAuth } from '@/hooks/useAuth';
import { motion } from 'framer-motion';
import { LayoutTemplate, Mail, Globe, Plus, ExternalLink, Sparkles, CheckCircle2, Clock } from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const { data: portfolio, isLoading } = useQuery({
    queryKey: ['portfolio', 'me'],
    queryFn: portfolioService.getMyPortfolio,
  });

  const createPortfolioMutation = useMutation({
    mutationFn: portfolioService.createPortfolio,
    onSuccess: (data) => {
      queryClient.setQueryData(['portfolio', 'me'], data);
      router.push(FRONTEND_ROUTES.BUILDER);
    },
  });

  const username = user?.name || user?.email?.split('@')[0] || 'User';

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
      </div>
    );
  }

  // Elegant, neat Empty State (No purple gradients)
  if (!portfolio) {
    return (
      <div className="flex min-h-[65vh] flex-col items-center justify-center p-4">
        <Card className="w-full max-w-md border border-border shadow-sm text-center p-6 bg-card">
          <CardHeader className="p-0 pb-4 flex flex-col items-center">
            <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center mb-4 text-foreground border">
              <Sparkles className="w-7 h-7 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold tracking-tight">Welcome to Calliope</CardTitle>
            <CardDescription className="text-muted-foreground text-sm mt-1.5 leading-relaxed">
              You don't have an active portfolio yet. Create your showcase in seconds.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0 pt-4">
            <Button
              size="lg"
              className="w-full font-semibold shadow-sm"
              onClick={() => createPortfolioMutation.mutate()}
              disabled={createPortfolioMutation.isPending}
            >
              <Plus className="w-4 h-4 mr-2" />
              {createPortfolioMutation.isPending ? 'Creating Portfolio...' : 'Create My Portfolio'}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto">
    <div className="space-y-8 max-w-6xl mx-auto px-4 sm:px-6 py-8 pb-12">
      {/* Welcome Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Welcome back, {username}
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Manage your portfolio content, check visitor messages, and view status.
          </p>
        </div>
        <div className="flex items-center gap-2 self-start md:self-auto">
          <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${
            portfolio.isPublished
              ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
              : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
          }`}>
            {portfolio.isPublished ? (
              <><CheckCircle2 className="w-3.5 h-3.5" /> Published</>
            ) : (
              <><Clock className="w-3.5 h-3.5" /> Draft</>
            )}
          </div>
        </div>
      </div>

      {/* Main Dashboard Action Cards Grid */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
        {/* Card 1: Builder */}
        <motion.div whileHover={{ y: -4, scale: 1.01 }} transition={{ duration: 0.2 }} className="h-full">
          <Card className="h-full flex flex-col justify-between border border-black/5 dark:border-white/10 shadow-sm hover:shadow-xl hover:shadow-violet-500/5 transition-all bg-white/40 dark:bg-white/[0.03] backdrop-blur-xl hover:border-violet-500/30 hover:bg-white/60 dark:hover:bg-white/[0.05]">
            <CardHeader>
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-3">
                <LayoutTemplate className="w-5 h-5" />
              </div>
              <CardTitle className="text-lg font-bold">Portfolio Builder</CardTitle>
              <CardDescription className="text-sm">
                Edit sections, customize content, and update your personal details.
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-auto pt-4 border-t border-black/5 dark:border-white/10">
              <Button className="w-full font-medium" onClick={() => router.push(FRONTEND_ROUTES.BUILDER)}>
                Open Builder
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Card 2: Inbox */}
        <motion.div whileHover={{ y: -4, scale: 1.01 }} transition={{ duration: 0.2 }} className="h-full">
          <Card className="h-full flex flex-col justify-between border border-black/5 dark:border-white/10 shadow-sm hover:shadow-xl hover:shadow-violet-500/5 transition-all bg-white/40 dark:bg-white/[0.03] backdrop-blur-xl hover:border-violet-500/30 hover:bg-white/60 dark:hover:bg-white/[0.05]">
            <CardHeader>
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-3">
                <Mail className="w-5 h-5" />
              </div>
              <CardTitle className="text-lg font-bold">Visitor Inbox</CardTitle>
              <CardDescription className="text-sm">
                Read contact submissions and inquiries sent by visitors on your page.
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-auto pt-4 border-t border-black/5 dark:border-white/10">
              <Button variant="outline" className="w-full font-medium" onClick={() => router.push(FRONTEND_ROUTES.INBOX)}>
                View Messages
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Card 3: Status & Public Link */}
        <motion.div whileHover={{ y: -4, scale: 1.01 }} transition={{ duration: 0.2 }} className="h-full">
          <Card className="h-full flex flex-col justify-between border border-black/5 dark:border-white/10 shadow-sm hover:shadow-xl hover:shadow-violet-500/5 transition-all bg-white/40 dark:bg-white/[0.03] backdrop-blur-xl hover:border-violet-500/30 hover:bg-white/60 dark:hover:bg-white/[0.05]">
            <CardHeader>
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-3">
                <Globe className="w-5 h-5" />
              </div>
              <CardTitle className="text-lg font-bold">Public Portfolio</CardTitle>
              <CardDescription className="text-sm">
                {portfolio.isPublished && portfolio.slug
                  ? `Live at /p/${portfolio.slug}`
                  : 'Publish your portfolio in the builder to share your link with the world.'}
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-auto pt-4 border-t border-black/5 dark:border-white/10">
              {portfolio.isPublished && portfolio.slug ? (
                <Button variant="secondary" className="w-full font-medium" onClick={() => window.open(`/p/${portfolio.slug}`, '_blank')}>
                  <ExternalLink className="w-4 h-4 mr-2" /> View Live
                </Button>
              ) : (
                <Button variant="secondary" className="w-full font-medium" disabled>
                  Not Published Yet
                </Button>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
    </div>
  );
}
