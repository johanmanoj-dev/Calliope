'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import type { IPortfolio } from '@shared/types/portfolio';

type SectionType = 'hero' | 'about' | 'skills' | 'projects' | 'education' | 'experience' | 'contact' | 'settings';

interface PortfolioContextType {
  portfolio: IPortfolio | null;
  setPortfolio: React.Dispatch<React.SetStateAction<IPortfolio | null>>;
  activeSection: SectionType;
  setActiveSection: (section: SectionType) => void;
  updateSection: (section: keyof IPortfolio, data: any) => void;
  updatePortfolio: (patch: Partial<IPortfolio>) => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export function PortfolioProvider({ children, initialPortfolio }: { children: ReactNode, initialPortfolio: IPortfolio | null }) {
  const [portfolio, setPortfolio] = useState<IPortfolio | null>(initialPortfolio);
  const [activeSection, setActiveSection] = useState<SectionType>('hero');

  useEffect(() => {
    if (initialPortfolio) {
      setPortfolio(initialPortfolio);
    }
  }, [initialPortfolio]);

  const updateSection = (section: keyof IPortfolio, data: any) => {
    setPortfolio((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        [section]: data,
      };
    });
  };

  const updatePortfolio = (patch: Partial<IPortfolio>) => {
    setPortfolio((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        ...patch,
      };
    });
  };

  return (
    <PortfolioContext.Provider
      value={{
        portfolio,
        setPortfolio,
        activeSection,
        setActiveSection,
        updateSection,
        updatePortfolio,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
}
