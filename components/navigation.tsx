'use client';

import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion';
import { 
  Home, 
  Database, 
  Code, 
  Layers, 
  Zap, 
  BookOpen,
  CheckCircle 
} from 'lucide-react';
import { useProgress } from '@/components/progress-provider';

interface NavigationProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const sections = [
  { id: 'introduction', label: 'Introduction', icon: Home },
  { id: 'types', label: 'Types Simples', icon: Database },
  { id: 'structures', label: 'Structures', icon: Layers },
  { id: 'vectors', label: 'Vecteurs', icon: Code },
  { id: 'functions', label: 'Fonctions', icon: Zap },
  { id: 'exercises', label: 'Exercices', icon: BookOpen },
];

export function Navigation({ activeSection, setActiveSection }: NavigationProps) {
  const { progress, completedSections } = useProgress();

  return (
    <nav className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
          {sections.map((section) => {
            const Icon = section.icon;
            const isActive = activeSection === section.id;
            const isCompleted = completedSections.includes(section.id);
            
            return (
              <motion.div
                key={section.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant={isActive ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setActiveSection(section.id)}
                  className={`relative flex items-center space-x-2 ${
                    isActive ? 'bg-gradient-to-r from-blue-500 to-purple-500' : ''
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{section.label}</span>
                  {isCompleted && (
                    <CheckCircle className="w-3 h-3 text-green-500 absolute -top-1 -right-1" />
                  )}
                </Button>
              </motion.div>
            );
          })}
        </div>
        
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600 dark:text-gray-400">Progression:</span>
          <Progress value={progress} className="flex-1 max-w-xs" />
          <span className="text-sm font-medium">{Math.round(progress)}%</span>
        </div>
      </div>
    </nav>
  );
}