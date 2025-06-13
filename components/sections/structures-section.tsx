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
  Layers, 
  User, 
  Home, 
  Car, 
  BookOpen, 
  Save,
  Plus,
  Building
} from 'lucide-react';
import { useProgress } from '@/components/progress-provider';
import { useGame } from '@/components/game-provider';
import { gsap } from 'gsap';
import { toast } from 'sonner';

interface PersonStructure {
  nom: string;
  prenom: string;
  age: number;
  taille: number;
  estEtudiant: boolean;
}

interface HouseStructure {
  adresse: string;
  prix: number;
  nombrePieces: number;
  aGarage: boolean;
}

interface CarStructure {
  marque: string;
  modele: string;
  annee: number;
  kilometrage: number;
  prix: number;
  estOccasion: boolean;
}

export function StructuresSection() {
  const { completeSection } = useProgress();
  const { earnBadge, addPoints } = useGame();
  const [activeLevel, setActiveLevel] = useState(1);
  const [createdStructures, setCreatedStructures] = useState<number>(0);
  
  const [person, setPerson] = useState<PersonStructure>({
    nom: '',
    prenom: '',
    age: 0,
    taille: 0,
    estEtudiant: false
  });

  const [house, setHouse] = useState<HouseStructure>({
    adresse: '',
    prix: 0,
    nombrePieces: 0,
    aGarage: false
  });

  const [car, setCar] = useState<CarStructure>({
    marque: '',
    modele: '',
    annee: 0,
    kilometrage: 0,
    prix: 0,
    estOccasion: false
  });

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

  const handleSaveStructure = (type: 'person' | 'house' | 'car') => {
    const newCount = createdStructures + 1;
    setCreatedStructures(newCount);
    addPoints(25);
    
    toast.success(`Structure ${type} sauvegardée ! +25 points`);
    
    if (newCount === 1) {
      earnBadge('architect');
      toast.success('🏆 Badge "Architecte de Données" débloqué !');
    }
    
    if (newCount >= 3) {
      completeSection('structures');
    }
  };

  const resetStructure = (type: 'person' | 'house' | 'car') => {
    switch (type) {
      case 'person':
        setPerson({ nom: '', prenom: '', age: 0, taille: 0, estEtudiant: false });
        break;
      case 'house':
        setHouse({ adresse: '', prix: 0, nombrePieces: 0, aGarage: false });
        break;
      case 'car':
        setCar({ marque: '', modele: '', annee: 0, kilometrage: 0, prix: 0, estOccasion: false });
        break;
    }
  };

  return (
    <div ref={animationRef} className="space-y-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
          🏗️ Les Structures de Données Composées
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Apprenez à créer des structures complexes en combinant différents types de données
        </p>
      </motion.div>

      <Card className="bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 border-2 border-purple-200 dark:border-purple-700">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Layers className="w-6 h-6 text-purple-600" />
            <span>🥪 Analogie du Sandwich</span>
          </CardTitle>
          <CardDescription>
            Une structure composée est comme un sandwich avec plusieurs ingrédients
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                <h4 className="font-semibold mb-3">Structure Sandwich :</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-3 p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded">
                    <span className="text-yellow-600">🍞</span>
                    <span><strong>pain</strong> : chaîne</span>
                  </div>
                  <div className="flex items-center space-x-3 p-2 bg-red-50 dark:bg-red-900/20 rounded">
                    <span className="text-red-600">🥓</span>
                    <span><strong>jambon</strong> : chaîne</span>
                  </div>
                  <div className="flex items-center space-x-3 p-2 bg-orange-50 dark:bg-orange-900/20 rounded">
                    <span className="text-orange-600">🧀</span>
                    <span><strong>fromage</strong> : chaîne</span>
                  </div>
                  <div className="flex items-center space-x-3 p-2 bg-green-50 dark:bg-green-900/20 rounded">
                    <span className="text-green-600">💰</span>
                    <span><strong>prix</strong> : réel</span>
                  </div>
                  <div className="flex items-center space-x-3 p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
                    <span className="text-blue-600">✅</span>
                    <span><strong>disponible</strong> : booléen</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <motion.div
                animate={{ 
                  rotateY: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="text-8xl mb-4"
              >
                🥪
              </motion.div>
              <p className="text-lg font-semibold">
                Tous ces éléments forment UN sandwich complet !
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-indigo-50 to-blue-100 dark:from-indigo-900/20 dark:to-blue-900/20 border-2 border-indigo-200 dark:border-indigo-700">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Building className="w-6 h-6 text-indigo-600" />
            <span>🎮 L'Architecte de Données</span>
          </CardTitle>
          <CardDescription>
            Créez vos propres structures de données ! Progression : {createdStructures}/3 structures
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeLevel.toString()} onValueChange={(value) => setActiveLevel(parseInt(value))}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="1" className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>Niveau 1</span>
              </TabsTrigger>
              <TabsTrigger value="2" className="flex items-center space-x-2">
                <Home className="w-4 h-4" />
                <span>Niveau 2</span>
              </TabsTrigger>
              <TabsTrigger value="3" className="flex items-center space-x-2">
                <Car className="w-4 h-4" />
                <span>Niveau 3</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="1" className="space-y-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 flex items-center space-x-2">
                  <User className="w-5 h-5 text-blue-600" />
                  <span>👤 Structure Personne</span>
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="nom">Nom (chaîne)</Label>
                      <Input
                        id="nom"
                        value={person.nom}
                        onChange={(e) => setPerson({...person, nom: e.target.value})}
                        placeholder="Dupont"
                      />
                    </div>
                    <div>
                      <Label htmlFor="prenom">Prénom (chaîne)</Label>
                      <Input
                        id="prenom"
                        value={person.prenom}
                        onChange={(e) => setPerson({...person, prenom: e.target.value})}
                        placeholder="Jean"
                      />
                    </div>
                    <div>
                      <Label htmlFor="age">Âge (entier)</Label>
                      <Input
                        id="age"
                        type="number"
                        value={person.age || ''}
                        onChange={(e) => setPerson({...person, age: parseInt(e.target.value) || 0})}
                        placeholder="20"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="taille">Taille (réel)</Label>
                      <Input
                        id="taille"
                        type="number"
                        step="0.01"
                        value={person.taille || ''}
                        onChange={(e) => setPerson({...person, taille: parseFloat(e.target.value) || 0})}
                        placeholder="1.75"
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="estEtudiant"
                        checked={person.estEtudiant}
                        onChange={(e) => setPerson({...person, estEtudiant: e.target.checked})}
                        className="w-4 h-4"
                      />
                      <Label htmlFor="estEtudiant">Est étudiant (booléen)</Label>
                    </div>
                    
                    <div className="pt-4">
                      <Badge variant="outline" className="mb-2">Aperçu de la structure :</Badge>
                      <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded font-mono text-sm">
                        <div>etudiant1.nom ← "{person.nom}"</div>
                        <div>etudiant1.prenom ← "{person.prenom}"</div>
                        <div>etudiant1.age ← {person.age}</div>
                        <div>etudiant1.taille ← {person.taille}</div>
                        <div>etudiant1.estEtudiant ← {person.estEtudiant ? 'vrai' : 'faux'}</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-4 mt-6">
                  <Button onClick={() => handleSaveStructure('person')} className="flex items-center space-x-2">
                    <Save className="w-4 h-4" />
                    <span>Sauvegarder Structure</span>
                  </Button>
                  <Button onClick={() => resetStructure('person')} variant="outline">
                    Réinitialiser
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="2" className="space-y-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 flex items-center space-x-2">
                  <Home className="w-5 h-5 text-green-600" />
                  <span>🏠 Structure Maison</span>
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="adresse">Adresse (chaîne)</Label>
                      <Input
                        id="adresse"
                        value={house.adresse}
                        onChange={(e) => setHouse({...house, adresse: e.target.value})}
                        placeholder="123 Rue de la Paix"
                      />
                    </div>
                    <div>
                      <Label htmlFor="prix-maison">Prix (réel)</Label>
                      <Input
                        id="prix-maison"
                        type="number"
                        value={house.prix || ''}
                        onChange={(e) => setHouse({...house, prix: parseFloat(e.target.value) || 0})}
                        placeholder="250000"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="pieces">Nombre de pièces (entier)</Label>
                      <Input
                        id="pieces"
                        type="number"
                        value={house.nombrePieces || ''}
                        onChange={(e) => setHouse({...house, nombrePieces: parseInt(e.target.value) || 0})}
                        placeholder="4"
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="garage"
                        checked={house.aGarage}
                        onChange={(e) => setHouse({...house, aGarage: e.target.checked})}
                        className="w-4 h-4"
                      />
                      <Label htmlFor="garage">A un garage (booléen)</Label>
                    </div>
                    
                    <div className="pt-4">
                      <Badge variant="outline" className="mb-2">Aperçu de la structure :</Badge>
                      <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded font-mono text-sm">
                        <div>maison1.adresse ← "{house.adresse}"</div>
                        <div>maison1.prix ← {house.prix}</div>
                        <div>maison1.nombrePieces ← {house.nombrePieces}</div>
                        <div>maison1.aGarage ← {house.aGarage ? 'vrai' : 'faux'}</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-4 mt-6">
                  <Button onClick={() => handleSaveStructure('house')} className="flex items-center space-x-2">
                    <Save className="w-4 h-4" />
                    <span>Sauvegarder Structure</span>
                  </Button>
                  <Button onClick={() => resetStructure('house')} variant="outline">
                    Réinitialiser
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="3" className="space-y-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 flex items-center space-x-2">
                  <Car className="w-5 h-5 text-purple-600" />
                  <span>🚗 Structure Voiture</span>
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="marque">Marque (chaîne)</Label>
                      <Input
                        id="marque"
                        value={car.marque}
                        onChange={(e) => setCar({...car, marque: e.target.value})}
                        placeholder="Toyota"
                      />
                    </div>
                    <div>
                      <Label htmlFor="modele">Modèle (chaîne)</Label>
                      <Input
                        id="modele"
                        value={car.modele}
                        onChange={(e) => setCar({...car, modele: e.target.value})}
                        placeholder="Corolla"
                      />
                    </div>
                    <div>
                      <Label htmlFor="annee">Année (entier)</Label>
                      <Input
                        id="annee"
                        type="number"
                        value={car.annee || ''}
                        onChange={(e) => setCar({...car, annee: parseInt(e.target.value) || 0})}
                        placeholder="2020"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="kilometrage">Kilométrage (entier)</Label>
                      <Input
                        id="kilometrage"
                        type="number"
                        value={car.kilometrage || ''}
                        onChange={(e) => setCar({...car, kilometrage: parseInt(e.target.value) || 0})}
                        placeholder="50000"
                      />
                    </div>
                    <div>
                      <Label htmlFor="prix-voiture">Prix (réel)</Label>
                      <Input
                        id="prix-voiture"
                        type="number"
                        value={car.prix || ''}
                        onChange={(e) => setCar({...car, prix: parseFloat(e.target.value) || 0})}
                        placeholder="15000"
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="occasion"
                        checked={car.estOccasion}
                        onChange={(e) => setCar({...car, estOccasion: e.target.checked})}
                        className="w-4 h-4"
                      />
                      <Label htmlFor="occasion">Est d'occasion (booléen)</Label>
                    </div>
                    
                    <div className="pt-4">
                      <Badge variant="outline" className="mb-2">Aperçu de la structure :</Badge>
                      <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded font-mono text-sm">
                        <div>voiture1.marque ← "{car.marque}"</div>
                        <div>voiture1.modele ← "{car.modele}"</div>
                        <div>voiture1.annee ← {car.annee}</div>
                        <div>voiture1.kilometrage ← {car.kilometrage}</div>
                        <div>voiture1.prix ← {car.prix}</div>
                        <div>voiture1.estOccasion ← {car.estOccasion ? 'vrai' : 'faux'}</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-4 mt-6">
                  <Button onClick={() => handleSaveStructure('car')} className="flex items-center space-x-2">
                    <Save className="w-4 h-4" />
                    <span>Sauvegarder Structure</span>
                  </Button>
                  <Button onClick={() => resetStructure('car')} variant="outline">
                    Réinitialiser
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="text-center">
        <Badge variant="outline" className="text-lg p-2">
          🏆 Structures créées : {createdStructures}/3
        </Badge>
      </div>
    </div>
  );
}