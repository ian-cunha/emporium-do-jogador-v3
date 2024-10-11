/* eslint-disable react-hooks/exhaustive-deps */
import { Bar } from '../../components/Bar';
import { FilterFixed, SpanFilter, InputFilter, UlFilter, LiFilter, MagicView, BoxFilter, BoxFilter2, Box, View, FlexBox, TitleBox, SubBox, InfoBox } from '../../components/Globals';
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from '../../config/Firebase';

export const Magic = () => {
  const [dataBase, setDataBase] = useState(null);
  const [magicData, setMagicData] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: 'title', direction: 'asc' });
  const [searchTerm, setSearchTerm] = useState(''); // Estado para armazenar o termo de pesquisa
  let { id } = useParams();

  // Função para buscar os dados do banco de dados
  const getDataBase = async () => {
    try {
      const docRef = doc(firestore, "library", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setDataBase(docSnap.data());
      } else {
        console.log("Sem dados!");
      }
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  // Atualiza o título da página e chama a função de buscar dados quando o componente é montado
  useEffect(() => {
    getDataBase();
    document.title = 'Mágias';
  }, [id]);

  // Função que prepara e exibe as informações detalhadas da mágica
  const getDataMagic = ({
    title, subtitle, time, range, components, duration, description, highLevel, classes
  }) => {
    return (
      <Box>
        <TitleBox>{title}</TitleBox>
        <SubBox>{subtitle}</SubBox>
        <InfoBox><b>Tempo de Conjuração: </b>{time}</InfoBox>
        <InfoBox><b>Alcance: </b>{range}</InfoBox>
        <InfoBox><b>Componentes: </b>{components}</InfoBox>
        <InfoBox><b>Duração: </b>{duration}</InfoBox>
        <InfoBox><b>Descrição: </b>{description}</InfoBox>
        {highLevel && <InfoBox><b>Em Níveis Superiores: </b>{highLevel}</InfoBox>}
        <InfoBox><b>Classes: </b>{classes}</InfoBox>
      </Box>
    );
  };

  // Função para alterar a ordenação
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc'; // Se já estiver ordenado por esse critério, inverte a direção
    }

    setSortConfig({ key, direction });
  };

  // Função para ordenar as mágicas com base no critério e direção
  const sortedData = (data) => {
    if (!data) return [];

    const sortedArray = [...data]; // Faz uma cópia dos dados para evitar mutações diretas

    sortedArray.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

    return sortedArray;
  };

  // Função para filtrar os dados com base no termo de pesquisa
  const filteredData = () => {
    if (!dataBase) return [];

    // Filtrando as mágicas com base no termo de pesquisa
    return Object.entries(dataBase)
      .map(([key, magic]) => magic) // Converte para array de objetos
      .filter(magic => {
        const lowercasedSearchTerm = searchTerm.toLowerCase();
        return (
          magic.title.toLowerCase().includes(lowercasedSearchTerm) ||
          magic.level.toString().toLowerCase().includes(lowercasedSearchTerm) ||
          magic.time.toLowerCase().includes(lowercasedSearchTerm) ||
          magic.school.toLowerCase().includes(lowercasedSearchTerm) ||
          magic.range.toLowerCase().includes(lowercasedSearchTerm) ||
          magic.source.toLowerCase().includes(lowercasedSearchTerm)
        );
      });
  };

  // Renderiza os filtros e a lista de mágicas
  return (
    <View>
      <Bar />
      <MagicView>
        <BoxFilter>
          <FilterFixed>
            <InputFilter 
              placeholder='Pesquisar...' 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // Atualiza o termo de pesquisa
            />
            <UlFilter>
              <LiFilter onClick={() => handleSort('title')}>Nome</LiFilter>
              <LiFilter onClick={() => handleSort('level')}>Nível</LiFilter>
              <LiFilter onClick={() => handleSort('time')}>Tempo</LiFilter>
              <LiFilter onClick={() => handleSort('school')}>Escola</LiFilter>
              <LiFilter onClick={() => handleSort('concentration')}>C.</LiFilter>
              <LiFilter onClick={() => handleSort('range')}>Alcance</LiFilter>
              <LiFilter onClick={() => handleSort('source')}>Fonte</LiFilter>
            </UlFilter>
          </FilterFixed>

          <br /><br /><br /><br />

          {dataBase ? (
            filteredData().length > 0 ? (
              sortedData(filteredData()).map((magic, index) => {
                const {
                  title, subtitle, description, duration, components, highlevel, classes,
                  level, time, school, concentration, range, source
                } = magic;

                return (
                  <LiFilter key={index} onClick={() => setMagicData(getDataMagic({
                    title, subtitle, time, range, components, duration, description, highlevel, classes
                  }))}>
                    <SpanFilter>{title}</SpanFilter>
                    <SpanFilter>{level}</SpanFilter>
                    <SpanFilter>{time}</SpanFilter>
                    <SpanFilter>{school}</SpanFilter>
                    <SpanFilter>{concentration}</SpanFilter>
                    <SpanFilter>{range}</SpanFilter>
                    <SpanFilter>{source}</SpanFilter>
                  </LiFilter>
                );
              })
            ) : (
              <p>Nenhuma mágica encontrada para "{searchTerm}"</p>
            )
          ) : (
            <p>Carregando dados...</p>
          )}
        </BoxFilter>

        <FlexBox>
          <BoxFilter2>
            {magicData}
          </BoxFilter2>
        </FlexBox>
      </MagicView>
    </View>
  );
};
