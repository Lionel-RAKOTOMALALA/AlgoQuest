'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { 
  Settings, 
  Coffee, 
  Calculator, 
  Type, 
  ToggleLeft, 
  Play,
  Cog,
  Factory,
  Trophy
} from 'lucide-react';
import { useProgress } from '@/components/progress-provider';
import { useGame } from '@/components/game-provider';
import { gsap } from 'gsap';
import { toast } from 'sonner';

interface FunctionResult {
  name: string;
  input: string;
  output: string;
  type: string;
}

export function FunctionsSection() {
  const { completeSection } = useProgress();
  const { earnBadge, addPoints } = useGame();
  const [activeTab, setActiveTab] = useState('learn');
  const [functionResults, setFunctionResults] = useState<FunctionResult[]>([]);
  const [createdFunctions, setCreatedFunctions] = useState<number>(0);
  
  // Function inputs
  const [addInputs, setAddInputs] = useState({ a: '', b: '' });
  const [areaInputs, setAreaInputs] = useState({ length: '', width: '' });
  const [greetInputs, setGreetInputs] = useState({ name: '', title: '' });
  const [ageInputs, setAgeInputs] = useState({ birthYear: '' });
  const [imcInputs, setImcInputs] = useState({ weight: '', height: '' });

  const animationRef = useRef<HTMLDivElement>(null);
  const machineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (animationRef.current) {
      gsap.fromTo(
        animationRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: "power2.out" }
      );
    }
  }, []);

  useEffect(() => {
    if (machineRef.current) {
      gsap.fromTo(
        machineRef.current,
        { rotateY: -90, opacity: 0 },
        { rotateY: 0, opacity: 1, duration: 1, ease: "power2.out" }
      );
    }
  }, []);

  const executeFunction = (functionName: string, inputs: any, outputType: string) => {
    let result: any;
    let inputStr = '';
    
    switch (functionName) {
      case 'additionner':
        const a = parseFloat(inputs.a);
        const b = parseFloat(inputs.b);
        result = a + b;
        inputStr = `${a}, ${b}`;
        break;
      case 'aireRectangle':
        const length = parseFloat(inputs.length);
        const width = parseFloat(inputs.width);
        result = length * width;
        inputStr = `${length}, ${width}`;
        break;
      case 'saluer':
        result = `Bonjour ${inputs.title} ${inputs.name} !`;
        inputStr = `"${inputs.name}", "${inputs.title}"`;
        break;
      case 'calculerAge':
        const currentYear = 2024;
        const birthYear = parseInt(inputs.birthYear);
        result = currentYear - birthYear;
        inputStr = `${birthYear}`;
        break;
      case 'calculerIMC':
        const weight = parseFloat(inputs.weight);
        const height = parseFloat(inputs.height);
        result = (weight / (height * height)).toFixed(2);
        inputStr = `${weight}, ${height}`;
        break;
      default:
        result = 'Erreur';
    }

    const newResult: FunctionResult = {
      name: functionName,
      input: inputStr,
      output: result.toString(),
      type: outputType
    };

    setFunctionResults([...functionResults, newResult]);
    setCreatedFunctions(createdFunctions + 1);
    addPoints(15);
    toast.success(`Fonction ${functionName} exécutée ! +15 points`);

    if (createdFunctions + 1 >= 5) {
      earnBadge('function-engineer');
      completeSection('functions');
    }
  };

  const clearResults = () => {
    setFunctionResults([]);
  };

  return (
    <div ref={animationRef} className="space-y-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
          ⚙️ Les Fonctions
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Découvrez les fonctions comme des machines spécialisées qui transforment des entrées en sorties
        </p>
      </motion.div>

      <Card className="bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 border-2 border-purple-200 dark:border-purple-700">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="w-6 h-6 text-purple-600" />
            <span>⚙️ Analogie de la Machine</span>
          </CardTitle>
          <CardDescription>
            Une fonction est comme une machine spécialisée qui transforme des entrées en sorties
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-8 items-center">
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-6 rounded-lg">
                <div className="text-3xl mb-2">📥</div>
                <h4 className="font-semibold text-blue-800 dark:text-blue-200">ENTRÉES</h4>
                <p className="text-sm text-blue-600 dark:text-blue-400">Paramètres</p>
                <div className="mt-2 space-y-1">
                  <Badge variant="outline" className="text-xs">Café</Badge>
                  <Badge variant="outline" className="text-xs">Eau</Badge>
                  <Badge variant="outline" className="text-xs">Sucre</Badge>
                </div>
              </div>
            </div>

            <div ref={machineRef} className="text-center">
              <div className="bg-gradient-to-br from-purple-200 to-pink-200 dark:from-purple-800 dark:to-pink-800 p-6 rounded-lg shadow-lg">
                <div className="text-4xl mb-2">🏭</div>
                <h4 className="font-semibold text-purple-800 dark:text-purple-200">MACHINE</h4>
                <p className="text-sm text-purple-600 dark:text-purple-400">Traitement</p>
                <div className="mt-2">
                  <Coffee className="w-8 h-8 mx-auto text-brown-600" />
                </div>
              </div>
            </div>

            <div className="text-center">
              <div className="bg-green-100 dark:bg-green-900/30 p-6 rounded-lg">
                <div className="text-3xl mb-2">📤</div>
                <h4 className="font-semibold text-green-800 dark:text-green-200">SORTIE</h4>
                <p className="text-sm text-green-600 dark:text-green-400">Résultat</p>
                <div className="mt-2">
                  <Badge className="bg-green-600">☕ Café Prêt</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="learn">📚 Apprendre</TabsTrigger>
          <TabsTrigger value="practice">🎯 Pratiquer</TabsTrigger>
          <TabsTrigger value="factory">🏭 Usine à Fonctions</TabsTrigger>
        </TabsList>

        <TabsContent value="learn" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calculator className="w-5 h-5 text-blue-600" />
                  <span>🔢 Fonction Addition</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg font-mono text-sm">
                    <div className="text-blue-600 font-bold">fonction additionner(a: entier, b: entier) : entier</div>
                    <div className="text-gray-600 dark:text-gray-400">début</div>
                    <div className="ml-4">resultat ← a + b</div>
                    <div className="ml-4">retourner resultat</div>
                    <div className="text-gray-600 dark:text-gray-400">fin</div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="add-a">Nombre A</Label>
                      <Input
                        id="add-a"
                        type="number"
                        value={addInputs.a}
                        onChange={(e) => setAddInputs({...addInputs, a: e.target.value})}
                        placeholder="15"
                      />
                    </div>
                    <div>
                      <Label htmlFor="add-b">Nombre B</Label>
                      <Input
                        id="add-b"
                        type="number"
                        value={addInputs.b}
                        onChange={(e) => setAddInputs({...addInputs, b: e.target.value})}
                        placeholder="25"
                      />
                    </div>
                  </div>
                  
                  <Button
                    onClick={() => executeFunction('additionner', addInputs, 'entier')}
                    disabled={!addInputs.a || !addInputs.b}
                    className="w-full"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Exécuter
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Cog className="w-5 h-5 text-green-600" />
                  <span>📐 Fonction Aire Rectangle</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg font-mono text-sm">
                    <div className="text-green-600 font-bold">fonction aireRectangle(longueur: réel, largeur: réel) : réel</div>
                    <div className="text-gray-600 dark:text-gray-400">début</div>
                    <div className="ml-4">aire ← longueur * largeur</div>
                    <div className="ml-4">retourner aire</div>
                    <div className="text-gray-600 dark:text-gray-400">fin</div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="area-length">Longueur</Label>
                      <Input
                        id="area-length"
                        type="number"
                        step="0.01"
                        value={areaInputs.length}
                        onChange={(e) => setAreaInputs({...areaInputs, length: e.target.value})}
                        placeholder="5.5"
                      />
                    </div>
                    <div>
                      <Label htmlFor="area-width">Largeur</Label>
                      <Input
                        id="area-width"
                        type="number"
                        step="0.01"
                        value={areaInputs.width}
                        onChange={(e) => setAreaInputs({...areaInputs, width: e.target.value})}
                        placeholder="3.2"
                      />
                    </div>
                  </div>
                  
                  <Button
                    onClick={() => executeFunction('aireRectangle', areaInputs, 'réel')}
                    disabled={!areaInputs.length || !areaInputs.width}
                    className="w-full"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Calculer
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Type className="w-5 h-5 text-purple-600" />
                  <span>👋 Fonction Salutation</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg font-mono text-sm">
                    <div className="text-purple-600 font-bold">fonction saluer(nom: chaîne, titre: chaîne) : chaîne</div>
                    <div className="text-gray-600 dark:text-gray-400">début</div>
                    <div className="ml-4">message ← "Bonjour " + titre + " " + nom + " !"</div>
                    <div className="ml-4">retourner message</div>
                    <div className="text-gray-600 dark:text-gray-400">fin</div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="greet-name">Nom</Label>
                      <Input
                        id="greet-name"
                        value={greetInputs.name}
                        onChange={(e) => setGreetInputs({...greetInputs, name: e.target.value})}
                        placeholder="Martin"
                      />
                    </div>
                    <div>
                      <Label htmlFor="greet-title">Titre</Label>
                      <Input
                        id="greet-title"
                        value={greetInputs.title}
                        onChange={(e) => setGreetInputs({...greetInputs, title: e.target.value})}
                        placeholder="Monsieur"
                      />
                    </div>
                  </div>
                  
                  <Button
                    onClick={() => executeFunction('saluer', greetInputs, 'chaîne')}
                    disabled={!greetInputs.name || !greetInputs.title}
                    className="w-full"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Saluer
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <ToggleLeft className="w-5 h-5 text-orange-600" />
                  <span>🎂 Fonction Calcul d'Âge</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg font-mono text-sm">
                    <div className="text-orange-600 font-bold">fonction calculerAge(anneeNaissance: entier) : entier</div>
                    <div className="text-gray-600 dark:text-gray-400">début</div>
                    <div className="ml-4">age ← 2024 - anneeNaissance</div>
                    <div className="ml-4">retourner age</div>
                    <div className="text-gray-600 dark:text-gray-400">fin</div>
                  </div>
                  
                  <div>
                    <Label htmlFor="age-birth">Année de naissance</Label>
                    <Input
                      id="age-birth"
                      type="number"
                      value={ageInputs.birthYear}
                      onChange={(e) => setAgeInputs({...ageInputs, birthYear: e.target.value})}
                      placeholder="2003"
                    />
                  </div>
                  
                  <Button
                    onClick={() => executeFunction('calculerAge', ageInputs, 'entier')}
                    disabled={!ageInputs.birthYear}
                    className="w-full"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Calculer l'âge
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="practice" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calculator className="w-5 h-5 text-blue-600" />
                <span>🏥 Fonction IMC Avancée</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg font-mono text-sm">
                  <div className="text-blue-600 font-bold">fonction calculerIMC(poids: réel, taille: réel) : réel</div>
                  <div className="text-gray-600 dark:text-gray-400">début</div>
                  <div className="ml-4">imc ← poids / (taille * taille)</div>
                  <div className="ml-4">retourner imc</div>
                  <div className="text-gray-600 dark:text-gray-400">fin</div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="imc-weight">Poids (kg)</Label>
                    <Input
                      id="imc-weight"
                      type="number"
                      step="0.1"
                      value={imcInputs.weight}
                      onChange={(e) => setImcInputs({...imcInputs, weight: e.target.value})}
                      placeholder="70"
                    />
                  </div>
                  <div>
                    <Label htmlFor="imc-height">Taille (m)</Label>
                    <Input
                      id="imc-height"
                      type="number"
                      step="0.01"
                      value={imcInputs.height}
                      onChange={(e) => setImcInputs({...imcInputs, height: e.target.value})}
                      placeholder="1.75"
                    />
                  </div>
                </div>
                
                <Button
                  onClick={() => executeFunction('calculerIMC', imcInputs, 'réel')}
                  disabled={!imcInputs.weight || !imcInputs.height}
                  className="w-full"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Calculer IMC
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="factory" className="space-y-6">
          <Card className="bg-gradient-to-br from-yellow-50 to-orange-100 dark:from-yellow-900/20 dark:to-orange-900/20 border-2 border-yellow-200 dark:border-yellow-700">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Factory className="w-6 h-6 text-yellow-600" />
                <span>🏭 L'Usine à Fonctions</span>
              </CardTitle>
              <CardDescription>
                Félicitations ! Vous avez créé {createdFunctions} fonctions. Objectif : 5 fonctions pour devenir Maître Ingénieur !
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600 mb-2">
                    {createdFunctions} / 5 Fonctions Créées
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-yellow-400 to-orange-500 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${(createdFunctions / 5) * 100}%` }}
                    />
                  </div>
                </div>

                {functionResults.length > 0 && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">Historique des Exécutions</h4>
                      <Button onClick={clearResults} variant="outline" size="sm">
                        Effacer
                      </Button>
                    </div>
                    
                    <div className="grid gap-3 max-h-96 overflow-y-auto">
                      {functionResults.map((result, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="bg-white dark:bg-gray-800 p-4 rounded-lg border"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="font-mono font-bold text-blue-600">
                                {result.name}({result.input})
                              </span>
                              <span className="text-gray-500 mx-2">→</span>
                              <span className="font-mono text-green-600">
                                {result.output}
                              </span>
                            </div>
                            <Badge variant="outline">{result.type}</Badge>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {createdFunctions >= 5 && (
                  <div className="text-center p-6 bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg">
                    <Trophy className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-green-700 dark:text-green-300 mb-2">
                      🎉 Félicitations !
                    </h3>
                    <p className="text-green-600 dark:text-green-400">
                      Vous êtes maintenant un Maître Ingénieur des Fonctions !
                    </p>
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
            completeSection('functions');
            earnBadge('function-engineer');
          }}
          size="lg"
          className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold px-8 py-3 rounded-full shadow-lg"
        >
          ⚙️ Maîtriser les Fonctions !
        </Button>
      </div>
    </div>
  );
}