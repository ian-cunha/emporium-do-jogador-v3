/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "./Firebase"

export const DataBaseConfig = () => {

  const colecao = 'magias';
  const documento = 'truques';

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
  
}