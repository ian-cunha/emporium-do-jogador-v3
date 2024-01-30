/* eslint-disable react-hooks/exhaustive-deps */
import { Bar } from '../../components/Bar'
import { SpanFilter, InputFilter, UlFilter, LiFilter, MagicView, BoxFilter, BoxFilter2, Box, View, FlexBox, TitleBox, SubBox, InfoBox } from '../../components/Globals'
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
    document.title = 'Mágias';
  }, [])

  const [magicData, setMagicData] = useState('')

  const getDataMagic = async (
    Title,
    SubTitle,
    Time,
    Range,
    Components,
    Duration,
    Description,
    HighLevel,
    Classes
  ) => (
    setMagicData(
      <Box>
        <TitleBox>{Title}</TitleBox>
        <SubBox>{SubTitle}</SubBox>
        <InfoBox><b>Tempo de Conjuração: </b>{Time}</InfoBox>
        <InfoBox><b>Alcance: </b>{Range}</InfoBox>
        <InfoBox><b>Componentes: </b>{Components}</InfoBox>
        <InfoBox><b>Duração: </b>{Duration}</InfoBox>
        <InfoBox><b>Descrição: </b>{Description}</InfoBox>
        {HighLevel != null &&
          <InfoBox><b>Em Níveis Superiores: {HighLevel}</b></InfoBox>
        }
        <InfoBox><b>Classes: </b>{Classes}</InfoBox>
      </Box>
    )
  )

  return (
    <View>
      <Bar />
      <MagicView>
        <BoxFilter>
          <InputFilter placeholder='Filtro' />
          <UlFilter>
            <LiFilter>Nome</LiFilter>
            <LiFilter>Nível</LiFilter>
            <LiFilter>Tempo</LiFilter>
            <LiFilter>Escola</LiFilter>
            <LiFilter>C.</LiFilter>
            <LiFilter>Alcance</LiFilter>
            <LiFilter>Fonte</LiFilter>
          </UlFilter>
          {Object.entries(dataBase).map((magic) => {

            let Title = magic[1].title
            let SubTitle = magic[1].subtitle
            let Description = magic[1].description
            let Duration = magic[1].duration
            let Components = magic[1].components
            let HighLevel = magic[1].highlevel
            let Classes = magic[1].classes
            let Level = magic[1].level
            let Time = magic[1].time
            let School = magic[1].school
            let Concentration = magic[1].concentration
            let Range = magic[1].range
            let Source = magic[1].source

            return <>
              <LiFilter onClick={
                () => (
                  getDataMagic(
                    Title,
                    SubTitle,
                    Time,
                    Range,
                    Components,
                    Duration,
                    Description,
                    HighLevel,
                    Classes
                  )
                )
              }>
                <SpanFilter>{Title}</SpanFilter>
                <SpanFilter>{Level}</SpanFilter>
                <SpanFilter>{Time}</SpanFilter>
                <SpanFilter>{School}</SpanFilter>
                <SpanFilter>{Concentration}</SpanFilter>
                <SpanFilter>{Range}</SpanFilter>
                <SpanFilter>{Source}</SpanFilter>
              </LiFilter>
            </>
          })}
        </BoxFilter>
        <FlexBox>
          <BoxFilter2>
            {magicData}
          </BoxFilter2>
        </FlexBox>
      </MagicView>
    </View>
  )
}