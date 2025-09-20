import React from 'react'
import styled from 'styled-components'
import heroImage from '../assets/hero-img.png'


const Hero = () => {
    return (
        <HeroContainer>
            <MainHeadline>
                WHERE GAMERS<br />
                COMPETE, DOMINATE,<br />
                AND WIN!
            </MainHeadline>
            
            <Description>
                The Ultimate Esports Hub For Players, Organizers, And Streamers. 
                Host Tournaments, Compete, Live Stream, And Grow Your Gaming Community—All In One Place!
            </Description>
            
            <CTAButton>Join The Hive Now</CTAButton>

            <HeroImage src={heroImage} alt="Hero Image" />
        </HeroContainer>
    )
}


const HeroContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 120px 20px 80px 20px;
  min-height: 100vh;
  max-width: 1000px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`

const MainHeadline = styled.h1`
  font-family: 'Orbitron', sans-serif;
  font-size: 3.5rem;
  font-weight: 900;
  color: #FFFFFF;
  margin: 100px 0 40px 0;
  line-height: 1.2;
  text-transform: uppercase;
  letter-spacing: 2px;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: 2rem;
  }
`

const Description = styled.p`
  font-family: 'Roboto', sans-serif;
  font-size: 1.2rem;
  font-weight: 400;
  color: #FFFFFF;
  margin: 0 0 50px 0;
  line-height: 1.6;
  max-width: 800px;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1rem;
  }
`

const CTAButton = styled.button`
  background: #5C8D30;
  color: #FFFFFF;
  border: none;
  border-radius: 25px;
  padding: 16px 32px;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #66B22E;
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(102, 178, 46, 0.4);
  }
`

const HeroImage = styled.img`
  width: 1200px;
  height: 750px;
  object-fit: cover;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  margin-top: 40px;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.02);
  }
  
  @media (max-width: 1300px) {
    width: 100%;
    height: auto;
    max-width: 1200px;
    max-height: 750px;
  }
  
  @media (max-width: 768px) {
    margin-top: 30px;
    border-radius: 15px;
  }
  
  @media (max-width: 480px) {
    margin-top: 20px;
    border-radius: 10px;
  }
`


export default Hero
