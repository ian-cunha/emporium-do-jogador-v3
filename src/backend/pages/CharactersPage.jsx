import { useEffect, useState } from 'react';
import { auth } from "../../config/Firebase";
import { getFirestore, collection, getDocs, query, where, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import styled from 'styled-components';
import { Navigate } from 'react-router-dom';
import { InsideBar } from '../components/InsideBar';
import { jsPDF } from "jspdf"; // Importando o jsPDF

const db = getFirestore();

export const CharactersPage = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
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
    avatar: '',
    hitPoints: 10,  // Novo campo para HP
    experience: 0,  // Novo campo para Experiência
  });


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

  const handleDelete = async (id) => {
    const currentUser = auth.currentUser;
  
    // Adiciona a confirmação
    const confirmDelete = window.confirm("Tem certeza que deseja excluir este personagem?");
    
    if (!confirmDelete) {
      return; // Se o usuário cancelar, não faz nada
    }
  
    try {
      await deleteDoc(doc(db, 'users', currentUser.email, 'characters', id));
      setCharacters(characters.filter(character => character.id !== id));
    } catch (err) {
      console.error("Erro ao excluir personagem:", err);
    }
  };  

  const handleUpdate = async (id, updatedData) => {
    const currentUser = auth.currentUser;
    try {
      const characterRef = doc(db, 'users', currentUser.email, 'characters', id);
      await updateDoc(characterRef, {
        ...updatedData,
        equipment: updatedData.equipment.split(',').map(item => item.trim()) // Converte de volta para array
      });
      setCharacters(prevState =>
        prevState.map(character =>
          character.id === id ? { ...character, ...updatedData } : character
        )
      );
      setSelectedCharacter(null);
    } catch (err) {
      console.error("Erro ao atualizar personagem:", err);
    }
  };  

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
      equipment: Array.isArray(character.equipment) ? character.equipment.join(', ') : character.equipment, // Converte para string
      specialAbilities: character.specialAbilities,
      avatar: character.avatar || '',
      hitPoints: character.hitPoints || 10,
      experience: character.experience || 0,
    });
  };
  

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDownloadPDF = (character) => {
    const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: 'letter',
    });

    const margin = 40;
    let yPosition = margin;

    // Title Section
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text("Ficha do Personagem", 300, yPosition, { align: 'center' });
    yPosition += 30;

    // Basic Info Section
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Nome:", margin, yPosition);
    doc.setFont("helvetica", "normal");
    doc.text(character.name, margin + 60, yPosition);

    doc.setFont("helvetica", "bold");
    doc.text("Classe:", margin + 200, yPosition);
    doc.setFont("helvetica", "normal");
    doc.text(character.class, margin + 260, yPosition);

    doc.setFont("helvetica", "bold");
    doc.text("Nível:", margin + 360, yPosition);
    doc.setFont("helvetica", "normal");
    doc.text(String(character.level), margin + 410, yPosition);

    yPosition += 30;

    // Add Avatar (optional)
    if (character.avatar) {
        doc.addImage(character.avatar, 'JPEG', margin, yPosition, 80, 80);
    } else {
        doc.setFillColor(200, 200, 200);
        doc.rect(margin, yPosition, 80, 80, 'F');
        doc.text("Sem Avatar", margin + 10, yPosition + 40);
    }

    yPosition += 100;

    // Attributes Section - Grid-like Structure
    doc.setFont("helvetica", "bold");
    doc.text("Atributos", margin, yPosition);
    yPosition += 20;

    const attributeXPositions = [margin, margin + 150, margin + 300]; // Create 3 columns for attributes
    const attributeYPositions = [yPosition, yPosition + 20, yPosition + 40];

    const attributes = [
        { label: 'Força', value: character.strength },
        { label: 'Destreza', value: character.dexterity },
        { label: 'Constituição', value: character.constitution },
        { label: 'Inteligência', value: character.intelligence },
        { label: 'Sabedoria', value: character.wisdom },
        { label: 'Carisma', value: character.charisma },
    ];

    attributes.forEach((attr, index) => {
        const col = index % 3;
        const row = Math.floor(index / 3);
        const xPos = attributeXPositions[col];
        const yPos = attributeYPositions[row];

        doc.text(`${attr.label}: ${attr.value}`, xPos, yPos);
    });

    yPosition += 60;

    // HP and Experience Section
    doc.setFont("helvetica", "bold");
    doc.text("HP:", margin, yPosition);
    doc.setFont("helvetica", "normal");
    doc.text(String(character.hitPoints), margin + 30, yPosition);

    doc.setFont("helvetica", "bold");
    doc.text("Experiência:", margin + 100, yPosition);
    doc.setFont("helvetica", "normal");
    doc.text(String(character.experience), margin + 160, yPosition);

    yPosition += 30;

    // Additional Information - Skills and Abilities
    doc.setFont("helvetica", "bold");
    doc.text("Informações Adicionais", margin, yPosition);
    yPosition += 20;

    const infoSections = [
        { label: "Antecedente", content: character.background },
        { label: "Equipamento", content: Array.isArray(character.equipment) ? character.equipment.join(', ') : character.equipment || "N/A" },
        { label: "Habilidades Especiais", content: character.specialAbilities }
    ];

    infoSections.forEach(section => {
        doc.setFont("helvetica", "bold");
        doc.text(`${section.label}:`, margin, yPosition);
        doc.setFont("helvetica", "normal");
        doc.text(section.content, margin + 100, yPosition, { maxWidth: 450 });
        yPosition += 40;
    });

    // Save the PDF
    doc.save(`${character.name}-ficha-dnd.pdf`);
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
              <Avatar src={character.avatar || 'https://via.placeholder.com/150'} alt="Avatar" />
              <CharacterName>{character.name}</CharacterName>
              <CharacterClass>Classe: {character.class}</CharacterClass>
              <CharacterLevel>Nível: {character.level}</CharacterLevel>
              {/* Exibindo HP e Experiência */}
              <div>Pontos de Vida (HP): {character.hitPoints}</div>
              <div>Experiência: {character.experience}</div>

              <AttributesSection>
                <AttributeList>
                  <AttributeTitle>Atributos</AttributeTitle>
                  <AttributeRow>
                    <div>Força: {character.strength}</div>
                    <div>Destreza: {character.dexterity}</div>
                  </AttributeRow>
                  <AttributeRow>
                    <div>Constituição: {character.constitution}</div>
                    <div>Inteligência: {character.intelligence}</div>
                  </AttributeRow>
                  <AttributeRow>
                    <div>Sabedoria: {character.wisdom}</div>
                    <div>Carisma: {character.charisma}</div>
                  </AttributeRow>
                </AttributeList>
                <InfoSection>
                  <InfoTitle>Informações Adicionais</InfoTitle>
                  <div>Antecedente: {character.background}</div>
                  <div>Equipamento: {Array.isArray(character.equipment) ? character.equipment.join(', ') : character.equipment}</div>
                  <div>Habilidades Especiais: {character.specialAbilities}</div>
                </InfoSection>
              </AttributesSection>

              <Actions>
                <ActionButton onClick={() => handleEditCharacter(character)}>Editar</ActionButton>
                <ActionButton onClick={() => handleDelete(character.id)}>Excluir</ActionButton>
                <ActionButton onClick={() => handleShare(character)}>Compartilhar</ActionButton>
                <ActionButton onClick={() => handleDownloadPDF(character)}>Baixar PDF</ActionButton>
              </Actions>
            </CharacterCard>
          ))}
        </CharacterList>
      )}

      {selectedCharacter && (
        <UpdateForm>
          <h2>Editar Personagem</h2>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleFormChange}
            placeholder="Nome"
          />
          <Input
            type="number"
            name="hitPoints"
            value={formData.hitPoints}
            onChange={handleFormChange}
            placeholder="Pontos de Vida (HP)"
          />
          <Input
            type="number"
            name="experience"
            value={formData.experience}
            onChange={handleFormChange}
            placeholder="Experiência"
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
          <Input
            type="text"
            name="avatar"
            value={formData.avatar}
            onChange={handleFormChange}
            placeholder="URL do Avatar"
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
  background-color: #000;
  height: 100vh;
  color: #fff;
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
  gap: 30px;
`;

const CharacterCard = styled.div`
  background-color: #222;
  padding: 20px;
  width: 500px;
  margin-bottom: 20px;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(255, 255, 255, 0.1);
  text-align: center;
  font-family: 'Courier New', Courier, monospace;
  position: relative;

  @media (max-width: 768px) {
    width: 95vw;
  }
`;

const Avatar = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-bottom: 15px;
  border: 3px solid #e67e22;
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

const AttributesSection = styled.div`
  margin-top: 15px;
  text-align: left;
`;

const AttributeList = styled.div`
  margin-bottom: 15px;
`;

const AttributeTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 10px;
  color: #e67e22;
`;

const AttributeRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const InfoSection = styled.div`
  margin-top: 20px;
`;

const InfoTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 10px;
  color: #e67e22;
`;

const Actions = styled.div`
  margin-top: 15px;
  display: flex;
  gap: 10px;
  justify-content: center;

  @media (max-width: 768px) {
    flex-direction: column;
  }
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
