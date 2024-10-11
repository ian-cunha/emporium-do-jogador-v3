import { useEffect, useState } from 'react';
import { auth } from "../../config/Firebase";
import { getFirestore, collection, getDocs, query, where, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import styled from 'styled-components';
import { Navigate } from 'react-router-dom';
import { InsideBar } from '../components/InsideBar';

const db = getFirestore();

export const CharactersPage = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCharacter, setSelectedCharacter] = useState(null); // Para editar os dados do personagem
  const [formData, setFormData] = useState({
    name: '',
    class: '',
    level: 1,
    strength: 10,
    dexterity: 10,
    constitution: 10,
    intelligence: 10,
    wisdom: 10,
    charisma: 10,
    background: '',
    equipment: '',
    specialAbilities: '',
  });

  // Carregar os personagens do usuário
  useEffect(() => {
    const fetchCharacters = async () => {
      const currentUser = auth.currentUser;

      if (!currentUser) {
        return <Navigate to="/login" />;
      }

      try {
        const charactersRef = collection(db, 'users', currentUser.email, 'characters');
        const q = query(charactersRef, where("userId", "==", currentUser.uid));
        const querySnapshot = await getDocs(q);

        const charactersData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setCharacters(charactersData);
      } catch (err) {
        console.error("Erro ao buscar personagens:", err);
        setError('Não foi possível carregar os personagens.');
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  // Função para excluir um personagem
  const handleDelete = async (id) => {
    const currentUser = auth.currentUser;
    try {
      await deleteDoc(doc(db, 'users', currentUser.email, 'characters', id));
      setCharacters(characters.filter(character => character.id !== id));
    } catch (err) {
      console.error("Erro ao excluir personagem:", err);
    }
  };

  // Função para atualizar um personagem
  const handleUpdate = async (id, updatedData) => {
    const currentUser = auth.currentUser;
    try {
      const characterRef = doc(db, 'users', currentUser.email, 'characters', id);
      await updateDoc(characterRef, updatedData);
      setCharacters(prevState =>
        prevState.map(character =>
          character.id === id ? { ...character, ...updatedData } : character
        )
      );
      setSelectedCharacter(null);  // Fechar formulário de edição
    } catch (err) {
      console.error("Erro ao atualizar personagem:", err);
    }
  };

  // Função para compartilhar (copiar para a área de transferência)
  const handleShare = (character) => {
    const characterInfo = `
      Nome: ${character.name}
      Classe: ${character.class}
      Nível: ${character.level}
      Força: ${character.strength}
      Destreza: ${character.dexterity}
      Constituição: ${character.constitution}
      Inteligência: ${character.intelligence}
      Sabedoria: ${character.wisdom}
      Carisma: ${character.charisma}
      Antecedente: ${character.background}
      Equipamento: ${character.equipment}
      Habilidades Especiais: ${character.specialAbilities}
    `;
    navigator.clipboard.writeText(characterInfo).then(() => {
      alert("Informações do personagem copiadas para a área de transferência!");
    });
  };

  // Função para preencher o formulário quando um personagem for editado
  const handleEditCharacter = (character) => {
    setSelectedCharacter(character);
    setFormData({
      name: character.name,
      class: character.class,
      level: character.level,
      strength: character.strength,
      dexterity: character.dexterity,
      constitution: character.constitution,
      intelligence: character.intelligence,
      wisdom: character.wisdom,
      charisma: character.charisma,
      background: character.background,
      equipment: character.equipment,
      specialAbilities: character.specialAbilities,
    });
  };

  // Função para lidar com as alterações no formulário de edição
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  if (loading) {
    return <LoadingMessage>Carregando personagens...</LoadingMessage>;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  return (
    <Container>
      <InsideBar />
      <Title>Seus Personagens</Title>
      {characters.length === 0 ? (
        <Message>Nenhum personagem criado ainda. Crie um novo personagem!</Message>
      ) : (
        <CharacterList>
          {characters.map((character) => (
            <CharacterCard key={character.id}>
              <CharacterName>{character.name}</CharacterName>
              <CharacterClass>Classe: {character.class}</CharacterClass>
              <CharacterLevel>Nível: {character.level}</CharacterLevel>
              
              {/* Exibindo todos os atributos e outras informações do personagem */}
              <CharacterAttributes>
                <strong>Atributos:</strong>
                <div>Força: {character.strength}</div>
                <div>Destreza: {character.dexterity}</div>
                <div>Constituição: {character.constitution}</div>
                <div>Inteligência: {character.intelligence}</div>
                <div>Sabedoria: {character.wisdom}</div>
                <div>Carisma: {character.charisma}</div>
                <strong>Informações Adicionais:</strong>
                <div>Antecedente: {character.background}</div>
                <div>Equipamento: {character.equipment}</div>
                <div>Habilidades Especiais: {character.specialAbilities}</div>
              </CharacterAttributes>

              <Actions>
                <ActionButton onClick={() => handleEditCharacter(character)}>Editar</ActionButton>
                <ActionButton onClick={() => handleDelete(character.id)}>Excluir</ActionButton>
                <ActionButton onClick={() => handleShare(character)}>Compartilhar</ActionButton>
              </Actions>
            </CharacterCard>
          ))}
        </CharacterList>
      )}

      {selectedCharacter && (
        <UpdateForm>
          <h2>Atualizar Personagem: {selectedCharacter.name}</h2>

          {/* Campos de entrada para editar todos os atributos do personagem */}
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleFormChange}
            placeholder="Nome"
          />
          <Input
            type="text"
            name="class"
            value={formData.class}
            onChange={handleFormChange}
            placeholder="Classe"
          />
          <Input
            type="number"
            name="level"
            value={formData.level}
            onChange={handleFormChange}
            placeholder="Nível"
          />
          <Input
            type="number"
            name="strength"
            value={formData.strength}
            onChange={handleFormChange}
            placeholder="Força"
          />
          <Input
            type="number"
            name="dexterity"
            value={formData.dexterity}
            onChange={handleFormChange}
            placeholder="Destreza"
          />
          <Input
            type="number"
            name="constitution"
            value={formData.constitution}
            onChange={handleFormChange}
            placeholder="Constituição"
          />
          <Input
            type="number"
            name="intelligence"
            value={formData.intelligence}
            onChange={handleFormChange}
            placeholder="Inteligência"
          />
          <Input
            type="number"
            name="wisdom"
            value={formData.wisdom}
            onChange={handleFormChange}
            placeholder="Sabedoria"
          />
          <Input
            type="number"
            name="charisma"
            value={formData.charisma}
            onChange={handleFormChange}
            placeholder="Carisma"
          />
          <Textarea
            name="background"
            value={formData.background}
            onChange={handleFormChange}
            placeholder="Antecedente"
          />
          <Textarea
            name="equipment"
            value={formData.equipment}
            onChange={handleFormChange}
            placeholder="Equipamento"
          />
          <Textarea
            name="specialAbilities"
            value={formData.specialAbilities}
            onChange={handleFormChange}
            placeholder="Habilidades Especiais"
          />
          
          <Button onClick={() => handleUpdate(selectedCharacter.id, formData)}>Salvar Alterações</Button>
          <Button onClick={() => setSelectedCharacter(null)}>Cancelar</Button>
        </UpdateForm>
      )}
    </Container>
  );
};

// Estilos personalizados

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  background-color: #000; /* Fundo preto */
  height: 100vh;
  color: #fff; /* Texto branco */
`;

const Title = styled.h1`
  font-size: 36px;
  margin-bottom: 30px;
  margin-top: 40px;
  text-align: center;
`;

const LoadingMessage = styled.p`
  text-align: center;
  color: #ccc;
  font-size: 18px;
`;

const ErrorMessage = styled.p`
  text-align: center;
  color: red;
  font-size: 18px;
`;

const Message = styled.p`
  text-align: center;
  color: #fff;
  font-size: 18px;
`;

const CharacterList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
`;

const CharacterCard = styled.div`
  background-color: #222;
  padding: 20px;
  width: 250px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(255, 255, 255, 0.1);
  text-align: center;
`;

const CharacterName = styled.h2`
  font-size: 24px;
  color: #e67e22;
`;

const CharacterClass = styled.p`
  font-size: 18px;
  color: #ccc;
`;

const CharacterLevel = styled.p`
  font-size: 18px;
  color: #ccc;
`;

const CharacterAttributes = styled.div`
  font-size: 14px;
  color: #bbb;
  margin-top: 10px;
  text-align: left;

  div {
    margin-bottom: 5px;
  }
`;

const Actions = styled.div`
  margin-top: 15px;
  display: flex;
  gap: 10px;
  justify-content: center;
`;

const ActionButton = styled.button`
  padding: 8px 15px;
  background-color: #e67e22;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #d45d00;
  }
`;

const UpdateForm = styled.div`
  background-color: #333;
  padding: 20px;
  border-radius: 10px;
  max-width: 400px;
  margin: 20px auto;
  text-align: center;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #333;
  border-radius: 8px;
  margin-bottom: 15px;
  width: 100%;
  background-color: #222;
  color: white;
`;

const Textarea = styled.textarea`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #333;
  border-radius: 8px;
  margin-bottom: 15px;
  width: 100%;
  min-height: 80px;
  background-color: #222;
  color: white;
`;

const Button = styled.button`
  padding: 12px 20px;
  font-size: 16px;
  background-color: #e67e22;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #d45d00;
  }
`;

export default CharactersPage;
