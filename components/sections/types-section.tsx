'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Hash, 
  Calculator, 
  Type, 
  ToggleLeft, 
  Zap, 
  CheckCircle, 
  XCircle,
  Timer,
  Trophy
} from 'lucide-react';
import { useProgress } from '@/components/progress-provider';
import { useGame } from '@/components/game-provider';
import { gsap } from 'gsap';
import { toast } from 'sonner';

interface TypeExample {
  value: string;
  type: 'entier' | 'réel' | 'chaîne' | 'booléen';
  description: string;
}

const typeExamples: TypeExample[] = [
  { value: '42', type: 'entier', description: 'Âge d\'un étudiant' },
  { value: '3.14', type: 'réel', description: 'Valeur de π' },
  { value: '"Bonjour"', type: 'chaîne', description: 'Message de salutation' },
  { value: 'true', type: 'booléen', description: 'Vrai ou faux' },
  { value: '-5', type: 'entier', description: 'Température négative' },
  { value: '14.75', type: 'réel', description: 'Moyenne de notes' },
  { value: '"Alice"', type: 'chaîne', description: 'Prénom' },
  { value: 'false', type: 'booléen', description: 'Valeur fausse' },
];

const gameValues = [
  { value: '123', type: 'entier' },
  { value: '"Hello"', type: 'chaîne' },
  { value: '45.6', type: 'réel' },
  { value: 'true', type: 'booléen' },
  { value: '0', type: 'entier' },
  { value: '"2024"', type: 'chaîne' },
  { value: 'false', type: 'booléen' },
  { value: '-3.14', type: 'réel' },
  { value: '"Test"', type: 'chaîne' },
  { value: '999', type: 'entier' },
];

export function TypesSection() {
  const { completeSection } = useProgress();
  const { earnBadge, addPoints, completeExercise } = useGame();
  const [gameMode, setGameMode] = useState<'learn' | 'detective'>('learn');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameActive, setGameActive] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [gameResults, setGameResults] = useState<boolean[]>([]);
  
  const animationRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (animationRef.current) {
      gsap.fromTo(
        animationRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.15, duration: 0.6, ease: "power2.out" }
      );
    }
  }, []);

  useEffect(() => {
    cardRefs.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(
          card,
          { scale: 0.8, opacity: 0 },
          { 
            scale: 1, 
            opacity: 1, 
            duration: 0.5, 
            delay: index * 0.1,
            ease: "back.out(1.7)" 
          }
        );
      }
    });
  }, [gameMode]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameActive && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0) {
      handleGameEnd();
    }
    return () => clearTimeout(timer);
  }, [timeLeft, gameActive]);

  const startDetectiveGame = () => {
    setGameMode('detective');
    setGameActive(true);
    setCurrentQuestion(0);
    setScore(0);
    setTimeLeft(30);
    setGameResults([]);
    setSelectedAnswer(null);
  };

  const handleAnswer = (answer: string) => {
    if (!gameActive) return;
    
    const correct = answer === gameValues[currentQuestion].type;
    const newResults = [...gameResults, correct];
    setGameResults(newResults);
    
    if (correct) {
      setScore(score + 10);
      addPoints(10);
      toast.success('Correct ! +10 points');
    } else {
      toast.error('Incorrect !');
    }
    
    completeExercise(correct);
    
    if (currentQuestion < gameValues.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      handleGameEnd();
    }
  };

  const handleGameEnd = () => {
    setGameActive(false);
    const correctCount = gameResults.filter(r => r).length;
    const accuracy = (correctCount / gameValues.length) * 100;
    
    if (accuracy >= 80) {
      earnBadge('detective');
      toast.success('🏆 Badge "Détective des Types" débloqué !');
    }
    
    if (accuracy === 100) {
      earnBadge('organizer');
      addPoints(50);
    }
    
    completeSection('types');
  };

  const resetGame = () => {
    setGameMode('learn');
    setGameActive(false);
    setCurrentQuestion(0);
    setScore(0);
    setTimeLeft(30);
    setGameResults([]);
    setSelectedAnswer(null);
  };

  return (
    <div ref={animationRef} className="space-y-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
          📦 Les Types de Données Simples
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Découvrez les 4 types fondamentaux qui constituent la base de tout programme
        </p>
      </motion.div>

      {gameMode === 'learn' && (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card 
            ref={el => cardRefs.current[0] = el}
            className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-2 border-blue-200 dark:border-blue-700 hover:shadow-lg transition-all duration-300"
          >
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-blue-800 dark:text-blue-200">
                <Hash className="w-5 h-5" />
                <span>🔢 ENTIER</span>
              </CardTitle>
              <CardDescription>Nombres sans virgule</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                <p className="font-mono text-sm mb-2">age ← 20</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">L'âge d'un étudiant</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                <p className="font-mono text-sm mb-2">score ← 0</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Score initial d'un jeu</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                <p className="font-mono text-sm mb-2">temperature ← -5</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Température en hiver</p>
              </div>
              <Badge variant="outline" className="w-full justify-center">
                🏢 Comme les étages d'un immeuble
              </Badge>
            </CardContent>
          </Card>

          <Card 
            ref={el => cardRefs.current[1] = el}
            className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-2 border-green-200 dark:border-green-700 hover:shadow-lg transition-all duration-300"
          >
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-green-800 dark:text-green-200">
                <Calculator className="w-5 h-5" />
                <span>🎯 RÉEL</span>
              </CardTitle>
              <CardDescription>Nombres avec virgule</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                <p className="font-mono text-sm mb-2">moyenne ← 14.75</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Moyenne de notes</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                <p className="font-mono text-sm mb-2">prix ← 29.99</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Prix d'un livre</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                <p className="font-mono text-sm mb-2">taille ← 1.75</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Taille en mètres</p>
              </div>
              <Badge variant="outline" className="w-full justify-center">
                🍽️ Comme les mesures de cuisine
              </Badge>
            </CardContent>
          </Card>

          <Card 
            ref={el => cardRefs.current[2] = el}
            className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-2 border-purple-200 dark:border-purple-700 hover:shadow-lg transition-all duration-300"
          >
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-purple-800 dark:text-purple-200">
                <Type className="w-5 h-5" />
                <span>📝 CHAÎNE</span>
              </CardTitle>
              <CardDescription>Suite de caractères</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                <p className="font-mono text-sm mb-2">nom ← "Alice"</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Prénom d'une personne</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                <p className="font-mono text-sm mb-2">ville ← "Paris"</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Nom de ville</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                <p className="font-mono text-sm mb-2">message ← "Bonjour L1 !"</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Message d'accueil</p>
              </div>
              <Badge variant="outline" className="w-full justify-center">
                🏷️ Comme les étiquettes
              </Badge>
            </CardContent>
          </Card>

          <Card 
            ref={el => cardRefs.current[3] = el}
            className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-2 border-orange-200 dark:border-orange-700 hover:shadow-lg transition-all duration-300"
          >
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-orange-800 dark:text-orange-200">
                <ToggleLeft className="w-5 h-5" />
                <span>✅ BOOLÉEN</span>
              </CardTitle>
              <CardDescription>Vrai ou Faux uniquement</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                <p className="font-mono text-sm mb-2">estPresent ← vrai</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">L'étudiant est-il présent ?</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                <p className="font-mono text-sm mb-2">aReussi ← faux</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">A-t-il réussi l'examen ?</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                <p className="font-mono text-sm mb-2">estMajeur ← vrai</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Est-il majeur ?</p>
              </div>
              <Badge variant="outline" className="w-full justify-center">
                💡 Comme un interrupteur
              </Badge>
            </CardContent>
          </Card>
        </div>
      )}

      {gameMode === 'detective' && (
        <Card className="bg-gradient-to-br from-yellow-50 to-orange-100 dark:from-yellow-900/20 dark:to-orange-900/20 border-2 border-yellow-200 dark:border-yellow-700">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Zap className="w-6 h-6 text-yellow-600" />
                <span>🔍 Mode Détective des Types</span>
              </div>
              <div className="flex items-center space-x-4">
                <Badge variant="outline" className="flex items-center space-x-1">
                  <Timer className="w-4 h-4" />
                  <span>{timeLeft}s</span>
                </Badge>
                <Badge variant="outline" className="flex items-center space-x-1">
                  <Trophy className="w-4 h-4" />
                  <span>{score} pts</span>
                </Badge>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {gameActive ? (
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-2">
                    Question {currentQuestion + 1} / {gameValues.length}
                  </h3>
                  <div className="text-4xl font-mono bg-white dark:bg-gray-800 p-4 rounded-lg inline-block">
                    {gameValues[currentQuestion].value}
                  </div>
                  <p className="text-lg mt-2">Quel est le type de cette valeur ?</p>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {['entier', 'réel', 'chaîne', 'booléen'].map((type) => (
                    <motion.button
                      key={type}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleAnswer(type)}
                      className="p-4 bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500 transition-colors"
                    >
                      <div className="text-lg font-semibold capitalize">{type}</div>
                    </motion.button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center space-y-4">
                <h3 className="text-2xl font-bold">Jeu Terminé !</h3>
                <div className="text-lg">
                  Score final : <span className="font-bold">{score} points</span>
                </div>
                <div className="text-lg">
                  Bonnes réponses : <span className="font-bold">{gameResults.filter(r => r).length} / {gameResults.length}</span>
                </div>
                <div className="flex justify-center space-x-4">
                  <Button onClick={resetGame} variant="outline">
                    📚 Retour au cours
                  </Button>
                  <Button onClick={startDetectiveGame}>
                    🔄 Rejouer
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {gameMode === 'learn' && (
        <div className="text-center space-y-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={startDetectiveGame}
              size="lg"
              className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold px-8 py-3 rounded-full shadow-lg"
            >
              🔍 Devenir Détective des Types !
            </Button>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={() => {
                completeSection('types');
                earnBadge('organizer');
              }}
              variant="outline"
              size="lg"
              className="font-semibold px-8 py-3 rounded-full"
            >
              ✅ Terminer cette section
            </Button>
          </motion.div>
        </div>
      )}
    </div>
  );
}