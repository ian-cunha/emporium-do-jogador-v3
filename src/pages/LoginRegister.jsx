import { BtnBar, ViewAcess, FormBase, BlockAcess, InputEvent, ChangeLegend, Legend } from '../components/Globals'
import { useNavigate } from "react-router-dom";

export const LoginRegister = () => {
  const navigate = useNavigate();

  return (
    <ViewAcess>
      <BlockAcess>
        <BtnBar onClick={() => navigate('/')}>Voltar</BtnBar>
        <h1>EDJ</h1>
        <h2>Bem-vindo de volta!</h2>
        <h2>Bem-vindo a nossa plataforma!</h2>
        <p>Aqui você tem.......</p>
      </BlockAcess>
      <BlockAcess>
        <FormBase>
          <Legend>Faça seu cadastro</Legend>
          <Legend>Fazer login</Legend>
          <InputEvent type='text' placeholder='Nome de  Usuário' />
          <InputEvent type='email' placeholder='E-mail' />
          <InputEvent type='password' placeholder='Senha' />
          <InputEvent type='password' placeholder='Repetir senha' />
          <BtnBar>Entrar</BtnBar>
          <BtnBar>Cadastre-se</BtnBar>
          <ChangeLegend>Já possui uma conta? <b>Faça login</b></ChangeLegend>
          <ChangeLegend>Não possui uma conta? <b>Registre-se agora!</b></ChangeLegend>
        </FormBase>
      </BlockAcess>
    </ViewAcess>
  )
}