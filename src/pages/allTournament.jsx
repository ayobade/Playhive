import React, { useState } from 'react'
import styled from 'styled-components'
import Sidebar from '../Components/sidebar'
import RightSidebar from '../Components/rightSidebar'
import MobileHeader from '../Components/MobileHeader'
import { tournamentsData } from '../data/dataBank'
import TournamentCard from '../Components/tournamentcard'
import TournamentFilters from '../Components/TournamentFilters'

const Layout = styled.div`
  display: flex;
  min-height: 100vh;
  background: #0A0E12;
  position: relative;
`

const Main = styled.main`
  flex: 1;
  margin-left: ${props => props.$collapsed ? '80px' : '280px'};
  margin-right: 80px;
  padding: 40px;
  height: 100vh;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  transition: margin-left 0.3s ease, margin-right 0.3s ease;
  
  &::-webkit-scrollbar {
    display: none;
  }
  
  @media (max-width: 1200px) {
    margin-left: 0;
    margin-right: 0;
    padding: 20px 20px;
    padding-top: 180px;
  }
`

const PageHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`

const Title = styled.h1`
  margin: 0;
  color: #FFFFFF;
  font-family: 'Orbitron', sans-serif;
  font-weight: 700;
  font-size: 2rem;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`

const CreateBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  border-radius: 10px;
  background: #66B22E;
  border: 1px solid #66B22E;
  color: #0A0E12;
  font-weight: 700;
  cursor: pointer;
`

const Tabs = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  border-bottom: 1px solid rgba(255,255,255,0.08);
`

const TabsLeft = styled.div`
  display: flex;
  gap: 32px;
`

const Tab = styled.button`
  background: transparent;
  border: none;
  color: ${p => p.$active ? '#66B22E' : '#FFFFFF'};
  opacity: ${p => p.$active ? 1 : 0.7};
  font-weight: 700;
  padding: 12px 0;
  border-bottom: ${p => p.$active ? '3px solid #66B22E' : '3px solid transparent'};
  cursor: pointer;
`

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
`

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
    box-shadow: 0 10px 30px rgba(102,178,46,0.2);
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

const ImageWrap = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  overflow: visible;
  z-index: 1;
`

const CardImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  position: relative;
  z-index: 1;
`

const Badge = styled.div`
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

const CardBody = styled.div`
  padding: 20px;
  padding-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: relative;
  z-index: 1;
`

const CardTitle = styled.h3`
  font-family: 'Orbitron', sans-serif;
  font-size: 1.3rem;
  font-weight: 700;
  color: #FFFFFF;
  margin: 0;
  line-height: 1.3;
`

const Muted = styled.p`
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
const AllTournament = () => {
  const [collapsed, setCollapsed] = useState(false)
  const [leftOpen, setLeftOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('all')

  const toggleSidebar = () => setCollapsed(!collapsed)
  const closeSidebars = () => setLeftOpen(false)

  return (
    <Layout>
      <MobileHeader onMenuClick={() => setLeftOpen(true)} />
      <Sidebar collapsed={collapsed} onToggle={toggleSidebar} isOpen={leftOpen} onClose={closeSidebars} />
      <Main $collapsed={collapsed}>
        <PageHeader>
          <Title>Tournaments</Title>
          <Actions>
            <CreateBtn>+ Create Tournament</CreateBtn>
          </Actions>
        </PageHeader>
        <Tabs>
          <TabsLeft>
            <Tab $active={activeTab==='all'} onClick={()=>setActiveTab('all')}>All Tournament</Tab>
            <Tab $active={activeTab==='mine'} onClick={()=>setActiveTab('mine')}>My Tournament</Tab>
          </TabsLeft>
          <TournamentFilters />
        </Tabs>
        <Grid>
          {(activeTab==='all' ? tournamentsData : tournamentsData.slice(0,3)).map(t => (
            <TournamentCard
              key={t.id}
              image={t.image}
              title={t.title}
              matchType={t.matchType}
              date={t.date}
              prizePoolValue={t.prizePoolValue}
              entry={t.entry}
              gameType={t.gameType}
              teams={t.teams}
            />
          ))}
        </Grid>
      </Main>
      <RightSidebar isOpen={true} onClose={closeSidebars} />
    </Layout>
  )
}

export default AllTournament

