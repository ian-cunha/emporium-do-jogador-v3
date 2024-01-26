import { Bar } from '../components/Bar'
import { Btn, View } from '../components/Globals'

export const Home = () => {
  return (
    <View>
      <Bar />
      <h2>Bem-vindo</h2>
      <p>Biblioteca de D&D dinâmica com conteúdo em PT-BR</p>
      <div>
        <Btn>Referência rápida</Btn>
        <Btn>Changelog</Btn>
      </div>
    </View>
  )
}