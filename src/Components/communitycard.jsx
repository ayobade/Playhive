import React from 'react'
import styled from 'styled-components'
import gamepadIcon from '../assets/Gamepad.svg'
import membersIcon from '../assets/Members.svg'

const CommunityCardContainer = styled.div`
  background: rgba(24, 24, 27, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 20px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 16px;
  position: relative;
  transition: all 0.3s ease;
  cursor: pointer;
  max-width: 615px;
  width: 100%;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 140%;
    height: 160%;
    pointer-events: none;
    background: radial-gradient(50% 50% at 50% 50%, rgba(75, 93, 54, 0.5) 0%, rgba(75, 93, 54, 0.25) 40%, rgba(75, 93, 54, 0.0) 70%);
    filter: blur(40px);
    mix-blend-mode: screen;
    z-index: 0;
  }
  
  &:hover {
    transform: translateY(-3px);
    border-color: #66B22E;
    box-shadow: 0 8px 24px rgba(102, 178, 46, 0.2);
  }
`

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
  position: relative;
  z-index: 1;
`

const CommunityLogo = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: ${props => props.$bgColor || '#FFFFFF'};
  border: ${props => props.$borderColor ? `2px solid ${props.$borderColor}` : 'none'};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const LogoText = styled.div`
  color: ${props => props.$bgColor === '#FFFFFF' ? '#000000' : '#FFFFFF'};
  font-family: 'Inter', sans-serif;
  font-size: 8px;
  font-weight: 600;
  text-align: center;
  line-height: 1.2;
  padding: 4px;
`

const CardTitle = styled.h3`
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  color: #FFFFFF;
  margin: 0;
  line-height: 1.3;
`

const ArrowIcon = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  
  svg {
    width: 24px;
    height: 24px;
    stroke: #FFFFFF;
  }
`

const CardDetails = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
`

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  color: #FFFFFF;
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  font-weight: 500;
  
  img {
    width: 40px;
    height: 40px;
    flex-shrink: 0;
  }
`

const CommunityCard = ({ logo, logoText, logoBgColor, logoBorderColor, title, game, members }) => {
    return (
        <CommunityCardContainer>
            <CommunityLogo $bgColor={logoBgColor} $borderColor={logoBorderColor}>
                {logo ? (
                    <img src={logo} alt={title} />
                ) : (
                    <LogoText $bgColor={logoBgColor}>{logoText}</LogoText>
                )}
            </CommunityLogo>
            <CardContent>
                <CardTitle>{title}</CardTitle>
                <CardDetails>
                    <DetailItem>
                        <img src={gamepadIcon} alt="Game" />
                        {game}
                    </DetailItem>
                    <DetailItem>
                        <img src={membersIcon} alt="Members" />
                        {members}
                    </DetailItem>
                </CardDetails>
            </CardContent>
            <ArrowIcon>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17L17 7M17 7H7M17 7V17"/>
                </svg>
            </ArrowIcon>
        </CommunityCardContainer>
    )
}

export default CommunityCard

