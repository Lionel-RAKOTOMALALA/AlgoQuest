'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { toast } from 'sonner';

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedAt?: Date;
}

interface PlayerStats {
  level: number;
  points: number;
  streakDays: number;
  totalExercises: number;
  correctAnswers: number;
}

interface GameContextType {
  playerStats: PlayerStats;
  badges: Badge[];
  addPoints: (points: number) => void;
  earnBadge: (badgeId: string) => void;
  completeExercise: (correct: boolean) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

const initialBadges: Badge[] = [
  {
    id: 'first-steps',
    name: 'Premiers Pas',
    description: 'Terminer la section introduction',
    icon: '🚀',
    earned: false
  },
  {
    id: 'organizer',
    name: 'Maître Organisateur',
    description: 'Classer correctement 10 types de données',
    icon: '🏆',
    earned: false
  },
  {
    id: 'detective',
    name: 'Détective des Types',
    description: 'Identifier 20 types de données sans erreur',
    icon: '🔍',
    earned: false
  },
  {
    id: 'architect',
    name: 'Architecte de Données',
    description: 'Créer 3 structures de données',
    icon: '🏗️',
    earned: false
  },
  {
    id: 'train-master',
    name: 'Chef de Gare',
    description: 'Maîtriser les vecteurs et tableaux',
    icon: '🚂',
    earned: false
  },
  {
    id: 'function-engineer',
    name: 'Ingénieur Fonctions',
    description: 'Créer 5 fonctions différentes',
    icon: '⚙️',
    earned: false
  }
];

export function GameProvider({ children }: { children: ReactNode }) {
  const [playerStats, setPlayerStats] = useState<PlayerStats>({
    level: 1,
    points: 0,
    streakDays: 0,
    totalExercises: 0,
    correctAnswers: 0
  });

  const [badges, setBadges] = useState<Badge[]>(initialBadges);

  const addPoints = (points: number) => {
    setPlayerStats(prev => {
      const newPoints = prev.points + points;
      const newLevel = Math.floor(newPoints / 100) + 1;
      
      if (newLevel > prev.level) {
        toast.success(`🎉 Niveau ${newLevel} atteint ! Félicitations !`);
      }
      
      return {
        ...prev,
        points: newPoints,
        level: newLevel
      };
    });
  };

  const earnBadge = (badgeId: string) => {
    setBadges(prev => prev.map(badge => 
      badge.id === badgeId 
        ? { ...badge, earned: true, earnedAt: new Date() }
        : badge
    ));
    
    const badge = badges.find(b => b.id === badgeId);
    if (badge && !badge.earned) {
      toast.success(`🏆 Badge débloqué : ${badge.name} ${badge.icon}`);
      addPoints(50);
    }
  };

  const completeExercise = (correct: boolean) => {
    setPlayerStats(prev => ({
      ...prev,
      totalExercises: prev.totalExercises + 1,
      correctAnswers: correct ? prev.correctAnswers + 1 : prev.correctAnswers
    }));
    
    if (correct) {
      addPoints(10);
    }
  };

  return (
    <GameContext.Provider value={{
      playerStats,
      badges,
      addPoints,
      earnBadge,
      completeExercise
    }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}