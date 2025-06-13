'use client';

import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { Home, Package, FileText, Database, Layers } from 'lucide-react';
import { useProgress } from '@/components/progress-provider';
import { useGame } from '@/components/game-provider';
import { gsap } from 'gsap';

export function IntroductionSection() {
  const { completeSection } = useProgress();
  const { earnBadge } = useGame();
  const animationRef = useRef<HTMLDivElement>(null);
  const houseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (animationRef.current) {
      gsap.fromTo(
        animationRef.current.children,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, stagger: 0.2, duration: 0.8, ease: "power2.out" }
      );
    }

    if (houseRef.current) {
      gsap.fromTo(
        houseRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1, ease: "bounce.out", delay: 0.5 }
      );
    }
  }, []);

  const handleCompleteIntro = () => {
    completeSection('introduction');
    earnBadge('first-steps');
  };

  return (
    <div ref={animationRef} className="space-y-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          🚀 Bienvenue dans l'Univers des Structures de Données
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Découvrez les bases essentielles de l'algorithmique avec votre professeur 
          <span className="font-semibold text-blue-600"> Lionel Rakotomalala</span> de Brocoding
        </p>
      </motion.div>

      <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 border-2 border-blue-200 dark:border-blue-700">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Home className="w-6 h-6 text-blue-600" />
            <span>🏠 Qu'est-ce qu'une Structure de Données ?</span>
          </CardTitle>
          <CardDescription>
            Comprenons avec une analogie simple et visuelle
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <p className="text-lg">
                Imaginez votre maison comme un système d'organisation parfait :
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                    👕
                  </div>
                  <span>Votre <strong>armoire</strong> range les vêtements par type</span>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                  <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                    📚
                  </div>
                  <span>Votre <strong>bibliothèque</strong> organise les livres par genre</span>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                  <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                    🍎
                  </div>
                  <span>Votre <strong>réfrigérateur</strong> sépare les aliments par catégorie</span>
                </div>
              </div>
            </div>

            <div ref={houseRef} className="relative">
              <div className="bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 p-6 rounded-2xl shadow-lg">
                <div className="text-center">
                  <div className="text-6xl mb-4">🏠</div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                    Maison = Structure de Données
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Chaque pièce a sa fonction !
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-200 dark:border-green-700">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Package className="w-6 h-6 text-green-600" />
            <span>💻 En Programmation, c'est Pareil !</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg text-center"
            >
              <div className="text-3xl mb-2">🔢</div>
              <h4 className="font-semibold text-blue-800 dark:text-blue-200">Boîte NOMBRES</h4>
              <p className="text-sm text-blue-600 dark:text-blue-400">42, 3.14, -7</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg text-center"
            >
              <div className="text-3xl mb-2">📝</div>
              <h4 className="font-semibold text-purple-800 dark:text-purple-200">Boîte TEXTES</h4>
              <p className="text-sm text-purple-600 dark:text-purple-400">"Bonjour", "Alice"</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg text-center"
            >
              <div className="text-3xl mb-2">✅</div>
              <h4 className="font-semibold text-green-800 dark:text-green-200">Boîte VRAI/FAUX</h4>
              <p className="text-sm text-green-600 dark:text-green-400">true, false</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-orange-50 dark:bg-orange-900/30 p-4 rounded-lg text-center"
            >
              <div className="text-3xl mb-2">🎯</div>
              <h4 className="font-semibold text-orange-800 dark:text-orange-200">Boîte MIXTE</h4>
              <p className="text-sm text-orange-600 dark:text-orange-400">Structures complexes</p>
            </motion.div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 border-2 border-purple-200 dark:border-purple-700">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Layers className="w-6 h-6 text-purple-600" />
            <span>🎯 Objectifs de ce Cours</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold text-lg">Vous apprendrez à :</h4>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2">
                  <Badge variant="outline" className="w-6 h-6 p-0 flex items-center justify-center">1</Badge>
                  <span>Maîtriser les types de données simples</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Badge variant="outline" className="w-6 h-6 p-0 flex items-center justify-center">2</Badge>
                  <span>Créer des structures de données complexes</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Badge variant="outline" className="w-6 h-6 p-0 flex items-center justify-center">3</Badge>
                  <span>Manipuler les vecteurs et tableaux</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Badge variant="outline" className="w-6 h-6 p-0 flex items-center justify-center">4</Badge>
                  <span>Développer des fonctions efficaces</span>
                </li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold text-lg">Méthode gamifiée :</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white dark:bg-gray-800 p-3 rounded-lg text-center">
                  <div className="text-2xl mb-1">🏆</div>
                  <p className="text-sm font-medium">Badges</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-3 rounded-lg text-center">
                  <div className="text-2xl mb-1">⭐</div>
                  <p className="text-sm font-medium">Points</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-3 rounded-lg text-center">
                  <div className="text-2xl mb-1">🎯</div>
                  <p className="text-sm font-medium">Défis</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-3 rounded-lg text-center">
                  <div className="text-2xl mb-1">🚀</div>
                  <p className="text-sm font-medium">Niveaux</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="text-center">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={handleCompleteIntro}
            size="lg"
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold px-8 py-3 rounded-full shadow-lg"
          >
            🚀 Commencer l'Aventure !
          </Button>
        </motion.div>
      </div>
    </div>
  );
}