import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../../config/Firebase";
import { FlexRefs, View, ItemName, ItemQuick, BlockRefs, RefTitle } from '../../components/Globals';
import { InsideBar } from "../components/InsideBar";

export const QuickRefInside = () => {
  const colecao = 'tools';
  const documento = 'quickRef';

  const [dataBase, setDataBase] = useState([]);

  const getDataBase = async () => {
    const docRef = doc(firestore, colecao, documento);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      // Ordenar os dados por algum critério consistente, por exemplo, pelo nome ou algum identificador
      const sortedData = Object.entries(data).sort((a, b) => a[1].name.localeCompare(b[1].name));
      setDataBase(sortedData);
    } else {
      console.log("Sem dados!");
    }
  };

  useEffect(() => {
    getDataBase();
  }, []);

  return (
    <View>
      <InsideBar />
      <BlockRefs>
        <RefTitle>Referência Rápida</RefTitle>
        {dataBase.map(([key, item], index) => (
          <div key={key}> {/* Usando o 'key' como chave única */}
            <ItemName>{item.name}</ItemName>
            <FlexRefs>
              {[...Array(14)].map((_, i) => {
                const refKey = `ref${i + 1}`;
                return item[refKey] ? (
                  <ItemQuick key={refKey} className="bi bi-chevron-double-right">
                    {item[refKey]}
                  </ItemQuick>
                ) : null;
              })}
            </FlexRefs>
          </div>
        ))}
      </BlockRefs>
    </View>
  );
};
