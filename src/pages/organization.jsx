import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Sidebar from '../Components/sidebar'
import RightSidebar from '../Components/rightSidebar'
import MobileHeader from '../Components/MobileHeader'
import { useSidebarState } from '../hooks/useSidebarState'
import CreateOrganizationModal from '../Components/CreateOrganizationModal'
import OrganizationFilters from '../Components/OrganizationFilters'
import EmptyState from '../Components/EmptyState'
import LoadingState from '../Components/LoadingState'
import organizationsIcon from '../assets/organizations.svg'

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

const initialOrgs = [
  { id: 1, name: 'Bobby Swagger INC', logo: '/src/assets/community01.png', tournaments: 0 },
  { id: 2, name: 'Bobby Swagger INC', logo: '/src/assets/community02.png', tournaments: 0 },
  { id: 3, name: 'Bobby Swagger INC', logo: '/src/assets/community03.png', tournaments: 0 }
]

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
  const [activeTab, setActiveTab] = useState('all')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [allOrgs, setAllOrgs] = useState([])
  const [myOrgs, setMyOrgs] = useState([])

  useEffect(() => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      if (activeTab === 'all') {
        setAllOrgs(initialOrgs) // Replace with actual API call
      } else {
        setMyOrgs([]) // Empty for demo - replace with actual data
      }
      setIsLoading(false)
    }, 1000)
  }, [activeTab])

  const handleCreateOrg = () => {
    setIsModalOpen(false)
  }

  const displayData = activeTab === 'all' ? allOrgs : myOrgs
  const isEmpty = activeTab === 'mine' && !isLoading && myOrgs.length === 0

  return (
    <Layout>
      <CreateOrganizationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateOrg}
      />
      <MobileHeader onMenuClick={() => openLeft()} />
      <Sidebar collapsed={collapsed} onToggle={toggleSidebar} isOpen={leftOpen} onClose={closeSidebars} />
      <Main $collapsed={collapsed}>
        <PageHeader>
          <Title>Organizations</Title>
          <Actions>
            <CreateBtn onClick={() => setIsModalOpen(true)}>+ Create Organization</CreateBtn>
          </Actions>
        </PageHeader>
        <Tabs>
          <TabsLeft>
            <Tab $active={activeTab === 'all'} onClick={() => setActiveTab('all')}>All Organization</Tab>
            <Tab $active={activeTab === 'mine'} onClick={() => setActiveTab('mine')}>My Organization</Tab>
          </TabsLeft>
          <OrganizationFilters />
        </Tabs>
        {isLoading ? (
          <LoadingState type="skeleton" skeletonCount={6} cardType="organization" />
        ) : isEmpty ? (
          <EmptyState
            iconSrc={organizationsIcon}
            title="No Organizations Yet"
            message="You haven't created any organizations. Start by creating your first organization!"
            actionLabel="+ Create Organization"
            onAction={() => setIsModalOpen(true)}
          />
        ) : (
          <Grid>
            {displayData.map((org, idx) => (
              <Card key={org.id} $active={idx === 0 && activeTab === 'mine'}>
                <Avatar>
                  <AvatarImg src={org.logo} alt={org.name} />
                </Avatar>
                <OrgName>{org.name}</OrgName>
                <SubText $active={idx === 0 && activeTab === 'mine'}>Tournaments ({org.tournaments})</SubText>
              </Card>
            ))}
          </Grid>
        )}
      </Main>
      <RightSidebar isOpen={true} onClose={closeSidebars} />
    </Layout>
  )
}

export default Organization


