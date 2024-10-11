import { useState } from "react";
import { ListProfile, ListBar, Menu, NavBar, ButtonBar, BtnProfile, ImageLogo } from "../../components/Globals";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../config/Firebase";
import logo from "../../assets/logo.svg";

export const InsideBar = () => {
  const navigate = useNavigate();
  const [isDicePopupVisible, setDicePopupVisible] = useState(false);
  const [diceResult, setDiceResult] = useState(null);
  const [diceType, setDiceType] = useState(6); // Tipo de dado (6, 20, 100, 4, 8, 10, 12)
  const [isRolling, setIsRolling] = useState(false); // Controle da animação de rotação
  const [randomNumber, setRandomNumber] = useState(1); // Número aleatório exibido durante a animação

  const handleSignOut = () => {
    signOut(auth)
      .then(() => console.log('Sign Out'))
      .catch((error) => console.log(error));
  };

  function dotBar() {
    var barBtn = document.getElementById('nav');
    if (barBtn.style.display === 'flex') {
      barBtn.style.display = 'none';
    } else {
      barBtn.style.display = 'flex';
    }
  }

  function dropProfile() {
    var dropUser = document.getElementById('dropdownProfile');
    if (dropUser.style.display === 'flex') {
      dropUser.style.display = 'none';
    } else {
      dropUser.style.display = 'flex';
    }
  }

  // Função para gerar o número aleatório
  const rollDice = () => {
    setIsRolling(true);  // Começa a animação
    const interval = setInterval(() => {
      setRandomNumber(Math.floor(Math.random() * diceType) + 1); // Atualiza o número aleatório
    }, 100); // Atualiza o número a cada 100ms

    // Após 2 segundos, para a animação e define o número final
    setTimeout(() => {
      clearInterval(interval); // Para a atualização do número aleatório
      const finalResult = Math.floor(Math.random() * diceType) + 1;
      setDiceResult(finalResult); // Mostra o número final após 2 segundos
      setRandomNumber(finalResult); // Sincroniza o número exibido com o resultado final
      setIsRolling(false); // Para a animação
    }, 2000); // 2 segundos de animação de rotação
  };

  // Função para abrir/fechar o popup
  const toggleDicePopup = () => {
    setDicePopupVisible(!isDicePopupVisible);
    setDiceResult(null); // Reseta o número do dado quando a popup é fechada
  };

  // Função para escolher o tipo de dado SVG
  const renderDiceSVG = () => {
    switch (diceType) {
      case 4:
        return (
          <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <g id="dice">
              <circle cx="50" cy="50" r="45" fill="white" stroke="black" strokeWidth="3" />
              <text x="50%" y="50%" textAnchor="middle" dy=".3em" fontSize="30" fill="black">{randomNumber}</text>
            </g>
          </svg>
        );
      case 6:
        return (
          <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <g id="dice">
              <rect x="10" y="10" width="80" height="80" rx="10" ry="10" fill="white" stroke="black" strokeWidth="3" />
              {randomNumber === 1 && <circle cx="50" cy="50" r="5" fill="black" />}
              {randomNumber === 2 && (
                <>
                  <circle cx="25" cy="25" r="5" fill="black" />
                  <circle cx="75" cy="75" r="5" fill="black" />
                </>
              )}
              {randomNumber === 3 && (
                <>
                  <circle cx="25" cy="25" r="5" fill="black" />
                  <circle cx="50" cy="50" r="5" fill="black" />
                  <circle cx="75" cy="75" r="5" fill="black" />
                </>
              )}
              {randomNumber === 4 && (
                <>
                  <circle cx="25" cy="25" r="5" fill="black" />
                  <circle cx="25" cy="75" r="5" fill="black" />
                  <circle cx="75" cy="25" r="5" fill="black" />
                  <circle cx="75" cy="75" r="5" fill="black" />
                </>
              )}
              {randomNumber === 5 && (
                <>
                  <circle cx="25" cy="25" r="5" fill="black" />
                  <circle cx="25" cy="50" r="5" fill="black" />
                  <circle cx="25" cy="75" r="5" fill="black" />
                  <circle cx="75" cy="25" r="5" fill="black" />
                  <circle cx="75" cy="75" r="5" fill="black" />
                </>
              )}
              {randomNumber === 6 && (
                <>
                  <circle cx="25" cy="25" r="5" fill="black" />
                  <circle cx="25" cy="50" r="5" fill="black" />
                  <circle cx="25" cy="75" r="5" fill="black" />
                  <circle cx="75" cy="25" r="5" fill="black" />
                  <circle cx="75" cy="50" r="5" fill="black" />
                  <circle cx="75" cy="75" r="5" fill="black" />
                </>
              )}
            </g>
          </svg>
        );
      case 8:
        return (
          <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <g id="dice">
              <circle cx="50" cy="50" r="45" fill="white" stroke="black" strokeWidth="3" />
              <text x="50%" y="50%" textAnchor="middle" dy=".3em" fontSize="30" fill="black">{randomNumber}</text>
            </g>
          </svg>
        );
      case 10:
        return (
          <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <g id="dice">
              <circle cx="50" cy="50" r="45" fill="white" stroke="black" strokeWidth="3" />
              <text x="50%" y="50%" textAnchor="middle" dy=".3em" fontSize="30" fill="black">{randomNumber}</text>
            </g>
          </svg>
        );
      case 12:
        return (
          <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <g id="dice">
              <circle cx="50" cy="50" r="45" fill="white" stroke="black" strokeWidth="3" />
              <text x="50%" y="50%" textAnchor="middle" dy=".3em" fontSize="30" fill="black">{randomNumber}</text>
            </g>
          </svg>
        );
      case 20:
        return (
          <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <g id="dice">
              <circle cx="50" cy="50" r="45" fill="white" stroke="black" strokeWidth="3" />
              <text x="50%" y="50%" textAnchor="middle" dy=".3em" fontSize="30" fill="black">{randomNumber}</text>
            </g>
          </svg>
        );
      case 100:
        return (
          <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <g id="dice">
              <rect x="10" y="10" width="80" height="80" fill="white" stroke="black" strokeWidth="3" />
              <text x="50%" y="50%" textAnchor="middle" dy=".3em" fontSize="25" fill="black">{randomNumber}</text>
            </g>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <NavBar>
        <Menu className="bi bi-list" onClick={dotBar}></Menu>
        <ImageLogo onClick={() => navigate('/')} src={logo} />
        <ListBar id="nav">
        <ButtonBar className="bi bi-file-earmark-post" onClick={() => navigate('/plataforma')}> Dashboard</ButtonBar>
          <ButtonBar className="bi bi-file-earmark-post" onClick={() => navigate('/ficha')}> Criador de ficha</ButtonBar>
          <ButtonBar className="bi bi-file-earmark-post" onClick={() => navigate('/fichas')}> Fichas</ButtonBar>
          <ButtonBar className="bi bi-collection"> Biblioteca</ButtonBar>
          <ButtonBar className="bi bi-dice-6" onClick={toggleDicePopup}> Dado</ButtonBar>
          <ButtonBar className="bi bi-list-nested" onClick={() => navigate('/referenciaplataforma')}> Referência Rápida</ButtonBar>
          <ButtonBar className="bi bi-gear" onClick={() => navigate('/configuracoes')}> Configurações</ButtonBar>
        </ListBar>
        <BtnProfile onClick={dropProfile} className="bi bi-person" />
      </NavBar>

      <ListProfile id='dropdownProfile'>
        <ButtonBar className="bi bi-box-arrow-left" onClick={handleSignOut}> Fechar sessão</ButtonBar>
        <ButtonBar className="bi bi-people" onClick={() => { window.location = 'https://chat.whatsapp.com/BshOjKKju9rHHj3tZIwKmC' }}> Comunidade</ButtonBar>
      </ListProfile>

      {/* Popup do dado */}
      {isDicePopupVisible && (
        <div className="dice-popup-overlay">
          <div className="dice-popup">
            <button className="close-popup-btn" onClick={toggleDicePopup}>X</button>
            <h3>Escolha o tipo de dado</h3>
            <select onChange={(e) => setDiceType(Number(e.target.value))} value={diceType}>
              <option value={4}>d4</option>
              <option value={6}>d6</option>
              <option value={8}>d8</option>
              <option value={10}>d10</option>
              <option value={12}>d12</option>
              <option value={20}>d20</option>
              <option value={100}>d100</option>
            </select>
            <button onClick={rollDice}>Lançar Dado</button>
            {isRolling ? (
              <div className="dice-rolling">
                {/* Mostra o dado girando durante a animação */}
                <div className="dice-rotate">
                  {renderDiceSVG()}
                </div>
              </div>
            ) : (
              <div className="dice-result">
                {diceResult !== null && <p>Resultado: {diceResult}</p>}
                {renderDiceSVG()}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
