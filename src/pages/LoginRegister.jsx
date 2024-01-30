/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import { useState } from 'react';
import { BtnSubmit, ViewAcess, TitleAcess, SubTitleAcess, FormBase, BlockAcess, InputEvent, ChangeLegend, Legend } from '../components/Globals'
import { Navigate } from 'react-router-dom'
import { auth } from "../config/Firebase"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth"

export const LoginRegister = ({ user }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isSignUpActive, setIsSignUpActive] = useState(false)
  const handleMethodChange = () => {
    setIsSignUpActive(!isSignUpActive)
  }
  const [message, setMessage] = useState(true);

  const handleSignUp = (e) => {
    if (!email || !password || password === confirmPassword) {
      e.preventDefault()
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user)
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage)
          setMessage(
            <div>Erro</div>
          )
          setTimeout(function () {
            setMessage(false)
          }, 2000)
        });
    } else {
      setMessage(
        <div>Erro</div>
      )
      setTimeout(function () {
        setMessage(false)
      }, 2000)
    }
  }

  const handleSignIn = (e) => {
    if (!email || !password) return
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
        setMessage(
          <div>Erro</div>
        )
        setTimeout(function () {
          setMessage(false)
        }, 2000)
      });
  }

  const handleEmailChange = (event) => setEmail(event.target.value)
  const handlePasswordChange = (event) => setPassword(event.target.value)
  const handleConfirmPasswordChange = (event) => setConfirmPassword(event.target.value)

  if (user) {
    return <Navigate to='/plataforma'></Navigate>
  }

  return (
    <ViewAcess>
      {message}
      <BlockAcess>
        {isSignUpActive && <TitleAcess>Bem-vindo a nossa plataforma!</TitleAcess>}
        {!isSignUpActive && <TitleAcess>Bem-vindo de volta, jogador!</TitleAcess>}
        <SubTitleAcess>Versão 0.0.1</SubTitleAcess>
      </BlockAcess>
      <BlockAcess>
        <FormBase>
          {isSignUpActive && <Legend>Faça seu cadastro</Legend>}
          {!isSignUpActive && <Legend>Fazer login</Legend>}
          <InputEvent type='email' placeholder='E-mail' onChange={handleEmailChange} />
          <InputEvent type='password' placeholder='Senha' onChange={handlePasswordChange} />
          {isSignUpActive && <InputEvent type='password' placeholder='Repetir senha' onChange={handleConfirmPasswordChange} />}

          {isSignUpActive && <BtnSubmit type="submit" onClick={handleSignUp}>Cadastre-se</BtnSubmit>}
          {!isSignUpActive && <BtnSubmit type="submit" onClick={handleSignIn}>Entrar</BtnSubmit>}

          {isSignUpActive && <ChangeLegend onClick={handleMethodChange}>Já possui uma conta? <b>Faça login</b></ChangeLegend>}
          {!isSignUpActive && <ChangeLegend onClick={handleMethodChange}>Não possui uma conta? <b>Registre-se agora!</b></ChangeLegend>}
        </FormBase>
      </BlockAcess>
    </ViewAcess>
  )
}