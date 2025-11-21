import React from 'react'
import styled from 'styled-components'
import Sidebar from '../Components/sidebar'
import RightSidebar from '../Components/rightSidebar'
import MobileHeader from '../Components/MobileHeader'
import { useSidebarState } from '../hooks/useSidebarState'

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

const Content = styled.div`
  color: #FFFFFF;
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
`

const Leaderboard = () => {
  const {
    sidebarCollapsed: collapsed,
    toggleCollapsed,
    leftSidebarOpen: leftOpen,
    openLeft,
    closeLeft
  } = useSidebarState()

  const toggleSidebar = () => toggleCollapsed()
  const closeSidebars = () => closeLeft()

  return (
    <Layout>
      <MobileHeader onMenuClick={() => openLeft()} />
      <Sidebar collapsed={collapsed} onToggle={toggleSidebar} isOpen={leftOpen} onClose={closeSidebars} />
      <Main $collapsed={collapsed}>
        <PageHeader>
          <Title>Leaderboard</Title>
        </PageHeader>
        <Content>
          <p>Coming soon.</p>
        </Content>
      </Main>
      <RightSidebar isOpen={true} onClose={closeSidebars} />
    </Layout>
  )
}

export default Leaderboard


