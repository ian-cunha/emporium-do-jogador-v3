// Importe as bibliotecas necessárias do Firebase e do React
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../../config/Firebase';
import { Bar } from '../../components/Bar';
import { View } from '../../components/Globals';

// Componente funcional Classes
export const Classes = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    // Função para buscar as classes do Firebase Firestore
    const fetchClasses = async () => {
      const classesCollection = await getDocs(collection(firestore, 'classes'));
      const fetchedClasses = classesCollection.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setClasses(fetchedClasses);
    };

    fetchClasses();
  }, []); // O segundo argumento vazio [] garante que o useEffect execute apenas uma vez

  return (
    <View>
      <Bar />
      <h2>Classes</h2>
      <ul>
        {classes.map(classItem => (
          <li key={classItem.id}>
            <strong>{classItem.name}</strong> - {classItem.description}
          </li>
        ))}
      </ul>
    </View>
  );
};
