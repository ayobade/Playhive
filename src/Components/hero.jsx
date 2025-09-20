import React from 'react'
import styled from 'styled-components'
import heroImage from '../assets/hero-img.png'
import tournamentLogo1 from '../assets/featured1.png'
import tournamentLogo2 from '../assets/featured2.png'
import tournamentLogo3 from '../assets/featured3.png'
import tournamentLogo4 from '../assets/featured4.png'



const Hero = () => {
    return (
        <>
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
        
        <FeaturedSection>
            <SectionTitle>Featured Tournaments</SectionTitle>
            <TournamentLogos>
                <TournamentLogo>
                    <img src={tournamentLogo1} alt="ePremier League" />
                </TournamentLogo>
                <TournamentLogo>
                    <img src={tournamentLogo2} alt="NHL 23 World Championship" />
                </TournamentLogo>
                <TournamentLogo>
                    <img src={tournamentLogo1} alt="ePremier League" />
                </TournamentLogo>
                <TournamentLogo>
                    <img src={tournamentLogo3} alt="ZOTAC CUP" />
                </TournamentLogo>
                <TournamentLogo>
                    <img src={tournamentLogo1} alt="ePremier League" />
                </TournamentLogo>
                <TournamentLogo>
                    <img src={tournamentLogo4} alt="APEX LEGENDS Global Series" />
                </TournamentLogo>
            </TournamentLogos>
        </FeaturedSection>
        </>
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
    margin-top: 20px;
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

const FeaturedSection = styled.section`
  width: 100%;
  padding: 80px 20px;
  
  margin-top: 60px;
  position: relative;
  z-index: 1;
`

const SectionTitle = styled.h2`
  font-family: 'Orbitron', sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: #FFFFFF;
  text-align: center;
  margin-bottom: 60px;
  text-transform: uppercase;
  letter-spacing: 2px;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`

const TournamentLogos = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
  flex-wrap: wrap;
  max-width: 1400px;
  margin: 0 auto;
  
  @media (max-width: 1200px) {
    gap: 30px;
  }
  
  @media (max-width: 768px) {
    gap: 20px;
  }
`

const TournamentLogo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 88px;
  min-width: 120px;
  background: transparent;
  border-radius: 12px;
  padding: 15px 20px;
  transition: all 0.3s ease;
  cursor: pointer;
  
  img {
    max-height: 88px;
    max-width: 120px;
    object-fit: contain;
    filter: brightness(0) invert(1);
    transition: all 0.3s ease;
  }
  
  &:hover {
    transform: translateY(-5px);
  }
  
  @media (max-width: 768px) {
    height: 60px;
    min-width: 100px;
    padding: 10px 15px;
    
    img {
      max-height: 40px;
      max-width: 100px;
    }
  }
`




export default Hero
