'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/header';
import { Navigation } from '@/components/navigation';
import { IntroductionSection } from '@/components/sections/introduction-section';
import { TypesSection } from '@/components/sections/types-section';
import { StructuresSection } from '@/components/sections/structures-section';
import { VectorsSection } from '@/components/sections/vectors-section';
import { FunctionsSection } from '@/components/sections/functions-section';
import { ExercisesSection } from '@/components/sections/exercises-section';
import { ProgressProvider } from '@/components/progress-provider';
import { GameProvider } from '@/components/game-provider';

export default function Home() {
  const [activeSection, setActiveSection] = useState('introduction');

  const renderSection = () => {
    switch (activeSection) {
      case 'introduction':
        return <IntroductionSection />;
      case 'types':
        return <TypesSection />;
      case 'structures':
        return <StructuresSection />;
      case 'vectors':
        return <VectorsSection />;
      case 'functions':
        return <FunctionsSection />;
      case 'exercises':
        return <ExercisesSection />;
      default:
        return <IntroductionSection />;
    }
  };

  return (
    <GameProvider>
      <ProgressProvider>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">
          <Header />
          <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
          <main className="container mx-auto px-4 py-8">
            {renderSection()}
          </main>
        </div>
      </ProgressProvider>
    </GameProvider>
  );
}