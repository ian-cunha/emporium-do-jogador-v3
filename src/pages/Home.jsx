import { Bar } from '../components/Bar'
import { Btn, View, Title, SubTitle, BoxHome } from '../components/Globals'
import { useNavigate } from "react-router-dom";

export const Home = () => {

  const navigate = useNavigate();

  return (
    <View>
      <Bar />
      <Title>Bem-vindo, ao Emporium do Jogador.</Title>
      <SubTitle>Biblioteca de D&D dinâmica com conteúdo em PT-BR</SubTitle>
      <BoxHome>
        <Btn className="bi bi-list-nested" onClick={() => navigate('/referencias')}> Referência rápida</Btn>
        <Btn className='bi bi-github' onClick={() => { window.location = 'https://github.com/ian-cunha/EmporiumDoJogador' }}> Nota de atualização</Btn>
      </BoxHome>
    </View>
  )
}