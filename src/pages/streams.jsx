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
  transition: margin-left 0.3s ease, margin-right 0.3s ease;
  
  @media (max-width: 1200px) {
    margin-left: 0;
    margin-right: 0;
    padding: 20px 20px;
    padding-top: 140px;
  }
`

const PageTitle = styled.h1`
  color: #FFFFFF;
  margin: 0 0 20px 0;
  font-family: 'Orbitron', sans-serif;
  font-size: 2rem;
  font-weight: 700;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`

const Streams = () => {
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
        <PageTitle>Streams</PageTitle>
      </Main>
      <RightSidebar isOpen={true} onClose={closeSidebars} />
    </Layout>
  )
}

export default Streams


