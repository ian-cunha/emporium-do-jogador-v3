import { ViewPlatform, Title, SubTitle } from '../../components/Globals'
import { InsideBar } from '../components/InsideBar'

export const Dashboard = () => {


  return (
    <ViewPlatform>
      <InsideBar />
      <Title>Olá, jogador.</Title>
      <SubTitle>Alpha - Versão 0.0.1 (Preview)</SubTitle>
    </ViewPlatform>
  )
}