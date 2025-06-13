'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { motion } from 'framer-motion';
import { 
  Star, 
  BookOpen, 
  Trophy, 
  Target, 
  Zap, 
  Lock,
  CheckCircle,
  AlertTriangle,
  Lightbulb
} from 'lucide-react';
import { useProgress } from '@/components/progress-provider';
import { useGame } from '@/components/game-provider';
import { gsap } from 'gsap';

interface Exercise {
  id: string;
  title: string;
  difficulty: 1 | 2 | 3;
  description: string;
  objective: string;
  hints: string[];
  solution?: string;
  badge?: string;
  points: number;
}

const exercises: Exercise[] = [
  {
    id: 'ex1-1',
    title: 'Ma Première Structure',
    difficulty: 1,
    description: 'Vous gérez un magasin de livres. Créez une structure "Livre" qui contient : titre (chaîne), auteur (chaîne), prix (réel), pages (entier), disponible (booléen).',
    objective: 'Déclarez ensuite un livre "Le Petit Prince" d\'Antoine de Saint-Exupéry, 12.50€, 96 pages, disponible.',
    hints: [
      'Utilisez le mot-clé "structure" pour définir votre type',
      'N\'oubliez pas de spécifier le type de chaque champ',
      'Utilisez une variable pour créer une instance de votre structure'
    ],
    badge: 'Libraire Apprenti',
    points: 25
  },
  {
    id: 'ex1-2',
    title: 'Mes Premiers Vecteurs',
    difficulty: 1,
    description: 'Créez un vecteur pour stocker les températures de la semaine. Ajoutez les températures suivantes : 22, 19, 25, 23, 21, 18, 20.',
    objective: 'Affichez ensuite toutes les températures avec le jour correspondant.',
    hints: [
      'Déclarez un vecteur de 7 éléments pour les 7 jours',
      'Utilisez une boucle pour afficher les résultats',
      'Créez un vecteur de chaînes pour les noms des jours'
    ],
    badge: 'Météorologue Débutant',
    points: 25
  },
  {
    id: 'ex1-3',
    title: 'Ma Première Fonction',
    difficulty: 1,
    description: 'Créez une fonction qui calcule l\'âge d\'une personne à partir de son année de naissance.',
    objective: 'L\'année actuelle est 2024. Testez avec l\'année 2003.',
    hints: [
      'La fonction prend un paramètre : anneeNaissance (entier)',
      'Elle retourne un entier (l\'âge)',
      'Formule : 2024 - anneeNaissance'
    ],
    badge: 'Calculateur de Temps',
    points: 25
  },
  {
    id: 'ex2-1',
    title: 'Gestion de Notes',
    difficulty: 2,
    description: 'Créez un système de gestion de notes avec plusieurs fonctions.',
    objective: 'Implémentez : calculer la moyenne, vérifier si l\'étudiant a la moyenne (≥10), compter les notes supérieures à 15. Testez avec : 12, 8, 16, 14, 9, 18, 13',
    hints: [
      'Créez une fonction pour chaque opération',
      'Utilisez des boucles pour parcourir le vecteur',
      'La moyenne = somme / nombre d\'éléments'
    ],
    badge: 'Professeur Assistant',
    points: 50
  },
  {
    id: 'ex2-2',
    title: 'Carnet d\'Adresses',
    difficulty: 2,
    description: 'Créez une structure "Contact" avec nom, téléphone, email, ville.',
    objective: 'Créez un vecteur de 5 contacts et une fonction pour rechercher un contact par nom.',
    hints: [
      'Définissez d\'abord la structure Contact',
      'Créez un vecteur de structures',
      'La fonction de recherche retourne l\'index (-1 si non trouvé)'
    ],
    badge: 'Maître des Contacts',
    points: 50
  },
  {
    id: 'ex3-1',
    title: 'Système de Gestion d\'École',
    difficulty: 3,
    description: 'Développez un système complet de gestion d\'école.',
    objective: 'Créez les structures Étudiant et Classe, puis implémentez toutes les fonctions de gestion.',
    hints: [
      'Structure Étudiant : nom, prénom, âge, vecteur de notes',
      'Structure Classe : nom, niveau, vecteur d\'étudiants',
      'Fonctions : moyennes, classements, statistiques'
    ],
    badge: 'Architecte Système',
    points: 100
  }
];

export function ExercisesSection() {
  const { completeSection } = useProgress();
  const { earnBadge, addPoints } = useGame();
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [completedExercises, setCompletedExercises] = useState<string[]>([]);
  const [showHints, setShowHints] = useState<boolean>(false);
  const [activeLevel, setActiveLevel] = useState<1 | 2 | 3>(1);

  const animationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (animationRef.current) {
      gsap.fromTo(
        animationRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: "power2.out" }
      );
    }
  }, []);

  const getDifficultyColor = (difficulty: number) => {
    switch (difficulty) {
      case 1: return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      case 2: return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300';
      case 3: return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
    }
  };

  const getDifficultyStars = (difficulty: number) => {
    return '★'.repeat(difficulty) + '☆'.repeat(3 - difficulty);
  };

  const isExerciseUnlocked = (exercise: Exercise) => {
    if (exercise.difficulty === 1) return true;
    if (exercise.difficulty === 2) {
      return completedExercises.some(id => exercises.find(ex => ex.id === id)?.difficulty === 1);
    }
    if (exercise.difficulty === 3) {
      return completedExercises.some(id => exercises.find(ex => ex.id === id)?.difficulty === 2);
    }
    return false;
  };

  const completeExercise = (exerciseId: string) => {
    if (!completedExercises.includes(exerciseId)) {
      const exercise = exercises.find(ex => ex.id === exerciseId);
      if (exercise) {
        setCompletedExercises([...completedExercises, exerciseId]);
        addPoints(exercise.points);
        if (exercise.badge) {
          // Simulate badge earning based on exercise
          setTimeout(() => {
            earnBadge('architect'); // Simplified for demo
          }, 500);
        }
      }
    }
  };

  const filteredExercises = exercises.filter(ex => ex.difficulty === activeLevel);

  return (
    <div ref={animationRef} className="space-y-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-4">
          📚 Exercices Progressifs
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Mettez en pratique vos connaissances avec des exercices adaptés à votre niveau
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <Card className={`cursor-pointer transition-all duration-300 ${activeLevel === 1 ? 'ring-2 ring-green-500' : ''}`}>
          <CardHeader className="pb-3" onClick={() => setActiveLevel(1)}>
            <CardTitle className="flex items-center space-x-2 text-green-600">
              <Star className="w-5 h-5" />
              <span>Niveau Débutant</span>
            </CardTitle>
            <CardDescription>★☆☆ - Bases essentielles</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {completedExercises.filter(id => exercises.find(ex => ex.id === id)?.difficulty === 1).length}
              </div>
              <div className="text-sm text-green-600">/ 3 exercices</div>
            </div>
          </CardContent>
        </Card>

        <Card className={`cursor-pointer transition-all duration-300 ${activeLevel === 2 ? 'ring-2 ring-yellow-500' : ''}`}>
          <CardHeader className="pb-3" onClick={() => setActiveLevel(2)}>
            <CardTitle className="flex items-center space-x-2 text-yellow-600">
              <Target className="w-5 h-5" />
              <span>Niveau Intermédiaire</span>
            </CardTitle>
            <CardDescription>★★☆ - Combinaisons avancées</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {completedExercises.filter(id => exercises.find(ex => ex.id === id)?.difficulty === 2).length}
              </div>
              <div className="text-sm text-yellow-600">/ 2 exercices</div>
            </div>
          </CardContent>
        </Card>

        <Card className={`cursor-pointer transition-all duration-300 ${activeLevel === 3 ? 'ring-2 ring-red-500' : ''}`}>
          <CardHeader className="pb-3" onClick={() => setActiveLevel(3)}>
            <CardTitle className="flex items-center space-x-2 text-red-600">
              <Trophy className="w-5 h-5" />
              <span>Niveau Expert</span>
            </CardTitle>
            <CardDescription>★★★ - Projets complets</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {completedExercises.filter(id => exercises.find(ex => ex.id === id)?.difficulty === 3).length}
              </div>
              <div className="text-sm text-red-600">/ 1 exercice</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold flex items-center space-x-2">
            <BookOpen className="w-5 h-5" />
            <span>Exercices Niveau {activeLevel}</span>
          </h3>
          
          {filteredExercises.map((exercise) => {
            const isCompleted = completedExercises.includes(exercise.id);
            const isUnlocked = isExerciseUnlocked(exercise);
            
            return (
              <motion.div
                key={exercise.id}
                whileHover={{ scale: isUnlocked ? 1.02 : 1 }}
                className={`cursor-pointer ${!isUnlocked ? 'opacity-50' : ''}`}
                onClick={() => isUnlocked && setSelectedExercise(exercise)}
              >
                <Card className={`transition-all duration-300 ${
                  selectedExercise?.id === exercise.id ? 'ring-2 ring-blue-500' : ''
                } ${isCompleted ? 'bg-green-50 dark:bg-green-900/10' : ''}`}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center space-x-2">
                        {!isUnlocked ? (
                          <Lock className="w-5 h-5 text-gray-400" />
                        ) : isCompleted ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <Zap className="w-5 h-5 text-blue-600" />
                        )}
                        <span className={!isUnlocked ? 'text-gray-400' : ''}>{exercise.title}</span>
                      </CardTitle>
                      <div className="flex items-center space-x-2">
                        <Badge className={getDifficultyColor(exercise.difficulty)}>
                          {getDifficultyStars(exercise.difficulty)}
                        </Badge>
                        <Badge variant="outline">{exercise.points} pts</Badge>
                      </div>
                    </div>
                    <CardDescription className={!isUnlocked ? 'text-gray-400' : ''}>
                      {exercise.description}
                    </CardDescription>
                  </CardHeader>
                  {exercise.badge && (
                    <CardContent className="pt-0">
                      <Badge variant="secondary" className="text-xs">
                        🏆 Badge: {exercise.badge}
                      </Badge>
                    </CardContent>
                  )}
                </Card>
              </motion.div>
            );
          })}
        </div>

        <div className="space-y-4">
          {selectedExercise ? (
            <Card className="h-fit">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{selectedExercise.title}</span>
                  <Badge className={getDifficultyColor(selectedExercise.difficulty)}>
                    {getDifficultyStars(selectedExercise.difficulty)}
                  </Badge>
                </CardTitle>
                <CardDescription>{selectedExercise.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert>
                  <Target className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Objectif :</strong> {selectedExercise.objective}
                  </AlertDescription>
                </Alert>

                <div className="space-y-2">
                  <Button
                    onClick={() => setShowHints(!showHints)}
                    variant="outline"
                    size="sm"
                    className="w-full"
                  >
                    <Lightbulb className="w-4 h-4 mr-2" />
                    {showHints ? 'Masquer les indices' : 'Afficher les indices'}
                  </Button>
                  
                  {showHints && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="space-y-2"
                    >
                      {selectedExercise.hints.map((hint, index) => (
                        <Alert key={index} className="bg-blue-50 dark:bg-blue-900/20">
                          <AlertTriangle className="h-4 w-4" />
                          <AlertDescription>
                            <strong>Indice {index + 1} :</strong> {hint}
                          </AlertDescription>
                        </Alert>
                      ))}
                    </motion.div>
                  )}
                </div>

                <div className="pt-4 border-t">
                  <div className="text-center space-y-4">
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        💡 Cet exercice est à réaliser sur papier ou dans votre environnement de développement préféré.
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500">
                        Les solutions ne sont pas fournies volontairement pour encourager l'apprentissage autonome.
                      </p>
                    </div>
                    
                    {!completedExercises.includes(selectedExercise.id) && (
                      <Button
                        onClick={() => completeExercise(selectedExercise.id)}
                        className="w-full"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Marquer comme terminé (+{selectedExercise.points} points)
                      </Button>
                    )}
                    
                    {completedExercises.includes(selectedExercise.id) && (
                      <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                        <p className="text-green-700 dark:text-green-300 font-semibold">
                          Exercice terminé ! 🎉
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="h-fit">
              <CardContent className="p-8 text-center">
                <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">
                  Sélectionnez un exercice
                </h3>
                <p className="text-gray-500 dark:text-gray-500">
                  Choisissez un exercice dans la liste pour voir les détails et commencer à travailler.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <div className="text-center">
        <Button
          onClick={() => completeSection('exercises')}
          size="lg"
          className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold px-8 py-3 rounded-full shadow-lg"
        >
          🎓 Terminer le Cours !
        </Button>
      </div>
    </div>
  );
}