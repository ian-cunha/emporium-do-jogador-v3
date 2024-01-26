/* eslint-disable react/jsx-key */
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../config/Firebase"
import { Bar } from '../components/Bar'
import { View, ItemName, ItemQuick, BlockRefs, RefTitle } from '../components/Globals'

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
            <ItemQuick>{arr[1].refs.join(" | ")}</ItemQuick>
          </>
        })}
      </BlockRefs>
    </View>
  )
}