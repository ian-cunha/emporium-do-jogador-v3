import { BtnBar, View } from '../components/Globals'
import { useNavigate } from "react-router-dom";

export const LoginRegister = () => {
  const navigate = useNavigate();

  return (
    <View>
      <BtnBar onClick={() => navigate('/')}>Voltar</BtnBar>
      <h1>EDJ</h1>
      <h2>Bem-vindo de volta!</h2>
      <form>
        <input type='text' placeholder='Nome de  Usuário' />
        <input type='email' placeholder='E-mail' />
        <input type='password' placeholder='Senha' />
        <input type='password' placeholder='Repetir senha' />
        <BtnBar>Entrar</BtnBar>
        <BtnBar>Cadastre-se</BtnBar>
      </form>
    </View>
  )
}