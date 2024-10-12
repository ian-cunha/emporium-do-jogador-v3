import { useState, useEffect } from 'react';
import { ViewPlatform, Title, SubTitle } from '../../components/Globals';
import { InsideBar } from '../components/InsideBar';
import styled from 'styled-components';
import { auth } from '../../config/Firebase';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';

const db = getFirestore();

export const Dashboard = () => {
  const [playerStats, setPlayerStats] = useState(null); // Inicializando com null
  const [playerPosition, setPlayerPosition] = useState({ x: 5, y: 5 });
  const [missionStarted, setMissionStarted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Para controlar o modal
  const currentUser = auth.currentUser;

  // Função para buscar dados do personagem principal
  const fetchMainCharacter = async () => {
    if (currentUser) {
      try {
        const q = query(
          collection(db, 'users', currentUser.email, 'characters'),
          where('isMain', '==', true)
        );
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const mainCharacter = querySnapshot.docs[0].data(); // Supondo que só tenha um personagem principal
          setPlayerStats(mainCharacter); // Atualiza os stats com o personagem principal
        } else {
          setPlayerStats(null); // Caso não haja personagem principal
        }
      } catch (error) {
        console.error('Erro ao buscar personagem principal:', error);
      }
    }
  };

  useEffect(() => {
    fetchMainCharacter();
  }, [currentUser]); // Executa apenas quando o usuário estiver autenticado

  const startMission = () => {
    setMissionStarted(true);
    setIsModalOpen(true); // Abre o modal quando a missão começa
  };

  const movePlayer = (direction) => {
    setPlayerPosition((prevPosition) => {
      let newX = prevPosition.x;
      let newY = prevPosition.y;

      if (direction === 'up' && newY > 0) newY -= 1;
      if (direction === 'down' && newY < 9) newY += 1;
      if (direction === 'left' && newX > 0) newX -= 1;
      if (direction === 'right' && newX < 9) newX += 1;

      return { x: newX, y: newY };
    });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setMissionStarted(false); // A missão não está mais iniciada quando fecha o modal
  };

  // Se não há personagem principal, exibe uma mensagem de "sem dados"
  if (playerStats === null) {
    return (
      <ViewPlatform>
        <InsideBar />
        <Container>
          <Title>Sem Personagem Principal</Title>
          <SubTitle>Por favor, crie ou selecione um personagem principal para continuar.</SubTitle>
        </Container>
      </ViewPlatform>
    );
  }

  return (
    <ViewPlatform>
      <InsideBar />
      <Container>
        <Title>Saudações, {playerStats.name}.</Title>
        <SubTitle>{playerStats.class} - Nível {playerStats.level}</SubTitle>

        {/* Caixa de Estatísticas */}
        <StatsBox>
          <Card>
            <h3>Pontos de Vida</h3>
            <p>{playerStats.hitPoints}</p>
          </Card>
          <Card>
            <h3>Experiência</h3>
            <p>{playerStats.experience} XP</p>
          </Card>
          <Card>
            <h3>Missões Completas</h3>
            <p>{playerStats.completedQuests || 0}</p>
          </Card>
        </StatsBox>

        {/* Atributos */}
        <AttributesBox>
          <h4>Atributos</h4>
          <AttributeCard>
            <h5>Força</h5>
            <p>{playerStats.strength}</p>
          </AttributeCard>
          <AttributeCard>
            <h5>Destreza</h5>
            <p>{playerStats.dexterity}</p>
          </AttributeCard>
          <AttributeCard>
            <h5>Inteligência</h5>
            <p>{playerStats.intelligence}</p>
          </AttributeCard>
          <AttributeCard>
            <h5>Carisma</h5>
            <p>{playerStats.charisma}</p>
          </AttributeCard>
        </AttributesBox>

        {/* Botão Iniciar Missão */}
        {!missionStarted && !isModalOpen && (
          <Button primary onClick={startMission}>Iniciar Missão</Button>
        )}

        {/* Modal de Mapa */}
        {isModalOpen && (
          <ModalOverlay>
            <ModalContent>
              <CloseButton onClick={closeModal}>X</CloseButton>
              <MapContainer>
                <Map>
                  {Array.from({ length: 10 }).map((_, y) =>
                    Array.from({ length: 10 }).map((_, x) => (
                      <MapCell
                        key={`${x}-${y}`}
                        isPlayer={x === playerPosition.x && y === playerPosition.y}
                      />
                    ))
                  )}
                </Map>
              </MapContainer>

              <MovementButtons>
                <Button primary onClick={() => movePlayer('up')}>Subir</Button>
                <Button primary onClick={() => movePlayer('down')}>Descer</Button>
                <Button primary onClick={() => movePlayer('left')}>Esquerda</Button>
                <Button primary onClick={() => movePlayer('right')}>Direita</Button>
              </MovementButtons>
            </ModalContent>
          </ModalOverlay>
        )}
      </Container>
    </ViewPlatform>
  );
};

// Estilos customizados
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

const StatsBox = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  width: 100%;
  max-width: 900px;
`;

const Card = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 30%;
  text-align: center;
  color: #333;

  h3 {
    font-size: 18px;
    margin-bottom: 10px;
  }

  p {
    font-size: 24px;
    font-weight: bold;
    color: #3a8dff;
  }
`;

const AttributesBox = styled.div`
  background-color: #f4f7fc;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  color: #333;
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;

  h4 {
    font-size: 20px;
    margin-bottom: 20px;
    width: 100%;
    text-align: center;
  }
`;

const AttributeCard = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 22%;
  text-align: center;
  color: #333;

  h5 {
    font-size: 16px;
    margin-bottom: 10px;
  }

  p {
    font-size: 18px;
    font-weight: bold;
    color: #e67e22;
  }
`;

const Button = styled.button`
  padding: 12px 20px;
  font-size: 16px;
  background-color: black; /* Cor de fundo do botão */
  color: white; /* Cor do texto */
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #333; /* Cor de fundo ao passar o mouse */
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* Coloca o modal acima de outros conteúdos */
`;

const ModalContent = styled.div`
  background-color: #fff;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  width: 500px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #e67e22;
  color: white;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  font-size: 20px;
  cursor: pointer;
  
  &:hover {
    background-color: #d45d00;
  }
`;

const MapContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Map = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 30px);
  grid-template-rows: repeat(10, 30px);
  gap: 5px;
`;

const MapCell = styled.div`
  width: 30px;
  height: 30px;
  background-color: ${({ isPlayer }) => (isPlayer ? '#e67e22' : '#f0f0f0')};
  border-radius: 4px;
  border: 1px solid #ddd;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MovementButtons = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;
