import { Bar } from '../components/Bar'
import { Btn, View, Title, BioTop, BoxHome } from '../components/Globals'
import { useNavigate } from "react-router-dom";

export const Home = () => {

  const navigate = useNavigate();

  return (
    <View>
      <Bar />
      <Title>Bem-vindo, ao Emporium do Jogador.</Title>
      <BioTop>Embarque em suas aventuras de Dungeons & Dragons com o Emporium do Jogador e descubra um mundo de raças, classes e magias. Seja o mestre do seu destino e deixe que o Emporium do Jogador ilumine seu caminho através dos reinos mágicos e perigosos de D&D. Que as rolagens de dados estejam sempre a seu favor!</BioTop>
      <BoxHome>
        <Btn className="bi bi-list-nested" onClick={() => navigate('/referencias')}> Referência rápida</Btn>
        <Btn className='bi bi-github' onClick={() => { window.location = 'https://github.com/ian-cunha/EmporiumDoJogador' }}> Nota de atualização</Btn>
      </BoxHome>
    </View>
  )
}