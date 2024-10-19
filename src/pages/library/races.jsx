// Importe as bibliotecas necessárias do Firebase e do React
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../../config/Firebase';
import { Bar } from '../../components/Bar';
import { View } from '../../components/Globals';

// Componente funcional Races
export const Races = () => {
  const [races, setRaces] = useState([]);

  useEffect(() => {
    // Função para buscar as raças do Firebase Firestore
    const fetchRaces = async () => {
      const racesCollection = await getDocs(collection(firestore, 'races'));
      const fetchedRaces = racesCollection.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setRaces(fetchedRaces);
    };

    fetchRaces();
  }, []); // O segundo argumento vazio [] garante que o useEffect execute apenas uma vez

  return (
    <View>
      <Bar />
      <h2>Raças</h2>
      <ul>
        {races.map(race => (
          <li key={race.id}>
            <strong>{race.name}</strong> - {race.description}
          </li>
        ))}
      </ul>
    </View>
  );
};
