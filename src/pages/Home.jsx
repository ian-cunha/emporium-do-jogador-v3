import { Bar } from '../components/Bar'
import { Btn, View, Title, SubTitle, BoxHome } from '../components/Globals'

export const Home = () => {
  return (
    <View>
      <Bar />
      <Title>Bem-vindo, ao Emporium do Jogador.</Title>
      <SubTitle>Biblioteca de D&D dinâmica com conteúdo em PT-BR</SubTitle>
      <BoxHome>
        <Btn>Referência rápida</Btn>
        <Btn>Changelog</Btn>
      </BoxHome>
    </View>
  )
}