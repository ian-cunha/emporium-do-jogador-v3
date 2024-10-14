import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../../config/Firebase';
import { doc, getDoc } from 'firebase/firestore';
import styled from 'styled-components';

const SessionHub = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [session, setSession] = useState(null);

    useEffect(() => {
        const fetchSession = async () => {
            const docRef = doc(db, "sessions", id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setSession(docSnap.data());
            } else {
                console.log("No such document!");
                navigate("/");
            }
        };
        fetchSession();
    }, [id, navigate]);

    // Função para voltar à página de sessões
    const backToSessions = () => {
        navigate("/sessao");
    };

    if (!session) return <div>Carregando...</div>;

    return (
        <SessionHubContainer>
            <h1>{session.name}</h1>
            <div>ID da Sessão: {id}</div>
            <Button onClick={backToSessions}>Voltar</Button>
        </SessionHubContainer>
    );
};

const SessionHubContainer = styled.div`
  padding: 20px;
  text-align: center;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: black;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: gray;
  }
`;

export default SessionHub;