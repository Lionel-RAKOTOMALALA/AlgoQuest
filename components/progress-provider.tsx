'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface ProgressContextType {
  progress: number;
  completedSections: string[];
  completeSection: (sectionId: string) => void;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [completedSections, setCompletedSections] = useState<string[]>([]);
  
  const totalSections = 6;
  const progress = (completedSections.length / totalSections) * 100;

  const completeSection = (sectionId: string) => {
    if (!completedSections.includes(sectionId)) {
      setCompletedSections([...completedSections, sectionId]);
    }
  };

  return (
    <ProgressContext.Provider value={{ progress, completedSections, completeSection }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
}