import React from 'react'
import styled from 'styled-components'

const Card = styled.div`
  background: rgba(24, 24, 27, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  cursor: pointer;
  max-width: 360px;
  flex: 1 1 calc((100% - 48px) / 3);
  min-width: 280px;
  
  &:hover {
    transform: translateY(-5px);
    border-color: #66B22E;
    box-shadow: 0 10px 30px rgba(102, 178, 46, 0.2);
  }
  
  &::after {
    content: '';
    position: absolute;
    left: 50%;
    top: 55%;
    transform: translate(-50%, -50%);
    width: 140%;
    height: 160%;
    pointer-events: none;
    background: radial-gradient(50% 50% at 50% 50%, rgba(75, 93, 54, 0.5) 0%, rgba(75, 93, 54, 0.25) 40%, rgba(75, 93, 54, 0.0) 70%);
    filter: blur(40px);
    mix-blend-mode: screen;
    z-index: 0;
  }
  
  @media (max-width: 640px) {
    max-width: 100%;
    min-width: 100%;
    flex: 1 1 100%;
  }
`

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  overflow: visible;
  z-index: 1;
`

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  position: relative;
  z-index: 1;
`

const RegistrationBadge = styled.div`
  position: absolute;
  bottom: -14px;
  left: 16px;
  background: #18181B;
  border-radius: 20px;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #FFFFFF;
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  z-index: 10;
  
  &::before {
    content: '';
    width: 8px;
    height: 8px;
    background: #00AA06;
    border-radius: 50%;
  }
`

const Body = styled.div`
  padding: 20px;
  padding-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: relative;
  z-index: 1;
`

const Title = styled.h3`
  font-family: 'Orbitron', sans-serif;
  font-size: 1.3rem;
  font-weight: 700;
  color: #FFFFFF;
  margin: 0;
  line-height: 1.3;
`

const Text = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  color: #A1A1AA;
  margin: 0;
`

const Footer = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`

const Chip = styled.div`
  background: rgba(24, 24, 27, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 6px 12px;
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  font-weight: 500;
  color: #FFFFFF;
`

const TeamProgress = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

const TeamAvatars = styled.div`
  display: flex;
  gap: -8px;
  
  .avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: #2E3440;
    border: 2px solid #18181B;
    margin-left: -8px;
    
    &:first-child {
      margin-left: 0;
    }
  }
`

const TeamCount = styled.span`
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  color: #A1A1AA;
`

const TournamentCard = ({ image, title, matchType, date, prizePoolValue, entry, gameType, teams }) => {
  const prizeLabel = prizePoolValue >= 1000 ? `${(prizePoolValue / 1000).toFixed(0)}K` : prizePoolValue
  return (
    <Card>
      <ImageContainer>
        <Img src={image} alt={title} />
        <RegistrationBadge>Registration Ongoing</RegistrationBadge>
      </ImageContainer>
      <Body>
        <Title>{title}</Title>
        {matchType ? <Text>{matchType}</Text> : null}
        {date ? <Text>{date}</Text> : null}
        {teams ? (
          <TeamProgress>
            <TeamAvatars>
              <div className="avatar" />
              <div className="avatar" />
              <div className="avatar" />
            </TeamAvatars>
            <TeamCount>{teams.current}/{teams.total} Teams</TeamCount>
          </TeamProgress>
        ) : null}
        <Footer>
          {typeof prizePoolValue !== 'undefined' && <Chip>Prize Pool: ${prizeLabel}</Chip>}
          {entry ? <Chip>{entry}</Chip> : null}
          {gameType ? <Chip>{gameType}</Chip> : null}
        </Footer>
      </Body>
    </Card>
  )
}

export default TournamentCard


