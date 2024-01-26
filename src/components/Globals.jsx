import styled from "styled-components";

export const View = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
width: 100vw;
height: 100vh;
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
margin: 10px 20px;
text-align: center;
font-size: 1.8em;
`

export const SubTitle = styled.p`
margin: 10px 20px;
text-align: center;
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
background: white;
color: black;
border-radius: 3px;
@media (max-width: 768px) {
  flex-direction: column;
  align-items: center;
}
`
