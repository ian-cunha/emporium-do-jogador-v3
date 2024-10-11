import { useState } from 'react';
import styled from 'styled-components';
import { InsideBar } from '../components/InsideBar';

export const Settings = () => {
  const [character, setCharacter] = useState({
    name: 'Aragorn',
    race: 'Humano',
    class: 'Guerreiro',
    level: 5,
    strength: 16,
    dexterity: 14,
    constitution: 13,
    intelligence: 12,
    wisdom: 11,
    charisma: 15,
    background: 'Aragorn é o herdeiro do trono de Gondor, mas viveu em exílio...',
    equipment: 'Espada longa, escudo, mochila com provisões...',
    avatar: 'https://www.placecage.com/200/300', // Foto padrão
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCharacter((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Dados atualizados:', character);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCharacter((prevState) => ({
          ...prevState,
          avatar: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Container>
      <InsideBar />
      <Title>Configurações de Personagem</Title>
      <Form onSubmit={handleSubmit}>
        {/* Seção de Foto */}
        <AvatarSection>
          <AvatarPreview src={character.avatar} alt="Avatar" />
          <FileInput
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
          />
          <Button type="button" onClick={() => document.querySelector('input[type="file"]').click()}>
            Trocar Foto
          </Button>
        </AvatarSection>

        {/* Dados do Personagem */}
        <Section>
          <h3>Dados do Personagem</h3>
          <InputRow>
            <InputWrapper>
              <Label>Nome do Personagem:</Label>
              <Input
                type="text"
                name="name"
                value={character.name}
                onChange={handleInputChange}
              />
            </InputWrapper>
            <InputWrapper>
              <Label>Raça:</Label>
              <Select name="race" value={character.race} onChange={handleInputChange}>
                <option value="Humano">Humano</option>
                <option value="Elfo">Elfo</option>
                <option value="Anão">Anão</option>
                <option value="Meio-Orc">Meio-Orc</option>
                <option value="Híbrido">Híbrido</option>
              </Select>
            </InputWrapper>
          </InputRow>

          <InputRow>
            <InputWrapper>
              <Label>Classe:</Label>
              <Select name="class" value={character.class} onChange={handleInputChange}>
                <option value="Guerreiro">Guerreiro</option>
                <option value="Mago">Mago</option>
                <option value="Ladino">Ladino</option>
                <option value="Clérigo">Clérigo</option>
                <option value="Arqueiro">Arqueiro</option>
              </Select>
            </InputWrapper>
            <InputWrapper>
              <Label>Nível:</Label>
              <Input
                type="number"
                name="level"
                value={character.level}
                onChange={handleInputChange}
                min="1"
                max="20"
              />
            </InputWrapper>
          </InputRow>
        </Section>

        {/* Atributos */}
        <Section>
          <h3>Atributos</h3>
          <Attributes>
            {['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'].map((attr) => (
              <Attribute key={attr}>
                <Label>{attr.charAt(0).toUpperCase() + attr.slice(1)}:</Label>
                <Input
                  type="number"
                  name={attr}
                  value={character[attr]}
                  onChange={handleInputChange}
                  min="1"
                  max="20"
                />
              </Attribute>
            ))}
          </Attributes>
        </Section>

        {/* História e Equipamento */}
        <Section>
          <Label>Antecedente (História):</Label>
          <Textarea
            name="background"
            value={character.background}
            onChange={handleInputChange}
          />
          <Label>Equipamento:</Label>
          <Textarea
            name="equipment"
            value={character.equipment}
            onChange={handleInputChange}
          />
        </Section>

        <Button type="submit">Salvar Configurações</Button>
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
`;

const Title = styled.h1`
  margin-top: 30px;
  font-size: 36px;
  margin-bottom: 30px;
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
  gap: 20px;
`;

const AvatarSection = styled.div`
  text-align: center;
`;

const AvatarPreview = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 50%;
  margin-bottom: 10px;
`;

const FileInput = styled.input`
  display: none;
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

const Section = styled.div`
  margin-bottom: 20px;
`;

const InputRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
`;

const InputWrapper = styled.div`
  width: 48%;
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

export default Settings;
