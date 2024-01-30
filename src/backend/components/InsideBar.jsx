import { ListProfile, ListBar, Menu, NavBar, ButtonBar, BtnProfile, ImageLogo } from "../../components/Globals"
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth"
import { auth } from "../../config/Firebase"
import logo from "../../assets/logo.svg"

export const InsideBar = () => {

  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => console.log('Sign Out'))
      .catch((error) => console.log(error))
  }

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
          <ButtonBar className="bi bi-file-earmark-post"> Sua ficha</ButtonBar>
          <ButtonBar className="bi bi-collection"> Biblioteca</ButtonBar>
          <ButtonBar className="bi bi-dice-6"> Dado</ButtonBar>
          <ButtonBar className="bi bi-list-nested" onClick={() => navigate('/referencias')}> Referência Rápida</ButtonBar>
          <ButtonBar className="bi bi-gear"> Configurações</ButtonBar>
        </ListBar>
        <BtnProfile onClick={dropProfile} className="bi bi-person" />
      </NavBar>

      <ListProfile id='dropdownProfile'>
        <ButtonBar className="bi bi-box-arrow-left" onClick={handleSignOut}> Fechar sessão</ButtonBar>
        <ButtonBar className="bi bi-people" onClick={() => { window.location = 'https://chat.whatsapp.com/BshOjKKju9rHHj3tZIwKmC' }}> Comunidade</ButtonBar>
      </ListProfile>
    </>
  )
}