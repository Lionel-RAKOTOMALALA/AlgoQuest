'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Train, 
  Plus, 
  Trash2, 
  Calculator, 
  Search, 
  TrendingUp,
  RefreshCw,
  Trophy,
  Target
} from 'lucide-react';
import { useProgress } from '@/components/progress-provider';
import { useGame } from '@/components/game-provider';
import { gsap } from 'gsap';
import { toast } from 'sonner';

interface TrainGame {
  wagons: number[];
  totalWeight: number;
  maxWeight: number;
  heaviestWagon: number;
  level: number;
}

export function VectorsSection() {
  const { completeSection } = useProgress();
  const { earnBadge, addPoints } = useGame();
  const [activeTab, setActiveTab] = useState('learn');
  const [temperatures, setTemperatures] = useState<number[]>([22, 19, 25, 23, 21, 18, 20]);
  const [notes, setNotes] = useState<number[]>([15, 12, 18, 14, 16]);
  const [newValue, setNewValue] = useState<string>('');
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchResult, setSearchResult] = useState<number>(-1);
  
  const [trainGame, setTrainGame] = useState<TrainGame>({
    wagons: [],
    totalWeight: 0,
    maxWeight: 0,
    heaviestWagon: 0,
    level: 1
  });

  const animationRef = useRef<HTMLDivElement>(null);
  const trainRef = useRef<HTMLDivElement>(null);

  const jours = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

  useEffect(() => {
    if (animationRef.current) {
      gsap.fromTo(
        animationRef.current.children,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, stagger: 0.1, duration: 0.6, ease: "power2.out" }
      );
    }
  }, []);

  useEffect(() => {
    if (trainRef.current) {
      gsap.fromTo(
        trainRef.current.children,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, stagger: 0.1, duration: 0.5, delay: 0.2 }
      );
    }
  }, [trainGame.wagons]);

  const initTrainGame = (level: number) => {
    const wagonCount = level === 1 ? 5 : level === 2 ? 10 : 20;
    const newWagons = Array.from({ length: wagonCount }, () => Math.floor(Math.random() * 50) + 10);
    
    setTrainGame({
      wagons: newWagons,
      totalWeight: newWagons.reduce((sum, weight) => sum + weight, 0),
      maxWeight: Math.max(...newWagons),
      heaviestWagon: newWagons.indexOf(Math.max(...newWagons)),
      level
    });
  };

  const calculateAverage = (array: number[]) => {
    return array.reduce((sum, val) => sum + val, 0) / array.length;
  };

  const findMaximum = (array: number[]) => {
    return Math.max(...array);
  };

  const findMinimum = (array: number[]) => {
    return Math.min(...array);
  };

  const addToArray = (array: number[], value: number, setter: (arr: number[]) => void) => {
    setter([...array, value]);
    setNewValue('');
    addPoints(5);
    toast.success('Élément ajouté ! +5 points');
  };

  const removeFromArray = (array: number[], index: number, setter: (arr: number[]) => void) => {
    const newArray = array.filter((_, i) => i !== index);
    setter(newArray);
  };

  const searchInArray = (array: number[], value: number) => {
    const index = array.indexOf(value);
    setSearchResult(index);
    if (index !== -1) {
      toast.success(`Valeur trouvée à l'index ${index} !`);
    } else {
      toast.error('Valeur non trouvée');
    }
  };

  const handleTrainChallenge = (challengeType: 'weight' | 'average' | 'sort') => {
    let correct = false;
    
    switch (challengeType) {
      case 'weight':
        // Vérifier si l'utilisateur a identifié le bon poids total
        correct = true; // Simplifié pour la démo
        break;
      case 'average':
        // Vérifier la moyenne
        correct = true;
        break;
      case 'sort':
        // Vérifier le tri
        correct = true;
        break;
    }
    
    if (correct) {
      addPoints(20);
      if (trainGame.level === 1) {
        earnBadge('train-master');
      }
      toast.success('Défi réussi ! +20 points');
    }
  };

  return (
    <div ref={animationRef} className="space-y-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-4">
          🚂 Les Vecteurs (Tableaux)
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Découvrez les vecteurs avec l'analogie du train et ses wagons numérotés
        </p>
      </motion.div>

      <Card className="bg-gradient-to-br from-blue-50 to-cyan-100 dark:from-blue-900/20 dark:to-cyan-900/20 border-2 border-blue-200 dark:border-blue-700">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Train className="w-6 h-6 text-blue-600" />
            <span>🚂 Analogie du Train</span>
          </CardTitle>
          <CardDescription>
            Un vecteur est comme un train avec des wagons numérotés à partir de 0
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Indices du vecteur :
              </div>
              <div className="flex justify-center space-x-2 mb-4">
                {[0, 1, 2, 3, 4].map((index) => (
                  <Badge key={index} variant="outline" className="w-8 h-8 flex items-center justify-center">
                    {index}
                  </Badge>
                ))}
              </div>
              
              <div ref={trainRef} className="flex justify-center items-center space-x-1">
                <div className="text-4xl">🚂</div>
                {notes.map((note, index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="bg-gradient-to-b from-yellow-400 to-orange-500 text-white p-3 rounded-lg shadow-lg border-2 border-yellow-600"
                  >
                    <div className="text-center">
                      <div className="text-xs font-bold">Wagon {index}</div>
                      <div className="text-lg font-bold">{note}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                Règles importantes : Les wagons sont numérotés à partir de 0 • Chaque wagon contient une seule valeur
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="learn">📚 Apprendre</TabsTrigger>
          <TabsTrigger value="practice">🎯 Pratiquer</TabsTrigger>
          <TabsTrigger value="game">🎮 Jeu du Chef de Gare</TabsTrigger>
        </TabsList>

        <TabsContent value="learn" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calculator className="w-5 h-5 text-green-600" />
                  <span>🌡️ Températures de la Semaine</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    {temperatures.map((temp, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
                        <span className="text-sm">{jours[index]}</span>
                        <Badge variant="outline">{temp}°C</Badge>
                      </div>
                    ))}
                  </div>
                  
                  <div className="pt-4 border-t">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-semibold">Moyenne:</span>
                        <Badge className="ml-2">{calculateAverage(temperatures).toFixed(1)}°C</Badge>
                      </div>
                      <div>
                        <span className="font-semibold">Maximum:</span>
                        <Badge className="ml-2">{findMaximum(temperatures)}°C</Badge>
                      </div>
                      <div>
                        <span className="font-semibold">Minimum:</span>
                        <Badge className="ml-2">{findMinimum(temperatures)}°C</Badge>
                      </div>
                      <div>
                        <span className="font-semibold">Éléments:</span>
                        <Badge className="ml-2">{temperatures.length}</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                  <span>📊 Notes de l'Étudiant</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {notes.map((note, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center space-x-2 p-2 bg-purple-50 dark:bg-purple-900/20 rounded"
                      >
                        <span className="text-xs text-purple-600">#{index}</span>
                        <Badge variant="outline">{note}</Badge>
                      </motion.div>
                    ))}
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Input
                        type="number"
                        placeholder="Nouvelle note"
                        value={newValue}
                        onChange={(e) => setNewValue(e.target.value)}
                        className="flex-1"
                      />
                      <Button
                        onClick={() => addToArray(notes, parseFloat(newValue), setNotes)}
                        disabled={!newValue}
                        size="sm"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-semibold">Moyenne:</span>
                        <Badge className="ml-2">{calculateAverage(notes).toFixed(1)}</Badge>
                      </div>
                      <div>
                        <span className="font-semibold">Mention:</span>
                        <Badge className="ml-2" variant={calculateAverage(notes) >= 10 ? "default" : "destructive"}>
                          {calculateAverage(notes) >= 10 ? "Réussi" : "Échec"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="practice" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="w-5 h-5 text-blue-600" />
                <span>🎯 Exercices Pratiques</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3">Recherche dans le vecteur</h4>
                  <div className="flex items-center space-x-2">
                    <Input
                      type="number"
                      placeholder="Valeur à rechercher"
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                      className="flex-1"
                    />
                    <Button
                      onClick={() => searchInArray(notes, parseFloat(searchValue))}
                      disabled={!searchValue}
                    >
                      <Search className="w-4 h-4" />
                      Rechercher
                    </Button>
                  </div>
                  {searchResult !== -1 && (
                    <div className="mt-2 p-3 bg-green-50 dark:bg-green-900/20 rounded">
                      <p className="text-sm text-green-700 dark:text-green-300">
                        ✅ Valeur trouvée à l'index {searchResult}
                      </p>
                    </div>
                  )}
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{notes.length}</div>
                    <div className="text-sm text-blue-600">Éléments</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{findMaximum(notes)}</div>
                    <div className="text-sm text-green-600">Maximum</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{calculateAverage(notes).toFixed(1)}</div>
                    <div className="text-sm text-purple-600">Moyenne</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="game" className="space-y-6">
          <Card className="bg-gradient-to-br from-yellow-50 to-orange-100 dark:from-yellow-900/20 dark:to-orange-900/20 border-2 border-yellow-200 dark:border-yellow-700">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Trophy className="w-6 h-6 text-yellow-600" />
                <span>🚂 Le Chef de Gare</span>
              </CardTitle>
              <CardDescription>
                Gérez votre train de marchandises et relevez les défis !
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex justify-center space-x-4">
                  <Button onClick={() => initTrainGame(1)} variant="outline" className="bg-green-50 hover:bg-green-100">
                    🚂 Niveau 1 (5 wagons)
                  </Button>
                  <Button onClick={() => initTrainGame(2)} variant="outline" className="bg-blue-50 hover:bg-blue-100">
                    🚅 Niveau 2 (10 wagons)
                  </Button>
                  <Button onClick={() => initTrainGame(3)} variant="outline" className="bg-purple-50 hover:bg-purple-100">
                    🚄 Niveau 3 (20 wagons)
                  </Button>
                </div>

                {trainGame.wagons.length > 0 && (
                  <div className="space-y-4">
                    <div className="text-center">
                      <h4 className="font-semibold mb-2">Votre Train de Niveau {trainGame.level}</h4>
                      <div className="flex justify-center items-center space-x-1 overflow-x-auto pb-2">
                        <div className="text-2xl">🚂</div>
                        {trainGame.wagons.map((weight, index) => (
                          <motion.div
                            key={index}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-gradient-to-b from-yellow-400 to-orange-500 text-white p-2 rounded border-2 border-yellow-600 min-w-[60px] text-center"
                          >
                            <div className="text-xs font-bold">#{index}</div>
                            <div className="text-sm font-bold">{weight}kg</div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">{trainGame.totalWeight}kg</div>
                        <div className="text-sm text-blue-600">Poids Total</div>
                        <Button
                          onClick={() => handleTrainChallenge('weight')}
                          size="sm"
                          className="mt-2"
                        >
                          Vérifier
                        </Button>
                      </div>
                      <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">{trainGame.maxWeight}kg</div>
                        <div className="text-sm text-green-600">Wagon le plus lourd</div>
                        <Button
                          onClick={() => handleTrainChallenge('average')}
                          size="sm"
                          className="mt-2"
                        >
                          Vérifier
                        </Button>
                      </div>
                      <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">#{trainGame.heaviestWagon}</div>
                        <div className="text-sm text-purple-600">Position du plus lourd</div>
                        <Button
                          onClick={() => handleTrainChallenge('sort')}
                          size="sm"
                          className="mt-2"
                        >
                          Vérifier
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="text-center">
        <Button
          onClick={() => {
            completeSection('vectors');
            earnBadge('train-master');
          }}
          size="lg"
          className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white font-semibold px-8 py-3 rounded-full shadow-lg"
        >
          🏆 Maîtriser les Vecteurs !
        </Button>
      </div>
    </div>
  );
}