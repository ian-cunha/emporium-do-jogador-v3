import { useState } from 'react';
import styled from 'styled-components';
import { InsideBar } from '../components/InsideBar';
import { auth, firestore } from "../../config/Firebase";  // Atualizado para não importar o storage
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const db = getFirestore();  // Inicializando o Firestore

export const CharacterCreation = () => {
  const [character, setCharacter] = useState({
    name: '',
    race: 'Humano',
    class: 'Guerreiro',
    level: 1,
    strength: 10,
    dexterity: 10,
    constitution: 10,
    intelligence: 10,
    wisdom: 10,
    charisma: 10,
    background: '',
    equipment: '',
    experience: 0,
    personalityTraits: '',
    specialAbilities: '',
    avatar: '',  // Novo campo para o avatar
    hitPoints: 10,  // Pontos de Vida (HP) com valor inicial padrão
  });

  // Função para atualizar o estado do personagem
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCharacter((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Função para lidar com a seleção de avatar (imagem)
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCharacter((prevState) => ({
          ...prevState,
          avatar: reader.result,  // Armazenar a imagem como base64
        }));
      };
      reader.readAsDataURL(file);  // Converte a imagem em base64
    }
  };

  // Função para enviar os dados e salvar o personagem no Firestore
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const currentUser = auth.currentUser;  // Obter o usuário autenticado
    if (!currentUser) {
      alert('Você precisa estar logado para criar um personagem.');
      return;
    }
  
    try {
      // Criar o documento de personagem dentro da coleção 'characters' do usuário
      await setDoc(doc(db, 'users', currentUser.email, 'characters', character.name), {
        ...character,
        createdAt: new Date(),
        userId: currentUser.uid,  // Adiciona o ID do usuário para referência
        equipment: character.equipment ? character.equipment.split(',').map(item => item.trim()) : [], // Converte a string em um array
      });
  
      console.log('Personagem criado com sucesso');
      alert('Seu personagem foi criado com sucesso!');
  
      // Limpar o formulário após sucesso
      setCharacter({
        name: '',
        race: 'Humano',
        class: 'Guerreiro',
        level: 1,
        strength: 10,
        dexterity: 10,
        constitution: 10,
        intelligence: 10,
        wisdom: 10,
        charisma: 10,
        background: '',
        equipment: '',  // Limpa o campo de equipamento ao criar um novo personagem
        experience: 0,
        personalityTraits: '',
        specialAbilities: '',
        avatar: '',  // Limpar a foto ao criar um novo personagem
        hitPoints: 10,  // Resetar pontos de vida para o valor padrão
      });
    } catch (error) {
      console.error("Erro ao criar personagem:", error);
      alert('Ocorreu um erro ao salvar seu personagem. Tente novamente.');
    }
  };
  

  return (
    <Container>
      <InsideBar />
      <Title>Ficha de Personagem</Title>
      <Form onSubmit={handleSubmit}>
        <Label>Nome do Personagem:</Label>
        <Input
          type="text"
          name="name"
          value={character.name}
          onChange={handleInputChange}
          placeholder="Ex: Aragorn"
          required
        />

        <Label>Raça:</Label>
        <Select name="race" value={character.race} onChange={handleInputChange}>
          {/* Opções de Raça */}
          <option value="Humano">Humano</option>
          <option value="Elfo">Elfo</option>
          <option value="Anão">Anão</option>
          <option value="Halfling">Halfling</option>
          <option value="Gnomo">Gnomo</option>
          <option value="Meio-Elfo">Meio-Elfo</option>
          <option value="Meio-Orc">Meio-Orc</option>
          <option value="Draconato">Draconato</option>
          <option value="Tiefling">Tiefling</option>
          <option value="Aasimar">Aasimar</option>
          <option value="Genasi">Genasi</option>
          <option value="Tabaxi">Tabaxi</option>
          <option value="Firbolg">Firbolg</option>
          <option value="Tritão">Tritão</option>
          <option value="Kenku">Kenku</option>
          <option value="Lizardfolk">Lizardfolk</option>
          <option value="Changeling">Changeling</option>
          <option value="Shifter">Shifter</option>
          <option value="Warforged">Warforged</option>
        </Select>

        <Label>Classe:</Label>
        <Select name="class" value={character.class} onChange={handleInputChange}>
          {/* Opções de Classe */}
          <option value="Guerreiro">Guerreiro</option>
          <option value="Mago">Mago</option>
          <option value="Ladino">Ladino</option>
          <option value="Clérigo">Clérigo</option>
          <option value="Arqueiro">Arqueiro</option>
          <option value="Paladino">Paladino</option>
          <option value="Bárbaro">Bárbaro</option>
          <option value="Monge">Monge</option>
          <option value="Feiticeiro">Feiticeiro</option>
          <option value="Warlock">Feiticeiro (Warlock)</option>
          <option value="Druida">Druida</option>
          <option value="Bardo">Bardo</option>
          <option value="Brujo">Brujo</option>
          <option value="Artífice">Artífice</option>
        </Select>

        <Label>Nível:</Label>
        <Input
          type="number"
          name="level"
          value={character.level}
          onChange={handleInputChange}
          min="1"
          max="20"
        />

        <Label>Pontos de Vida (HP):</Label>
        <Input
          type="number"
          name="hitPoints"
          value={character.hitPoints}
          onChange={handleInputChange}  // Removido o readOnly para permitir edição
          min="1"
        />

        <Label>Pontos de Experiência:</Label>
        <Input
          type="number"
          name="experience"
          value={character.experience}
          onChange={handleInputChange}
        />

        {/* Novo campo de avatar */}
        <Label>Avatar:</Label>
        <AvatarPreview>
          {character.avatar ? (
            <img src={character.avatar} alt="Avatar Prévia" />
          ) : (
            <span>Selecione uma imagem</span>
          )}
        </AvatarPreview>
        <InputFile
          type="file"
          accept="image/*"
          onChange={handleAvatarChange}
        />

        <h3>Atributos</h3>
        <Attributes>
          <Attribute>
            <Label>Força:</Label>
            <Input
              type="number"
              name="strength"
              value={character.strength}
              onChange={handleInputChange}
              min="1"
              max="20"
            />
          </Attribute>
          <Attribute>
            <Label>Destreza:</Label>
            <Input
              type="number"
              name="dexterity"
              value={character.dexterity}
              onChange={handleInputChange}
              min="1"
              max="20"
            />
          </Attribute>
          <Attribute>
            <Label>Constituição:</Label>
            <Input
              type="number"
              name="constitution"
              value={character.constitution}
              onChange={handleInputChange}
              min="1"
              max="20"
            />
          </Attribute>
          <Attribute>
            <Label>Inteligência:</Label>
            <Input
              type="number"
              name="intelligence"
              value={character.intelligence}
              onChange={handleInputChange}
              min="1"
              max="20"
            />
          </Attribute>
          <Attribute>
            <Label>Sabedoria:</Label>
            <Input
              type="number"
              name="wisdom"
              value={character.wisdom}
              onChange={handleInputChange}
              min="1"
              max="20"
            />
          </Attribute>
          <Attribute>
            <Label>Carisma:</Label>
            <Input
              type="number"
              name="charisma"
              value={character.charisma}
              onChange={handleInputChange}
              min="1"
              max="20"
            />
          </Attribute>
        </Attributes>

        <Label>Antecedente (História):</Label>
        <Textarea
          name="background"
          value={character.background}
          onChange={handleInputChange}
          placeholder="Ex: Aragorn é o herdeiro do trono de Gondor..."
        />

        <Label>Traços de Personalidade:</Label>
        <Textarea
          name="personalityTraits"
          value={character.personalityTraits}
          onChange={handleInputChange}
          placeholder="Ex: Valente, determinado, etc."
        />

        <Label>Equipamento:</Label>
        <Textarea
          name="equipment"
          value={character.equipment}
          onChange={handleInputChange}
          placeholder="Ex: Espada longa, escudo, mochila..."
        />

        <Label>Habilidades Especiais:</Label>
        <Textarea
          name="specialAbilities"
          value={character.specialAbilities}
          onChange={handleInputChange}
          placeholder="Ex: Fúria do Guerreiro, Magia do Mago, etc."
        />

        <Button type="submit">Criar Personagem</Button>
      </Form>
    </Container>
  );
};

// Estilos personalizados usando styled-components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  background-color: #000;
  height: 100vh;
  color: #fff;

  @media (max-width: 768px) {
    padding: 5px;
  }
`;

const Title = styled.h1`
  font-size: 36px;
  margin-top: 50px;
  margin-bottom: 30px;
  color: #fff;
  text-align: center;
`;

const Form = styled.form`
  background-color: #111;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(255, 255, 255, 0.1);
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Label = styled.label`
  font-size: 16px;
  margin-bottom: 5px;
  color: #ccc;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #333;
  border-radius: 8px;
  margin-bottom: 15px;
  background-color: #222;
  color: #fff;
`;

const Select = styled.select`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #333;
  border-radius: 8px;
  margin-bottom: 15px;
  background-color: #222;
  color: #fff;
`;

const Textarea = styled.textarea`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #333;
  border-radius: 8px;
  margin-bottom: 15px;
  width: 100%;
  min-height: 100px;
  background-color: #222;
  color: #fff;
`;

const Attributes = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const Attribute = styled.div`
  width: 48%;
`;

const AvatarPreview = styled.div`
  margin-bottom: 15px;
  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
  }
  span {
    color: #ccc;
  }
`;

const InputFile = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #333;
  border-radius: 8px;
  background-color: #222;
  color: #fff;
`;

const Button = styled.button`
  padding: 12px 20px;
  font-size: 16px;
  background-color: #e67e22;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #d45d00;
  }
`;

export default CharacterCreation;
