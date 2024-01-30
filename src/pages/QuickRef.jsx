/* eslint-disable react/jsx-key */
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../config/Firebase"
import { Bar } from '../components/Bar'
import { FlexRefs, View, ItemName, ItemQuick, BlockRefs, RefTitle } from '../components/Globals'

export const QuickRef = () => {

  const colecao = 'tools';
  const documento = 'quickRef';

  const [dataBase, setDataBase] = useState('')

  const getDataBase = async () => {
    const docRef = doc(firestore, colecao, documento)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      setDataBase(docSnap.data())
    } else {
      console.log("Sem dados!")
    }
  }

  useEffect(() => {
    getDataBase()
  }, [])

  return (
    <View>
      <Bar />
      <BlockRefs>
        <RefTitle>Referência Rápida</RefTitle>
        {Object.entries(dataBase).map((arr) => {
          return <>
            <ItemName>{arr[1].name}</ItemName>
            <FlexRefs>
              {arr[1].ref1 != null && <ItemQuick className="bi bi-chevron-double-right">{arr[1].ref1}</ItemQuick>}
              {arr[1].ref2 != null && <ItemQuick className="bi bi-chevron-double-right">{arr[1].ref2}</ItemQuick>}
              {arr[1].ref3 != null && <ItemQuick className="bi bi-chevron-double-right">{arr[1].ref3}</ItemQuick>}
              {arr[1].ref4 != null && <ItemQuick className="bi bi-chevron-double-right">{arr[1].ref4}</ItemQuick>}
              {arr[1].ref5 != null && <ItemQuick className="bi bi-chevron-double-right">{arr[1].ref5}</ItemQuick>}
              {arr[1].ref6 != null && <ItemQuick className="bi bi-chevron-double-right">{arr[1].ref6}</ItemQuick>}
              {arr[1].ref7 != null && <ItemQuick className="bi bi-chevron-double-right">{arr[1].ref7}</ItemQuick>}
              {arr[1].ref8 != null && <ItemQuick className="bi bi-chevron-double-right">{arr[1].ref8}</ItemQuick>}
              {arr[1].ref9 != null && <ItemQuick className="bi bi-chevron-double-right">{arr[1].ref9}</ItemQuick>}
              {arr[1].ref10 != null && <ItemQuick className="bi bi-chevron-double-right">{arr[1].ref10}</ItemQuick>}
              {arr[1].ref11 != null && <ItemQuick className="bi bi-chevron-double-right">{arr[1].ref11}</ItemQuick>}
              {arr[1].ref12 != null && <ItemQuick className="bi bi-chevron-double-right">{arr[1].ref12}</ItemQuick>}
              {arr[1].ref13 != null && <ItemQuick className="bi bi-chevron-double-right">{arr[1].ref13}</ItemQuick>}
              {arr[1].ref14 != null && <ItemQuick className="bi bi-chevron-double-right">{arr[1].ref14}</ItemQuick>}
            </FlexRefs>
          </>
        })}
      </BlockRefs>
    </View>
  )
}