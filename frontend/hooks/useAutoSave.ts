'use client';

import { useEffect, useRef, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { portfolioService } from '@/services/portfolio';
import type { IPortfolio } from '@shared/types/portfolio';

type SaveStatus = 'idle' | 'saving' | 'saved' | 'error';

export function useAutoSave(portfolio: IPortfolio | null) {
  const queryClient = useQueryClient();
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle');
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);
  const isFirstRender = useRef(true);

  const mutation = useMutation({
    mutationFn: (data: Partial<IPortfolio>) => {
      if (!portfolio?._id) throw new Error('No portfolio ID');
      return portfolioService.updatePortfolio(portfolio._id, data);
    },
    onMutate: () => {
      setSaveStatus('saving');
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['portfolio', 'me'], data);
      setSaveStatus('saved');
      
      // Reset back to idle after a few seconds
      setTimeout(() => setSaveStatus('idle'), 2000);
    },
    onError: (error) => {
      console.error('Auto-save failed:', error);
      setSaveStatus('error');
    },
  });

  useEffect(() => {
    // Skip the very first render to avoid immediately saving initial fetch
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (!portfolio || !portfolio._id) return;

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    setSaveStatus('saving'); // Show intention to save

    debounceTimer.current = setTimeout(() => {
      // Create a payload with just the mutable sections (excluding id, ownerId, etc)
      const { _id, ownerId, __v, ...mutableData } = portfolio as any;
      mutation.mutate(mutableData);
    }, 1500); // 1.5 second debounce

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [portfolio]);

  return { saveStatus };
}
