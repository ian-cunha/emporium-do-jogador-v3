import { Bar } from '../components/Bar'
import { View, Title } from '../components/Globals'
import { signOut } from "firebase/auth"
import { auth } from "../config/Firebase"

export const Dashboard = () => {

  const handleSignOut = () => {
    signOut(auth)
      .then(() => console.log('Sign Out'))
      .catch((error) => console.log(error))
  }
  
  return (
    <View>
      <Bar />
      <Title>Logado</Title>
      <button className="btn-nav no-printme back-profile" onClick={handleSignOut}><i className="bi bi-x-circle"></i> Sair</button>
    </View>
  )
}