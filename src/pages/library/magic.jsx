/* eslint-disable react-hooks/exhaustive-deps */
import { Bar } from '../../components/Bar'
import { Box, View, FlexBox, TitleBox, SubBox, InfoBox } from '../../components/Globals'
import { useParams } from "react-router-dom"

import { useState, useEffect } from "react"
import { doc, getDoc } from "firebase/firestore";
import { firestore } from '../../config/Firebase';

export const Magic = () => {

  const [dataBase, setDataBase] = useState('')
  let { id } = useParams()

  const getDataBase = async () => {
    const docRef = doc(firestore, "library", id)
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
      <FlexBox>
        {Object.entries(dataBase).map((arr) => {
          return <>
            <Box>
              <TitleBox>{arr[1].title}</TitleBox>
              <SubBox>{arr[1].subtitle}</SubBox>
              <InfoBox><b>Tempo de Conjuração:</b> {arr[1].time}</InfoBox>
              <InfoBox><b>Alcance:</b> {arr[1].range}</InfoBox>
              <InfoBox><b>Componentes:</b> {arr[1].components}</InfoBox>
              <InfoBox><b>Duração:</b> {arr[1].duration}</InfoBox>
              <InfoBox><b>Classes:</b> {arr[1].classes}</InfoBox>
            </Box>
          </>
        })}
      </FlexBox>
    </View>
  )
}