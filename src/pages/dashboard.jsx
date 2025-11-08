import React, { useState } from 'react'
import styled from 'styled-components'
import Sidebar from '../Components/sidebar'
import RightSidebar from '../Components/rightSidebar'

const DashboardLayout = styled.div`
  display: flex;
  min-height: 100vh;
  background: #0A0E12;
`

const MainContent = styled.main`
  flex: 1;
  margin-left: ${props => props.$collapsed ? '80px' : '280px'};
  margin-right: 80px;
  padding: 40px;
  min-height: 100vh;
  transition: margin-left 0.3s ease;
  
  @media (max-width: 768px) {
    margin-left: 0;
    margin-right: 0;
    padding: 20px;
  }
`

const DashboardTitle = styled.h1`
  font-family: 'Orbitron', sans-serif;
  font-size: 3rem;
  font-weight: 700;
  color: #FFFFFF;
  margin-bottom: 40px;
`

const DashboardPage = () => {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

    const toggleSidebar = () => {
        setSidebarCollapsed(!sidebarCollapsed)
    }

    return (
        <DashboardLayout>
            <Sidebar collapsed={sidebarCollapsed} onToggle={toggleSidebar} />
            <MainContent $collapsed={sidebarCollapsed}>
                <DashboardTitle>Dashboard</DashboardTitle>
            </MainContent>
            <RightSidebar />
        </DashboardLayout>
    )
}

export default DashboardPage

