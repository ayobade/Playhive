import { useState } from 'react'
import './App.css'
import Navbar from './Components/navbar'
import Hero from './Components/hero'
import Body from './Components/body'
import styled from 'styled-components'
import overSvg from './assets/over.svg'

const AppContainer = styled.div`
  min-height: 100vh;
  background: #0A0E12;
  background-attachment: fixed;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 80%, rgba(102, 178, 46, 0.15) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(102, 178, 46, 0.15) 0%, transparent 50%),
      radial-gradient(circle at 50% 50%, rgba(102, 178, 46, 0.1) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
  }
  
  * {
    box-sizing: border-box;
  }
`

const SvgOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url(${overSvg});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  pointer-events: none;
  z-index: 1;
  opacity: 0.3;
`

function App() {
  return (
   <AppContainer>
    <SvgOverlay />
    <Navbar />
    <Hero />
    <Body />
   </AppContainer>
  );
}

export default App
