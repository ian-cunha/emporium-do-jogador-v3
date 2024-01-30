import { ListProfile, ListBar, Menu, NavBar, BtnBar, DropBox, BtnProfile, ListDrop, Exit, ImageLogo, ButtonBar } from "./Globals"
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg"

export const Bar = () => {

  const navigate = useNavigate();

  function dotBar() {
    var barBtn = document.getElementById('nav')
    if (barBtn.style.display === 'flex') {
      barBtn.style.display = 'none'
    } else {
      barBtn.style.display = 'flex'
    }
  }

  function dropRaces() {
    var dropRace = document.getElementById('dropdownRaces')
    if (dropRace.style.display === 'flex') {
      dropRace.style.display = 'none'
    } else {
      dropRace.style.display = 'flex'
    }
  }

  function dropClasses() {
    var dropClass = document.getElementById('dropdownClasses')
    if (dropClass.style.display === 'flex') {
      dropClass.style.display = 'none'
    } else {
      dropClass.style.display = 'flex'
    }
  }

  function dropSpells() {
    var dropSpell = document.getElementById('dropdownSpells')
    if (dropSpell.style.display === 'flex') {
      dropSpell.style.display = 'none'
    } else {
      dropSpell.style.display = 'flex'
    }
  }

  function dropProfile() {
    var dropUser = document.getElementById('dropdownProfile')
    if (dropUser.style.display === 'flex') {
      dropUser.style.display = 'none'
    } else {
      dropUser.style.display = 'flex'
    }
  }

  const truques = () => {
    navigate('/magias/truques')
    location.reload()
  }

  const nivel1 = () => {
    navigate('/magias/nivel1')
    location.reload()
  }

  const nivel2 = () => {
    navigate('/magias/nivel2')
    location.reload()
  }

  const nivel3 = () => {
    navigate('/magias/nivel3')
    location.reload()
  }

  const nivel4 = () => {
    navigate('/magias/nivel4')
    location.reload()
  }

  const nivel5 = () => {
    navigate('/magias/nivel5')
    location.reload()
  }

  const nivel6 = () => {
    navigate('/magias/nivel6')
    location.reload()
  }

  const nivel7 = () => {
    navigate('/magias/nivel7')
    location.reload()
  }

  const nivel8 = () => {
    navigate('/magias/nivel8')
    location.reload()
  }

  const nivel9 = () => {
    navigate('/magias/nivel9')
    location.reload()
  }

  return (
    <>
      <NavBar>
        <Menu className="bi bi-list" onClick={dotBar}></Menu>
        <ImageLogo onClick={() => navigate('/')} src={logo} />
        <ListBar id="nav">
          <DropBox onClick={dropRaces}>Raças <i className="bi bi-caret-down-fill"></i></DropBox>
          <DropBox onClick={dropClasses}>Classes <i className="bi bi-caret-down-fill"></i></DropBox>
          <DropBox onClick={dropSpells}>Mágias <i className="bi bi-caret-down-fill"></i></DropBox>
          <ButtonBar className="bi bi-list-nested" onClick={() => navigate('/referencias')}> Referência Rápida</ButtonBar>
        </ListBar>
        <BtnProfile onClick={dropProfile} className="bi bi-person" />
      </NavBar>

      <ListDrop id='dropdownRaces'>
        <Exit onClick={dropRaces} className="bi bi-x-square-fill" />
        <BtnBar>Livro do Jogador</BtnBar>
        <BtnBar>Guia de Volo</BtnBar>
        <BtnBar>Guia de Eberron</BtnBar>
        <BtnBar>Guia de Wildemount</BtnBar>
        <BtnBar>Guia de Ravnica</BtnBar>
        <BtnBar>Guia de Ravenloft</BtnBar>
        <BtnBar>Odisseia Mítica de Theros</BtnBar>
      </ListDrop>

      <ListDrop id='dropdownClasses'>
        <Exit onClick={dropClasses} className="bi bi-x-square-fill" />
        <BtnBar>Artificer</BtnBar>
        <BtnBar>Bárbaro</BtnBar>
        <BtnBar>Bardo</BtnBar>
        <BtnBar>Bruxo</BtnBar>
        <BtnBar>Caçador-Sangrento</BtnBar>
        <BtnBar>Druida</BtnBar>
        <BtnBar>Feiticeiro</BtnBar>
        <BtnBar>Ladino</BtnBar>
        <BtnBar>Mago</BtnBar>
        <BtnBar>Monge</BtnBar>
        <BtnBar>Paladino</BtnBar>
        <BtnBar>Patrulheiro</BtnBar>
      </ListDrop>

      <ListDrop id='dropdownSpells'>
        <Exit onClick={dropSpells} className="bi bi-x-square-fill" />
        <BtnBar onClick={truques}>Truques</BtnBar>
        <BtnBar onClick={nivel1}>Nível 1</BtnBar>
        <BtnBar onClick={nivel2}>Nível 2</BtnBar>
        <BtnBar onClick={nivel3}>Nível 3</BtnBar>
        <BtnBar onClick={nivel4}>Nível 4</BtnBar>
        <BtnBar onClick={nivel5}>Nível 5</BtnBar>
        <BtnBar onClick={nivel6}>Nível 6</BtnBar>
        <BtnBar onClick={nivel7}>Nível 7</BtnBar>
        <BtnBar onClick={nivel8}>Nível 8</BtnBar>
        <BtnBar onClick={nivel9}>Nível 9</BtnBar>
      </ListDrop>

      <ListProfile id='dropdownProfile'>
        <ButtonBar className="bi bi-box-arrow-in-right" onClick={() => navigate('/login')}> Iniciar sessão</ButtonBar>
        <ButtonBar className="bi bi-people" onClick={() => { window.location = 'https://chat.whatsapp.com/BshOjKKju9rHHj3tZIwKmC' }}> Comunidade</ButtonBar>
      </ListProfile>
    </>
  )
}