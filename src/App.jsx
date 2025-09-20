import { useState } from 'react'
import './App.css'
import Navbar from './Components/navbar'
import Hero from './Components/hero'
import styled from 'styled-components'

const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #121212 0%, #0F0F0F 50%, #121212 100%);
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
      radial-gradient(circle at 20% 80%, rgba(102, 178, 46, 0.03) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(102, 178, 46, 0.03) 0%, transparent 50%),
      linear-gradient(45deg, transparent 30%, rgba(102, 178, 46, 0.01) 50%, transparent 70%);
    pointer-events: none;
  }
  
  * {
    box-sizing: border-box;
  }
`

function App() {
  return (
   <AppContainer>
    <Navbar />
    <Hero />
   </AppContainer>
  );
}

export default App
