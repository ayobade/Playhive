import React, { useEffect, useRef, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import div1 from '../assets/Div1.png'
import div2 from '../assets/Div2.png'
import div3 from '../assets/Div3.png'
import div4 from '../assets/Div4.png'
import div5 from '../assets/Div5.png'
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
import tournament01 from '../assets/tournament01.png'
import tournament02 from '../assets/tournament02.png'
import live01 from '../assets/live01.png'
import live02 from '../assets/live02.png'
import live03 from '../assets/live03.png'
import Footer from './footer'
import LivestreamCard from './livestreamcard'

// Animation keyframes
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const fadeInScale = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

// Custom hook for Intersection Observer
const useIntersectionObserver = (ref, options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsIntersecting(true)
        observer.disconnect()
      }
    }, { threshold: 0.1, ...options })

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [ref, options])

  return isIntersecting
}

const BodyContainer = styled.section`
  padding: 100px 20px;
  max-width: 1200px;
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
  opacity: ${props => props.$visible ? 1 : 0};
  animation: ${props => props.$visible ? fadeInUp : 'none'} 0.8s ease-out;
 
  
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
  height: 100%;
  
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
  opacity: ${props => props.$visible ? 1 : 0};
  animation: ${props => props.$visible ? fadeInScale : 'none'} 0.6s ease-out both;
  animation-delay: ${props => props.$delay || 0}s;
  
  
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
  margin-top: 200px;
`

const LiveSection = styled.section`
  margin-top: 120px;
`

const LiveTitle = styled.h2`
  font-family: 'Orbitron', sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: #FFFFFF;
  text-align: center;
  margin: 60px auto 40px auto;
  text-transform: uppercase;
  letter-spacing: 2px;
  max-width: 700px;
  opacity: ${props => props.$visible ? 1 : 0};
  animation: ${props => props.$visible ? fadeInUp : 'none'} 0.8s ease-out;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`

const LiveGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  align-items: stretch;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`

const LiveCardWrapper = styled.div`
  opacity: ${props => props.$visible ? 1 : 0};
  animation: ${props => props.$visible ? fadeInScale : 'none'} 0.6s ease-out both;
  animation-delay: ${props => props.$delay || 0}s;
`


const ClientsSection = styled.section`
  margin-top: 120px;
`

const ClientsTitle = styled.h2`
  font-family: 'Orbitron', sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: #FFFFFF;
  text-align: center;
  margin: 60px auto 40px auto;
  text-transform: uppercase;
  letter-spacing: 2px;
  max-width: 800px;
  opacity: ${props => props.$visible ? 1 : 0};
  animation: ${props => props.$visible ? fadeInUp : 'none'} 0.8s ease-out;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`

const ClientsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  align-items: stretch;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`

const ClientCard = styled.div`
  background: rgba(24, 24, 27, 0.5);
  border: 1px solid #333333;
  border-radius: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  opacity: ${props => props.$visible ? 1 : 0};
  animation: ${props => props.$visible ? fadeInScale : 'none'} 0.6s ease-out both;
  animation-delay: ${props => props.$delay || 0}s;
  
  &:hover {
    transform: translateY(-5px);
    border-color: #66B22E;
    box-shadow: 0 10px 30px rgba(102, 178, 46, 0.2);
  }
  
  &::after {
    content: '';
    position: absolute;
    left: 50%;
    top: 70%;
    transform: translate(-50%, -50%);
    width: 180%;
    height: 140%;
    pointer-events: none;
    background: radial-gradient(50% 50% at 50% 50%, rgba(75, 93, 54, 0.35) 0%, rgba(75, 93, 54, 0.18) 40%, rgba(75, 93, 54, 0.0) 70%);
    filter: blur(50px);
    mix-blend-mode: screen;
  }
`

const ClientHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

const ClientAvatar = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #2E3440;
`

const ClientMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

const ClientName = styled.div`
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  color: #FFFFFF;
  font-size: 1rem;
`

const ClientRole = styled.div`
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  color: #A1A1AA;
  font-size: 0.9rem;
`

const Stars = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: #FBBF24;
`

const Quote = styled.p`
  margin: 0;
  color: #D4D4D8;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  line-height: 1.6;
  font-size: 0.98rem;
`

const FaqSection = styled.section`
  margin-top: 140px;
`

const FaqCard = styled.div`
  background: linear-gradient(180deg, rgba(18, 18, 20, 0.85) 0%, rgba(18, 18, 20, 0.75) 100%);
  border: 1px solid #333333;
  border-radius: 18px;
  padding: 60px 60px;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  overflow: hidden;
  isolation: isolate;
  opacity: ${props => props.$visible ? 1 : 0};
  animation: ${props => props.$visible ? fadeInScale : 'none'} 0.8s ease-out;

  &::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 55%;
    transform: translate(-50%, -50%);
    width: 120%;
    height: 260%;
    pointer-events: none;
    background: radial-gradient(50% 50% at 50% 50%, rgba(75, 93, 54, 0.2) 0%, rgba(75, 93, 54, 0.1) 40%, rgba(75, 93, 54, 0.0) 70%);
    filter: blur(60px);
    z-index: 0;
    mix-blend-mode: screen;
  }

  > * {
    position: relative;
    z-index: 1;
  }
`

const FaqTitle = styled.h2`
  font-family: 'Orbitron', sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: #FFFFFF;
  margin: 0 0 12px 0;
`

const FaqIntro = styled.p`
  margin: 0 0 28px 0;
  color: #A1A1AA;
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
`

const FaqItem = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  padding: 18px 0;
`

const FaqQuestion = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  color: #D4D4D8;
  font-family: 'Orbitron', sans-serif;
  font-size: 1.05rem;
  font-weight: 700;
  background: transparent;
  border: none;
  padding: 0;
  text-align: left;
  cursor: pointer;
`

const FaqIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 6px;
  background: #151A1F;
  color: #FFFFFF;
  font-weight: 900;
  line-height: 1;
`

const FaqAnswer = styled.div`
  margin-top: 12px;
  color: #C7C7CC;
  font-family: 'Inter', sans-serif;
  line-height: 1.7;
  font-size: 0.98rem;
`

const NewsletterSection = styled.section`
  margin-top: 140px;
`

const NewsletterCard = styled.div`
  background: linear-gradient(180deg, rgba(18, 18, 20, 0.85) 0%, rgba(18, 18, 20, 0.75) 100%);
  border: 1px solid #333333;
  border-radius: 24px;
  padding: 60px 40px;
  max-width: 1200px;
  height: 400px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  position: relative;
  overflow: hidden;
  isolation: isolate;
  opacity: ${props => props.$visible ? 1 : 0};
  animation: ${props => props.$visible ? fadeInScale : 'none'} 0.8s ease-out;

  &::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 55%;
    transform: translate(-50%, -50%);
    width: 120%;
    height: 260%;
    pointer-events: none;
    background: radial-gradient(50% 50% at 50% 50%, rgba(75, 93, 54, 0.2) 0%, rgba(75, 93, 54, 0.1) 40%, rgba(75, 93, 54, 0.0) 70%);
    filter: blur(60px);
    z-index: 0;
    mix-blend-mode: screen;
  }

  > * { 
    position: relative;
    z-index: 1;
  }
`

const NewsletterTitle = styled.h2`
  font-family: 'Orbitron', sans-serif;
  font-size: 2.6rem;
  font-weight: 700;
  color: #FFFFFF;
  margin: 0 0 24px 0;
  @media (max-width: 640px) {
    font-size: 2rem;
  }
`

const NewsletterForm = styled.form`
  display: flex;
  justify-content: center;
`

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  background: #FFFFFF;
  border-radius: 9999px;
  padding: 6px;
  gap: 8px;
  width: 560px;
  max-width: 100%;
  margin: 0 auto;
`

const EmailInput = styled.input`
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: #0F172A;
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  padding: 12px 14px 12px 18px;
  &::placeholder {
    color: #64748B;
  }
`

const SubscribeButton = styled.button`
  background: #5C8D30;
  color: #FFFFFF;
  border: none;
  border-radius: 9999px;
  padding: 12px 20px;
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover {
    background: #66B22E;
    transform: translateY(-1px);
  }
`

const MajorGamesTitle = styled.h2`
  font-family: 'Orbitron', sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: #FFFFFF;
  text-align: center;
  margin: 60px auto 60px auto;
  text-transform: uppercase;
  letter-spacing: 2px;
  max-width: 400px;
  opacity: ${props => props.$visible ? 1 : 0};
  animation: ${props => props.$visible ? fadeInUp : 'none'} 0.8s ease-out;
  
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
    grid-template-rows: repeat(3, 1fr);
  }
  
  @media (max-width: 810px) {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(4, 1fr);
  }
  
  @media (max-width: 650px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(4, 1fr);
  }
     @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(5, 1fr);
    
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
  opacity: ${props => props.$visible ? 1 : 0};
  animation: ${props => props.$visible ? fadeInScale : 'none'} 0.5s ease-out both;
  animation-delay: ${props => props.$delay || 0}s;
  
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

const UpcomingTournamentsSection = styled.section`
  margin-top: 120px;
  width: 100%;
  position: relative;
  z-index: 2;
`

const UpcomingTournamentsTitle = styled.h2`
  font-family: 'Orbitron', sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: #FFFFFF;
  text-align: center;
  margin: 60px auto 60px auto;
  text-transform: uppercase;
  letter-spacing: 2px;
  max-width: 500px;
  opacity: ${props => props.$visible ? 1 : 0};
  animation: ${props => props.$visible ? fadeInUp : 'none'} 0.8s ease-out;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`

const TournamentsContainer = styled.div`
  display: flex;
  gap: 30px;
  justify-content: center;
  align-items: stretch;
  margin-bottom: 40px;
  max-width: 1200px;
  width: 100%;
  flex-wrap: wrap;
  margin-left: auto;
  margin-right: auto;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }
`

const TournamentCard = styled.div`
  background: #18181B50;
  border: 1px solid #333333;
  border-radius: 20px;
  padding: 0;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  flex: 1 1 0;
  min-width: 320px;
  aspect-ratio: 16 / 9;
  transition: all 0.3s ease;
  cursor: pointer;
  opacity: ${props => props.$visible ? 1 : 0};
  animation: ${props => props.$visible ? fadeInScale : 'none'} 0.6s ease-out both;
  animation-delay: ${props => props.$delay || 0}s;
  
  &:hover {
    transform: translateY(-5px);
    border-color: #66B22E;
    box-shadow: 0 10px 30px rgba(102, 178, 46, 0.2);
  }
  
  @media (max-width: 768px) {
    min-width: 100%;
  }

  @media (max-width: 600px) {
    width: 100%;
    min-width: 0;
    display: block;
    flex: none;
  }
`

const TournamentImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 20px;
`

const TournamentOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.3) 100%);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
`

const TournamentBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
`

const RegistrationBadge = styled.div`
  background: #151A1F;
  color: #FFFFFF;
  padding: 8px 16px;
  border-radius: 20px;
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  width: fit-content;
  
  &::before {
    content: '';
    width: 6px;
    height: 6px;
    background: #00AA06;
    border-radius: 50%;
  }
`

const TournamentInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const TournamentTitle = styled.h3`
  font-family: 'Orbitron', sans-serif;
  font-size: 1.8rem;
  font-weight: 700;
  color: #FFFFFF;
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`

const TournamentSubtitle = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  font-weight: 400;
  color: #A1A1AA;
  margin: 0;
`

const JoinButton = styled.button`
  background: #5C8D30;
  color: #FFFFFF;
  border: none;
  border-radius: 25px;
  padding: 12px 24px;
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  width: fit-content;
  
  &:hover {
    background: #66B22E;
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(102, 178, 46, 0.3);
  }
`

const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 40px;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  gap: auto;

`

const PaginationDashes = styled.div`
  display: flex;
  gap: 8px;
`

const PaginationDash = styled.div`
  width: 24px;
  height: 4px;
  border-radius: 2px;
  background: ${props => props.active ? '#66B22E' : '#5C8D30'};
  transition: all 0.3s ease;

`



const NavigationButtons = styled.div`
  display: flex;
  gap: 8px;
`

const NavigationButton = styled.button`
  background: ${props => props.active ? '#66B22E' : '#5C8D30'};
  border: none;
  border-radius: 6px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${props => props.active ? 'pointer' : 'not-allowed'};
  transition: all 0.3s ease;
  opacity: ${props => props.active ? '1' : '0.6'};
  
  &:hover {
    background: ${props => props.active ? '#66B22E' : '#5C8D30'};
    transform: ${props => props.active ? 'scale(1.05)' : 'none'};
  }
  
  svg {
    width: 16px;
    height: 16px;
    fill: ${props => props.active ? '#FFFFFF' : '#CCCCCC'};
  }
`

const Body = () => {
    const [openFaq, setOpenFaq] = React.useState(0)
    
    // Refs for intersection observers
    const bentoSectionRef = useRef(null)
    const gamesSectionRef = useRef(null)
    const tournamentsSectionRef = useRef(null)
    const liveSectionRef = useRef(null)
    const clientsSectionRef = useRef(null)
    const faqSectionRef = useRef(null)
    const newsletterSectionRef = useRef(null)
    
    // Intersection observers
    const isBentoVisible = useIntersectionObserver(bentoSectionRef, { threshold: 0.1 })
    const isGamesVisible = useIntersectionObserver(gamesSectionRef, { threshold: 0.1 })
    const isTournamentsVisible = useIntersectionObserver(tournamentsSectionRef, { threshold: 0.1 })
    const isLiveVisible = useIntersectionObserver(liveSectionRef, { threshold: 0.1 })
    const isClientsVisible = useIntersectionObserver(clientsSectionRef, { threshold: 0.1 })
    const isFaqVisible = useIntersectionObserver(faqSectionRef, { threshold: 0.1 })
    const isNewsletterVisible = useIntersectionObserver(newsletterSectionRef, { threshold: 0.1 })
    
    const faqs = [
        {
            q: 'What is PlayHive?',
            a: `PlayHive is an all-in-one platform where gamers can join thrilling tournaments, and organizers can host and manage e-sports events with ease. Whether you’re competing for fun or running professional brackets, PlayHive provides tools to connect players, manage scores, and track results seamlessly.`
        },
        { q: 'How do I sign up?', a: 'Click the Sign Up button, create your profile, and verify your email to get started.' },
        { q: 'Can I customize tournament rules?', a: 'Yes, organizers can configure match formats, scoring, schedules, and eligibility from the tournament dashboard.' },
        { q: 'Does PlayHive support team-based tournaments?', a: 'Absolutely. Create teams, assign roles, and manage rosters effortlessly.' },
        { q: 'Can I earn money from tournaments?', a: 'Yes, many tournaments have prize pools and rewards. Check the tournament details for payouts.' },
        { q: 'What payment methods are supported?', a: 'We support major cards and common digital payment methods depending on region.' },
        { q: 'I’m new to PlayHive. What steps should I follow to get started?', a: 'Create an account, explore active tournaments, and join a match or create your own event.' },
        { q: 'Can I use PlayHive to organize tournaments for games that aren’t traditionally considered e-sports titles?', a: 'Yes. You can host events for a wide variety of games, casual or competitive.' },
        { q: 'What happens if I sign up for a tournament but can’t participate on the day of the event?', a: 'You can withdraw before the check-in window. After check-in, contact support or the organizer.' }
    ]

    return (
        <BodyContainer>
            <div ref={bentoSectionRef}>
                <SectionTitle $visible={isBentoVisible}>Everything you need. All in one place!</SectionTitle>
                <BentoGrid>
                    <BentoCard $visible={isBentoVisible} $delay={0}>
                        <CardImage src={div1} alt="Tournament Hosting" />
                        <CardTitle>Tournament Hosting</CardTitle>
                        <CardDescription>Easily create, manage, and customize your own e-sports tournaments.</CardDescription>
                    </BentoCard>
                    <BentoCard $visible={isBentoVisible} $delay={0.1}>
                        <CardImage src={div2} alt="Compete & Win" />
                        <CardTitle>Compete & Win</CardTitle>
                        <CardDescription>Join high-stakes competitions and prove your skills.</CardDescription>
                    </BentoCard>
                    <BentoCard $visible={isBentoVisible} $delay={0.2}>
                        <CardImage src={div3} alt="Real Prizes & Rewards" />
                        <CardTitle>Real Prizes & Rewards</CardTitle>
                        <CardDescription>Cash prizes, exclusive rewards, and leaderboard dominance.</CardDescription>
                    </BentoCard>
                    <BentoCard $visible={isBentoVisible} $delay={0.3}>
                        <CardImage src={div4} alt="Play your favorite games" />
                        <CardTitle>Play your favorite games</CardTitle>
                        <CardDescription>Bring your data with our built-in integrations for accounting, revenue tools and banking.</CardDescription>
                    </BentoCard>
                    <BentoCard $visible={isBentoVisible} $delay={0.4}>
                        <CardImage src={div5} alt="Community & Teams" />
                        <CardTitle>Community & Teams</CardTitle>
                        <CardDescription>Connect, team up, and challenge top players worldwide.</CardDescription>
                    </BentoCard>
                </BentoGrid>
            </div>
            
            <MajorGamesSection ref={gamesSectionRef}>
                <MajorGamesTitle $visible={isGamesVisible}>All Major Games</MajorGamesTitle>
                <GamesGrid>
                    {[game01, game02, game03, game04, game05, game06, game07, game08, game09, game10].map((game, index) => (
                        <GameCard key={index} $visible={isGamesVisible} $delay={index * 0.05}>
                            <GameImage src={game} alt={`Game ${index + 1}`} />
                        </GameCard>
                    ))}
                </GamesGrid>
            </MajorGamesSection>
            
<UpcomingTournamentsSection ref={tournamentsSectionRef}>
                <UpcomingTournamentsTitle $visible={isTournamentsVisible}>Upcoming Tournaments</UpcomingTournamentsTitle>
                <TournamentsContainer>
                    <TournamentCard $visible={isTournamentsVisible} $delay={0}>
                        <TournamentImage src={tournament01} alt="Call of Duty Tournament" />
                        <TournamentOverlay>
                            <RegistrationBadge>Registration Ongoing</RegistrationBadge>
                            <TournamentBottom>
                                <TournamentInfo>
                                    <TournamentTitle>CALL OF DUTY</TournamentTitle>
                                    <TournamentSubtitle>Modern Warfare II</TournamentSubtitle>
                                </TournamentInfo>
                                <JoinButton>Join Tournament</JoinButton>
                            </TournamentBottom>
                        </TournamentOverlay>
                    </TournamentCard>
                    <TournamentCard $visible={isTournamentsVisible} $delay={0.2}>
                        <TournamentImage src={tournament02} alt="Valorant Tournament" />
                        <TournamentOverlay>
                            <RegistrationBadge>Registration Ongoing</RegistrationBadge>
                            <TournamentBottom>
                                <TournamentInfo>
                                    <TournamentTitle>VALORANT</TournamentTitle>
                                    <TournamentSubtitle>Masters Champions</TournamentSubtitle>
                                </TournamentInfo>
                                <JoinButton>Join Tournament</JoinButton>
                            </TournamentBottom>
                        </TournamentOverlay>
                    </TournamentCard>
                </TournamentsContainer>
                <PaginationContainer>
                    <PaginationDashes>
                        <PaginationDash active />
                        <PaginationDash />
                        <PaginationDash />
                        <PaginationDash />
                        <PaginationDash />
                    </PaginationDashes>
                    <NavigationButtons>
                        <NavigationButton>
                            <svg viewBox="0 0 24 24">
                                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                            </svg>
                        </NavigationButton>
                        <NavigationButton active>
                            <svg viewBox="0 0 24 24">
                                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                            </svg>
                        </NavigationButton>
                    </NavigationButtons>
                </PaginationContainer>
            </UpcomingTournamentsSection>

            <LiveSection ref={liveSectionRef}>
                <LiveTitle $visible={isLiveVisible}>Watch Live Streams</LiveTitle>
                <LiveGrid>
                    <LiveCardWrapper $visible={isLiveVisible} $delay={0}>
                        <LivestreamCard 
                            thumbnail={live01}
                            alt="FC25 stream"
                            streamer="Bobby Swagger"
                            title="FC25 – FC Pro Open match week 5 Reimagined"
                            viewers="10,000"
                        />
                    </LiveCardWrapper>
                    <LiveCardWrapper $visible={isLiveVisible} $delay={0.15}>
                        <LivestreamCard 
                            thumbnail={live02}
                            alt="Call of Duty stream"
                            streamer="Bobby Swagger"
                            title="Call of Duty – Mordern Warfare Reimagined"
                            viewers="10,000"
                        />
                    </LiveCardWrapper>
                    <LiveCardWrapper $visible={isLiveVisible} $delay={0.3}>
                        <LivestreamCard 
                            thumbnail={live03}
                            alt="Apex stream"
                            streamer="Bobby Swagger"
                            title="FC25 – FC Pro Open match week 5 Reimagined"
                            viewers="10,000"
                        />
                    </LiveCardWrapper>
                </LiveGrid>
                <PaginationContainer>
                    <PaginationDashes>
                        <PaginationDash active />
                        <PaginationDash />
                        <PaginationDash />
                        <PaginationDash />
                        <PaginationDash />
                    </PaginationDashes>
                    <NavigationButtons>
                        <NavigationButton>
                            <svg viewBox="0 0 24 24">
                                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                            </svg>
                        </NavigationButton>
                        <NavigationButton active>
                            <svg viewBox="0 0 24 24">
                                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                            </svg>
                        </NavigationButton>
                    </NavigationButtons>
                </PaginationContainer>
            </LiveSection>
            
            <ClientsSection ref={clientsSectionRef}>
                <ClientsTitle $visible={isClientsVisible}>Our Clients Experience</ClientsTitle>
                <ClientsGrid>
                    <ClientCard $visible={isClientsVisible} $delay={0}>
                        <ClientHeader>
                            <ClientAvatar />
                            <ClientMeta>
                                <ClientName>Alex Turner</ClientName>
                                <ClientRole>Esports Team Manager</ClientRole>
                            </ClientMeta>
                        </ClientHeader>
                        <Stars>
                            ★ ★ ★ ★ ★
                        </Stars>
                        <Quote>
                            Playhive has transformed how we organize tournaments. The tools are intuitive and the experience is seamless for our players and viewers.
                        </Quote>
                    </ClientCard>
                    <ClientCard $visible={isClientsVisible} $delay={0.15}>
                        <ClientHeader>
                            <ClientAvatar />
                            <ClientMeta>
                                <ClientName>Sophia Lee</ClientName>
                                <ClientRole>Content Creator</ClientRole>
                            </ClientMeta>
                        </ClientHeader>
                        <Stars>
                            ★ ★ ★ ★ ★
                        </Stars>
                        <Quote>
                            The live streaming integration and community features are top-notch. My audience engagement has never been better.
                        </Quote>
                    </ClientCard>
                    <ClientCard $visible={isClientsVisible} $delay={0.3}>
                        <ClientHeader>
                            <ClientAvatar />
                            <ClientMeta>
                                <ClientName>Marcus Johnson</ClientName>
                                <ClientRole>Pro Gamer</ClientRole>
                            </ClientMeta>
                        </ClientHeader>
                        <Stars>
                            ★ ★ ★ ★ ★
                        </Stars>
                        <Quote>
                            Smooth tournaments, fair matchmaking, and real rewards. Playhive delivers exactly what competitive gamers need.
                        </Quote>
                    </ClientCard>
                </ClientsGrid>
                <PaginationContainer>
                    <PaginationDashes>
                        <PaginationDash active />
                        <PaginationDash />
                        <PaginationDash />
                        <PaginationDash />
                        <PaginationDash />
                    </PaginationDashes>
                    <NavigationButtons>
                        <NavigationButton>
                            <svg viewBox="0 0 24 24">
                                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                            </svg>
                        </NavigationButton>
                        <NavigationButton active>
                            <svg viewBox="0 0 24 24">
                                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                            </svg>
                        </NavigationButton>
                    </NavigationButtons>
                </PaginationContainer>
            </ClientsSection>
            
            <FaqSection ref={faqSectionRef}>
                <FaqCard $visible={isFaqVisible}>
                    <FaqTitle>FAQ's</FaqTitle>
                    <FaqIntro>Explore our FAQ to get all the buzz about PlayHive – from hosting tournaments to joining the action!</FaqIntro>
                    {faqs.map((item, idx) => (
                        <FaqItem key={idx}>
                            <FaqQuestion onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}>
                                {item.q}
                                <FaqIcon>{openFaq === idx ? '−' : '+'}</FaqIcon>
                            </FaqQuestion>
                            {openFaq === idx && (
                                <FaqAnswer>
                                    {item.a}
                                </FaqAnswer>
                            )}
                        </FaqItem>
                    ))}
                </FaqCard>
            </FaqSection>
            
            <NewsletterSection ref={newsletterSectionRef}>
                <NewsletterCard $visible={isNewsletterVisible}>
                    <NewsletterTitle>Subscribe To Our Newsletter</NewsletterTitle>
                    <NewsletterForm onSubmit={(e) => e.preventDefault()}>
                        <InputWrapper>
                            <EmailInput type="email" placeholder="Enter your email" required />
                            <SubscribeButton type="submit">Subscribe</SubscribeButton>
                        </InputWrapper>
                    </NewsletterForm>
                </NewsletterCard>
            </NewsletterSection>

            <Footer />
            
            
        </BodyContainer>
    )
}

export default Body