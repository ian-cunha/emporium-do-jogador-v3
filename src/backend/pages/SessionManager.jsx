import React, { useState, useEffect } from 'react';
import { auth } from '../../config/Firebase';
import { getFirestore, collection, addDoc, getDocs, query, where, deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import styled from 'styled-components';
import { InsideBar } from '../components/InsideBar';

const db = getFirestore();

export const SessionManager = () => {
  const [sessionName, setSessionName] = useState('');
  const [sessions, setSessions] = useState([]);
  const [currentUser, setCurrentUser] = useState(auth.currentUser);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      if (user) {
        fetchSessions();
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchSessions = async () => {
    try {
      const q = query(collection(db, "sessions"));
      const querySnapshot = await getDocs(q);
      const allSessions = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setSessions(allSessions);
    } catch (error) {
      console.error("Error fetching sessions: ", error);
    }
  };

  const createSession = async () => {
    if (sessionName && currentUser) {
      try {
        const docRef = await addDoc(collection(db, "sessions"), {
          name: sessionName,
          creatorId: currentUser.uid,
          players: [currentUser.uid],
          createdAt: new Date()
        });
        console.log("Session created with ID: ", docRef.id);
        fetchSessions();
        setSessionName('');
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    }
  };

  const joinSession = async (sessionId) => {
    if (currentUser) {
      try {
        const sessionRef = doc(db, "sessions", sessionId);
        const sessionDoc = await getDoc(sessionRef);
        if (sessionDoc.exists()) {
          const sessionData = sessionDoc.data();
          const currentUserSessions = sessions.filter(session => session.players.includes(currentUser.uid));

          if (currentUserSessions.length > 0 && currentUserSessions[0].id !== sessionId) {
            // User is in another session, remove them from that session
            const previousSessionRef = doc(db, "sessions", currentUserSessions[0].id);
            const previousSessionDoc = await getDoc(previousSessionRef);
            if (previousSessionDoc.exists()) {
              const previousSessionData = previousSessionDoc.data();
              if (previousSessionData.creatorId === currentUser.uid) {
                // If the user was the creator of the session, delete it
                await deleteDoc(previousSessionRef);
              } else {
                await updateDoc(previousSessionRef, {
                  players: previousSessionData.players.filter(playerId => playerId !== currentUser.uid)
                });
              }
              console.log("User removed from previous session.");
            }
          }

          if (sessionData.players.includes(currentUser.uid)) {
            console.log("User is already in this session.");
            return;
          }

          await updateDoc(sessionRef, {
            players: [...sessionData.players, currentUser.uid]
          });
          console.log("User joined the session successfully.");
          fetchSessions();
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error joining session: ", error);
      }
    }
  };

  const leaveSession = async (sessionId) => {
    if (currentUser) {
      try {
        const sessionRef = doc(db, "sessions", sessionId);
        const sessionDoc = await getDoc(sessionRef);
        if (sessionDoc.exists()) {
          const sessionData = sessionDoc.data();
          
          if (sessionData.creatorId === currentUser.uid) {
            // If the current user is the session creator, delete the session
            await deleteDoc(sessionRef);
            console.log("Session deleted as the creator left.");
          } else {
            // Remove the user from the session but don't delete the session
            await updateDoc(sessionRef, {
              players: sessionData.players.filter(playerId => playerId !== currentUser.uid)
            });
            console.log("User left the session.");
          }
          
          fetchSessions();
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error leaving session: ", error);
      }
    }
  };

  const isUserInSession = (sessionId) => {
    return currentUser && sessions.some(session => session.id === sessionId && session.players.includes(currentUser.uid));
  };

  return (
    <SessionContainer>
      <InsideBar />
      <ContentWrapper>
        <HeaderContainer>
          <h2>Gerenciar Sessões</h2>
        </HeaderContainer>
        <InputContainer>
          <SessionInput 
            type="text" 
            value={sessionName} 
            onChange={(e) => setSessionName(e.target.value)} 
            placeholder="Nome da sessão" 
          />
          <Button onClick={createSession}>Criar Sessão</Button>
        </InputContainer>
        
        <h3>Sessões Disponíveis</h3>
        <SessionList>
          {sessions.map(session => (
            <SessionItem key={session.id}>
              <SessionName>{session.name}</SessionName>
              <ButtonContainer>
                <JoinButton 
                  onClick={() => joinSession(session.id)} 
                  disabled={isUserInSession(session.id)}>
                  {isUserInSession(session.id) ? 'Logado' : 'Entrar'}
                </JoinButton>
                {session.creatorId === currentUser?.uid ? (
                  <CloseButton onClick={() => leaveSession(session.id)}>Sair (Apagar Sessão)</CloseButton>
                ) : (
                  isUserInSession(session.id) && (
                    <LeaveButton onClick={() => leaveSession(session.id)}>Sair</LeaveButton>
                  )
                )}
              </ButtonContainer>
            </SessionItem>
          ))}
        </SessionList>
      </ContentWrapper>
    </SessionContainer>
  );
};

// Estilos customizados
const SessionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  width: 100%;
  margin: 0 auto;
`;

const HeaderContainer = styled.div`
  margin-top: 50px;
  text-align: center;
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 600px;
  margin-top: 20px;
`;

const InputContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  justify-content: center;
`;

const SessionInput = styled.input`
  padding: 10px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: black;
  color: white;
  border: dashed;
  border-color: white;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: gray;
  }
`;

const JoinButton = styled(Button)`
  background-color: black;
  &:hover {
    background-color: gray;
  }
`;

const CloseButton = styled(Button)`
  background-color: black;
  &:hover {
    background-color: gray;
  }
`;

const LeaveButton = styled(Button)`
  background-color: black;
  &:hover {
    background-color: gray;
  }
`;

const SessionList = styled.ul`
  list-style: none;
  padding: 0;
  width: 100%;
`;

const SessionItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin-bottom: 10px;
  background-color: #f8f9fa;
  border-radius: 4px;
`;

const SessionName = styled.span`
  font-weight: bold;
  color: black;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

export default SessionManager;