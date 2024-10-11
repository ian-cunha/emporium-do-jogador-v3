/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import { useState } from 'react';
import { BtnSubmit, ViewAcess, TitleAcess, SubTitleAcess, FormBase, BlockAcess, InputEvent, ChangeLegend, Legend } from '../components/Globals';
import { Navigate } from 'react-router-dom';
import { auth } from "../config/Firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const db = getFirestore(); // Inicializando o Firestore

export const LoginRegister = ({ user }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSignUpActive, setIsSignUpActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleMethodChange = () => {
    setIsSignUpActive(!isSignUpActive);
    setErrorMessage(''); // Limpar mensagem de erro quando mudar o método
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    
    if (!email || !password || password !== confirmPassword) {
      setErrorMessage('As senhas não coincidem ou o e-mail está vazio!');
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        console.log('Usuário cadastrado:', user);
        
        // Criar um documento na coleção 'users' com o e-mail do usuário
        await setDoc(doc(db, 'users', user.email), {
          email: user.email,
          createdAt: new Date(),
          profile: {
            name: '', // Deixe o nome vazio ou pegue de outro campo, se necessário
            avatar: '', // Deixe o avatar vazio ou com o valor padrão
          },
        });

        // Aqui você pode redirecionar ou fazer o que for necessário após o cadastro
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage('Erro ao criar conta. Tente novamente.');
        console.log(errorCode, errorMessage);
      });
  };

  const handleSignIn = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage('Preencha o e-mail e a senha');
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        console.log('Usuário logado:', user);

        // Verificar se o documento já existe no Firestore
        const userRef = doc(db, 'users', user.email);
        const docSnap = await userRef.get();
        
        if (!docSnap.exists()) {
          // Se o documento não existir, cria um novo documento
          await setDoc(userRef, {
            email: user.email,
            createdAt: new Date(),
            profile: {
              name: '', // Deixe o nome vazio ou pegue de outro campo, se necessário
              avatar: '', // Deixe o avatar vazio ou com o valor padrão
            },
          });
        }

        // Redirecionar o usuário para a plataforma
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage('Erro ao fazer login. Verifique suas credenciais.');
        console.log(errorCode, errorMessage);
      });
  };

  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const handleConfirmPasswordChange = (event) => setConfirmPassword(event.target.value);

  // Se o usuário estiver autenticado, redireciona para a plataforma
  if (user) {
    return <Navigate to='/plataforma' />;
  }

  return (
    <ViewAcess>
      {errorMessage && <div style={{ color: 'red', marginBottom: '10px' }}>{errorMessage}</div>}
      <BlockAcess>
        {isSignUpActive && <TitleAcess>Bem-vindo a nossa plataforma!</TitleAcess>}
        {!isSignUpActive && <TitleAcess>Bem-vindo de volta, jogador!</TitleAcess>}
        <SubTitleAcess>Alpha - Versão 0.0.1 (Preview)</SubTitleAcess>
      </BlockAcess>
      <BlockAcess>
        <FormBase>
          {isSignUpActive && <Legend>Faça seu cadastro</Legend>}
          {!isSignUpActive && <Legend>Fazer login</Legend>}
          <InputEvent 
            type='email' 
            placeholder='E-mail' 
            onChange={handleEmailChange} 
            value={email} 
          />
          <InputEvent 
            type='password' 
            placeholder='Senha' 
            onChange={handlePasswordChange} 
            value={password} 
          />
          {isSignUpActive && (
            <InputEvent 
              type='password' 
              placeholder='Repetir senha' 
              onChange={handleConfirmPasswordChange} 
              value={confirmPassword} 
            />
          )}

          {isSignUpActive && (
            <BtnSubmit type="submit" onClick={handleSignUp}>Cadastre-se</BtnSubmit>
          )}
          {!isSignUpActive && (
            <BtnSubmit type="submit" onClick={handleSignIn}>Entrar</BtnSubmit>
          )}

          {isSignUpActive && (
            <ChangeLegend onClick={handleMethodChange}>
              Já possui uma conta? <b>Faça login</b>
            </ChangeLegend>
          )}
          {!isSignUpActive && (
            <ChangeLegend onClick={handleMethodChange}>
              Não possui uma conta? <b>Registre-se agora!</b>
            </ChangeLegend>
          )}
        </FormBase>
      </BlockAcess>
    </ViewAcess>
  );
};
