import { ListProfile, ListBar, Menu, NavBar, DropBox, BtnProfile, ImageLogo, ButtonBar } from "./Globals"
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

  function dropProfile() {
    var dropUser = document.getElementById('dropdownProfile')
    if (dropUser.style.display === 'flex') {
      dropUser.style.display = 'none'
    } else {
      dropUser.style.display = 'flex'
    }
  }

  return (
    <>
      <NavBar>
        <Menu className="bi bi-list" onClick={dotBar}></Menu>
        <ImageLogo onClick={() => navigate('/')} src={logo} />
        <ListBar id="nav">
          <DropBox>Raças</DropBox>
          <DropBox>Classes</DropBox>
          <DropBox onClick={() => navigate('/magias')}>Mágias</DropBox>
          <ButtonBar className="bi bi-list-nested" onClick={() => navigate('/referencias')}> Referência Rápida</ButtonBar>
        </ListBar>
        <BtnProfile onClick={dropProfile} className="bi bi-person" />
      </NavBar>

      <ListProfile id='dropdownProfile'>
        <ButtonBar className="bi bi-box-arrow-in-right" onClick={() => navigate('/login')}> Iniciar sessão</ButtonBar>
        <ButtonBar className="bi bi-people" onClick={() => { window.location = 'https://chat.whatsapp.com/BshOjKKju9rHHj3tZIwKmC' }}> Comunidade</ButtonBar>
      </ListProfile>
    </>
  )
}