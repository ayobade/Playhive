import React from 'react'
import styled from 'styled-components'
import div1 from '../assets/div1.png'
import div2 from '../assets/div2.png'
import div3 from '../assets/div3.png'
import div4 from '../assets/div4.png'
import div5 from '../assets/div5.png'
import game01 from '../assets/game01.png'
import game02 from '../assets/game02.png'
import game03 from '../assets/game03.png'
import game04 from '../assets/game04.png'
import game05 from '../assets/game05.png'
import game06 from '../assets/game06.png'
import game07 from '../assets/game07.png'
import game08 from '../assets/game08.png'
import game09 from '../assets/game09.png'
import game10 from '../assets/game10.png'

const BodyContainer = styled.section`
  padding: 100px 20px;
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
`

const SectionTitle = styled.h2`
  font-family: 'Orbitron', sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: #FFFFFF;
  text-align: center;
  margin: 0 auto 80px auto;
  text-transform: uppercase;
  letter-spacing: 2px;
  max-width: 700px;
 
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: 2rem;
  }
`

const BentoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 30px;
  height: 800px;
  
  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(3, 1fr);
    height: auto;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(5, 1fr);
    gap: 20px;
  }
`

const BentoCard = styled.div`
  background: #18181B50;
  border: 1px solid #333333;
  border-radius: 20px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  min-width: 350px;
  min-height: 475px;
  width: 100%;
  height: 100%;
  
  
  &:nth-child(1) {
    grid-column: span 1;
    grid-row: span 1;
  }
  
  &:nth-child(2) {
    grid-column: span 1;
    grid-row: span 1;
  }
  
  &:nth-child(3) {
    grid-column: span 1;
    grid-row: span 1;
  }
  
  &:nth-child(4) {
    grid-column: span 2;
    grid-row: span 1;
  }
  
  &:nth-child(5) {
    grid-column: span 1;
    grid-row: span 1;
  }
  
  @media (max-width: 1200px) {
    &:nth-child(4) {
      grid-column: span 1;
    }
    
    &:nth-child(5) {
      grid-column: span 1;
    }
  }
  
  @media (max-width: 768px) {
    &:nth-child(4),
    &:nth-child(5) {
      grid-column: span 1;
    }
  }
`

const CardImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 10px;
`

const CardTitle = styled.h3`
  font-family: 'Inter', sans-serif;
  font-size: 1.2rem;
  font-weight: 600;
  color: #FFFFFF;
  margin-top: 20px;
  text-align: left;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`

const CardDescription = styled.p`
  font-family: 'Roboto', sans-serif;
  font-size: 0.9rem;
  font-weight: 400;
  color: #A1A1AA;
  margin-top: 10px;
  text-align: left;
  line-height: 1.4;
  
  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`

const MajorGamesSection = styled.section`
  margin-top: 120px;
`

const MajorGamesTitle = styled.h2`
  font-family: 'Orbitron', sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: #FFFFFF;
  text-align: center;
  margin: 0 auto 60px auto;
  text-transform: uppercase;
  letter-spacing: 2px;
  max-width: 400px;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`

const GamesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 10px;
  row-gap: 30px;
  
  
  @media (max-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(4, 1fr);
  }
  
  @media (max-width: 810px) {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(5, 1fr);
  }
  
  @media (max-width: 650px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(5, 1fr);
  }
     @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(10, 1fr);
    
  }
`

const GameCard = styled.div`
  background: #18181B50;
  border: 1px solid #333333;
  border-radius: 15px;
  padding: 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 200px;
  height: 300px;
  
  &:hover {
    transform: translateY(-5px);
    border-color: #66B22E;
    box-shadow: 0 10px 30px rgba(102, 178, 46, 0.2);
  }

   @media (max-width: 480px) {
      width: 180px;
      height: 250px;
      margin: 0 auto;
    }
`

const GameImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 15px;
  padding: 0px;
`

const Body = () => {
    return (
        <BodyContainer>
            <SectionTitle>Everything you need. All in one place!</SectionTitle>
            <BentoGrid>
                <BentoCard>
                    <CardImage src={div1} alt="Tournament Hosting" />
                    <CardTitle>Tournament Hosting</CardTitle>
                    <CardDescription>Easily create, manage, and customize your own e-sports tournaments.</CardDescription>
                </BentoCard>
                <BentoCard>
                    <CardImage src={div2} alt="Compete & Win" />
                    <CardTitle>Compete & Win</CardTitle>
                    <CardDescription>Join high-stakes competitions and prove your skills.</CardDescription>
                </BentoCard>
                <BentoCard>
                    <CardImage src={div3} alt="Real Prizes & Rewards" />
                    <CardTitle>Real Prizes & Rewards</CardTitle>
                    <CardDescription>Cash prizes, exclusive rewards, and leaderboard dominance.</CardDescription>
                </BentoCard>
                <BentoCard>
                    <CardImage src={div4} alt="Play your favorite games" />
                    <CardTitle>Play your favorite games</CardTitle>
                    <CardDescription>Bring your data with our built-in integrations for accounting, revenue tools and banking.</CardDescription>
                </BentoCard>
                <BentoCard>
                    <CardImage src={div5} alt="Community & Teams" />
                    <CardTitle>Community & Teams</CardTitle>
                    <CardDescription>Connect, team up, and challenge top players worldwide.</CardDescription>
                </BentoCard>
            </BentoGrid>
            
            <MajorGamesSection>
                <MajorGamesTitle>All Major Games</MajorGamesTitle>
                <GamesGrid>
                    <GameCard>
                        <GameImage src={game01} alt="Game 1" />
                    </GameCard>
                    <GameCard>
                        <GameImage src={game02} alt="Game 2" />
                    </GameCard>
                    <GameCard>
                        <GameImage src={game03} alt="Game 3" />
                    </GameCard>
                    <GameCard>
                        <GameImage src={game04} alt="Game 4" />
                    </GameCard>
                    <GameCard>
                        <GameImage src={game05} alt="Game 5" />
                    </GameCard>
                    <GameCard>
                        <GameImage src={game06} alt="Game 6" />
                    </GameCard>
                    <GameCard>
                        <GameImage src={game07} alt="Game 7" />
                    </GameCard>
                    <GameCard>
                        <GameImage src={game08} alt="Game 8" />
                    </GameCard>
                    <GameCard>
                        <GameImage src={game09} alt="Game 9" />
                    </GameCard>
                    <GameCard>
                        <GameImage src={game10} alt="Game 10" />
                    </GameCard>
                </GamesGrid>
            </MajorGamesSection>
        </BodyContainer>
    )
}

export default Body