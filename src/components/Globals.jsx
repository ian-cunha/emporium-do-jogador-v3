import styled from "styled-components";

export const Loading = styled.div`
width: 100vw;
height: 100vh;
text-align: center;
display: flex;
justify-content: center;
align-items: center;
@media (max-width: 768px) {
  }
`

export const View = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
width: 100vw;
height: 100vh;
`

export const ViewPlatform = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
width: 100vw;
height: 100vh;
`

export const Box = styled.div`
display: flex;
flex-direction: column;
padding: 24px;
margin: 5px;
width: 650px;
height: 400px;
border-radius: 5px;
color: rgba(18,18,18, 0.8);
background-image: url(https://raw.githubusercontent.com/ian-cunha/EmporiumDoJogador/7dbff535447beb3d91ca6eee77696c8fc9f07a46/src/assets/paper.svg);
background-repeat: no-repeat;
@media (max-width: 768px) {
  width: 100%;
  height: auto;
  }
`

export const FlexBox = styled.div`
  margin-top: 80px;
  padding-top: 30px;
  padding-bottom: 30px;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  height: auto;
  width: 100vw;
  overflow-x: hidden;
`

export const ImageLogo = styled.img`
width: 130px;
cursor: pointer;
@media (max-width: 768px) {
  width: 130px;
  }
`

export const NavBar = styled.nav`
top: 0;
width: 100vw;
height: 80px;
display: flex;
justify-content: space-around;
align-items: center;
position: fixed;
z-index: 5;
box-shadow: 0 0.2px white;
`

export const Menu = styled.button`
border-radius: 100px;
margin: 14px;
border-style: none;
font-size: 3em;
font-weight: 600;
border-color: transparent;
background: transparent;
color: white;
display: none;
cursor: pointer;
@media (max-width: 768px) {
  display: block;
  }
`

export const ListBar = styled.div`
display: flex;
justify-content: center;
align-items: center;
@media (max-width: 768px) {
  animation: slideInDown;
  animation-duration: 1s;
  display: none;
  flex-direction: column;
  position: absolute;
  z-index: 10;
  left: 0;
  right: 0;
  top: 80px;
  padding-left: 5px;
  padding-right: 5px;
  background-color: black;
  }
`

export const ListDrop = styled.div`
animation: slideInDown;
animation-duration: 1s;
flex-direction: column;
padding: 24px;
margin-top: 80px;
background-color: #121212;
top: 0;
width: 100vw;
height: 91vh;
display: none;
justify-content: center;
align-items: flex-start;
position: fixed;
z-index: 5;
@media (max-width: 768px) {
  margin-top: 0;
  height: 100%;
  justify-content: normal;
  align-items: normal;
  overflow-y: scroll;
  overflow-x: hidden;
  background-color: #121212;
  }
`

export const ListProfile = styled.div`
animation: slideInDown;
animation-duration: 1s;
flex-direction: column;
border-radius: 5px;
margin-top: 80px;
padding: 20px;
background-color: #121212;
top: 0;
right:0;
margin-right: 55px;
display: none;
justify-content: center;
align-items: stretch;
position: fixed;
z-index: 5;
@media (max-width: 768px) {
  margin-right: 0;
}
`

export const BtnBar = styled.button`
padding: 10px 20px;
margin: 5px 5px;
cursor: pointer;
border-color: white;
background-color: #121212A6;
border-radius: 5px;
color: white;
font-weight: bold;
transition: 0.5s;
&:hover {
  color: black;
  border-color: transparent;
  background-color: white;
}
@media (max-width: 768px) {
  width: 100%;
  padding: 15px 20px;
  margin: 5px 5px;
}
`

export const BtnSubmit = styled.button`
padding: 10px 20px;
margin: 5px 5px;
cursor: pointer;
border-color: white;
background-color: #121212A6;
border-radius: 5px;
color: white;
font-weight: bold;
transition: 0.5s;
&:hover {
  color: black;
  border-color: transparent;
  background-color: white;
}
@media (max-width: 768px) {
  padding: 15px 20px;
  margin: 5px 5px;
}
`

export const BtnProfile = styled.button`
padding: 10px 12px;
margin: 0 5px;
cursor: pointer;
color: white;
font-weight: bold;
background-color: #282828;
border: 0;
border-radius: 100%;
font-size: 1em;
transition: 0.5s;
&:hover {
}
@media (max-width: 768px) {
  padding: 10px 12px;
  margin: 5px 5px;
}
`

export const Btn = styled.button`
padding: 10px 20px;
margin: 0 5px;
cursor: pointer;
border-color: white;
background-color: #121212A6;
border-radius: 5px;
color: white;
font-weight: bold;
transition: 0.5s;
&:hover {
  color: black;
  border-color: transparent;
  background-color: white;
}
`

export const DropBox = styled.button`
padding: 30px 20px;
margin: 0 5px;
background-color: transparent;
border: none;
color: white;
cursor: pointer;
&:hover {
  box-shadow: 0 2px white;
}
@media (max-width: 768px) {
  width: 100%;
  padding: 15px 20px;
  margin: 5px 5px;
}
`

export const Exit = styled.div`
cursor: pointer;
font-size: 2em;
margin: 0 5px;
&:hover {
  color: red;
}
`

export const Title = styled.h1`
margin: 10px 24px;
text-align: center;
font-size: 1.8em;
`

export const SubTitle = styled.p`
margin: 10px 20px;
text-align: center;
`

export const BioTop = styled.p`
margin: 10px 20px;
width: 60vw;
font-size: 1.2em;
text-align: center;
@media (max-width: 768px) {
  width: auto;
  margin: 10px 20px;
}
`

export const BoxHome = styled.div`
margin: 24px;
display: flex;
`

export const ItemName = styled.h2`
margin: 15px;
`

export const ItemQuick = styled.p`
display: flex;
margin: 15px;
color: rgba(18, 18, 18, 0.9);
font-weight: bold;
`

export const RefTitle = styled.h2`
text-align: center;
margin-bottom: 12px;
`

export const BlockRefs = styled.div`
display: flex;
flex-direction: column;
margin-top: 100px;
width: 100vw;
height: auto;
overflow-x: hidden;
padding: 15px;
@media (max-width: 768px) {
margin-top: 80px;
padding-bottom: 80px;
padding-top: 30px;
height: 100%;
overflow-y: scroll;
overflow-x: hidden;
}
`

export const FlexRefs = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
justify-content: flex-start;
background-image: url(https://raw.githubusercontent.com/ian-cunha/EmporiumDoJogador/7dbff535447beb3d91ca6eee77696c8fc9f07a46/src/assets/paper.svg);
background-repeat: no-repeat;
background-size: cover;
color: black;
border-radius: 3px;
@media (max-width: 768px) {
  flex-direction: column;
}
`
export const ViewAcess = styled.div`
display: flex;
flex-direction: row;
background-position: 50px;
background-image: linear-gradient(to right, rgba(18, 18, 18, .6), rgba(18, 18, 18, .6)),url(https://raw.githubusercontent.com/ian-cunha/EmporiumDoJogador/f95457bd4dc1958c7c62d41afedd894232c9c0f4/src/assets/image1.svg);
background-position: center;
background-repeat: no-repeat;
background-size: cover;
@media (max-width: 768px) {
  flex-direction: column;
}
`

export const BlockAcess = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
width: 100vw;
overflow-x: hidden;
height: 100vh;
@media (max-width: 768px) {
  flex-direction: column;
  height: 50vh;
}
`

export const FormBase = styled.form`
animation: slideInRight;
animation-duration: 1s;
display: flex;
flex-direction: column;
background: rgba(18, 18, 18, 0.8);
width: 50vw;
height: 100vh;
justify-content: center;
padding: 20%;
@media (max-width: 768px) {
  animation: slideInUp;
  animation-duration: 1s;
  flex-direction: column;
  width: 100vw;
  padding: 24px;
}
`

export const InputEvent = styled.input`
border-radius: 5px;
padding-top: 10px;
padding-bottom: 10px;
padding-left: 5px;
padding-right: 5px;
margin-top: 3px;
margin-bottom: 3px;
font-size: 1em;
font-weight: bold;
@media (max-width: 768px) {
}
`

export const ChangeLegend = styled.button`
background: transparent;
color: white;
border: none;
margin-top: 10px;
margin-bottom: 10px;
cursor: pointer;
@media (max-width: 768px) {
}
`

export const Legend = styled.legend`
color: white;
text-align: center;
font-weight: bold;
font-size: 1.5em;
margin-top: 10px;
margin-bottom: 10px;
@media (max-width: 768px) {
}
`

export const TitleAcess = styled.h2`
font-size: 3em;
text-align: center;
margin: 15px;
@media (max-width: 768px) {
}
`

export const SubTitleAcess = styled.h3`
font-size: 1em;
text-align: center;
font-weight: 500;
margin: 15px;
@media (max-width: 768px) {
}
`

export const TitleBox = styled.h2`
font-weight: 900;
margin-bottom: 2px;
margin-top: 2px;
@media (max-width: 768px) {
}
`

export const SubBox = styled.h3`
font-weight: 600;
margin-bottom: 2px;
margin-top: 2px;
@media (max-width: 768px) {
}
`

export const InfoBox = styled.p`
font-weight: 500;
margin-bottom: 2px;
margin-top: 2px;
@media (max-width: 768px) {
}
`