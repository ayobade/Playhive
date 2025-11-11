import React from 'react'
import styled from 'styled-components'
import Sidebar from '../Components/sidebar'
import RightSidebar from '../Components/rightSidebar'
import MobileHeader from '../Components/MobileHeader'
import { useSidebarState } from '../hooks/useSidebarState'
import CreateOrganizationModal from '../Components/CreateOrganizationModal'

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

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 24px;
`

const CreateButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 20px;
  background: #5C8D30;
  color: #FFFFFF;
  border: none;
  border-radius: 12px;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #66B22E;
    transform: translateY(-1px);
    box-shadow: 0 8px 22px rgba(102, 178, 46, 0.28);
  }
`

const PlusIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 5v14M5 12h14" />
  </svg>
)

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  align-items: stretch;
`

const Card = styled.div`
  border-radius: 16px;
  background: ${p => p.$active ? '#5C8D30' : '#171B20'};
  border: 1px solid ${p => p.$active ? '#5C8D30' : 'rgba(255,255,255,0.08)'};
  padding: 28px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  transition: transform 0.2s ease, border-color 0.2s ease, background 0.2s ease;
  cursor: pointer;
  max-width: 300px;
  width: 100%;
  flex: 1 1 300px;

  &:hover {
    transform: translateY(-2px);
    border-color: ${p => p.$active ? '#66B22E' : 'rgba(255,255,255,0.14)'};
  }
`

const Avatar = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: #FFFFFF;
  display: grid;
  place-items: center;
  overflow: hidden;
`

const AvatarImg = styled.img`
  width: 64px;
  height: 64px;
  object-fit: cover;
  border-radius: 50%;
`

const OrgName = styled.div`
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  color: #FFFFFF;
  font-size: 1.1rem;
  text-align: center;
`

const SubText = styled.div`
  font-family: 'Inter', sans-serif;
  color: ${p => p.$active ? '#E6F6D6' : '#D1D5DB'};
  opacity: ${p => p.$active ? 1 : 0.85};
  font-size: 0.95rem;
`

const Organization = () => {
  const {
    sidebarCollapsed: collapsed,
    toggleCollapsed,
    leftSidebarOpen: leftOpen,
    openLeft,
    closeLeft
  } = useSidebarState()

  const toggleSidebar = () => toggleCollapsed()
  const closeSidebars = () => closeLeft()

  const orgs = [
    { id: 1, name: 'Bobby Swagger INC', logo: '/src/assets/community01.png', tournaments: 0 },
    { id: 2, name: 'Bobby Swagger INC', logo: '/src/assets/community02.png', tournaments: 0 },
    { id: 3, name: 'Bobby Swagger INC', logo: '/src/assets/community03.png', tournaments: 0 }
  ]
  const [orgModalOpen, setOrgModalOpen] = React.useState(false)
  const handleCreateOrg = () => {
    setOrgModalOpen(false)
  }

  return (
    <Layout>
      <CreateOrganizationModal
        isOpen={orgModalOpen}
        onClose={() => setOrgModalOpen(false)}
        onSubmit={handleCreateOrg}
      />
      <MobileHeader onMenuClick={() => openLeft()} />
      <Sidebar collapsed={collapsed} onToggle={toggleSidebar} isOpen={leftOpen} onClose={closeSidebars} />
      <Main $collapsed={collapsed}>
        <HeaderRow>
          <PageTitle style={{ marginBottom: 0 }}>Your Organizations</PageTitle>
          <CreateButton onClick={() => setOrgModalOpen(true)}>
            <PlusIcon /> Create New Organization
          </CreateButton>
        </HeaderRow>
        <Grid>
          {orgs.map((org, idx) => (
            <Card key={org.id} $active={idx === 0}>
              <Avatar>
                <AvatarImg src={org.logo} alt={org.name} />
              </Avatar>
              <OrgName>{org.name}</OrgName>
              <SubText $active={idx === 0}>Tournaments ({org.tournaments})</SubText>
            </Card>
          ))}
        </Grid>
      </Main>
      <RightSidebar isOpen={true} onClose={closeSidebars} />
    </Layout>
  )
}

export default Organization


