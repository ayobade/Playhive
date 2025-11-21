import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Sidebar from '../Components/sidebar'
import RightSidebar from '../Components/rightSidebar'
import MobileHeader from '../Components/MobileHeader'
import { useSidebarState } from '../hooks/useSidebarState'
import { communitiesData } from '../data/dataBank'
import CommunityCard from '../Components/communitycard'
import CommunitiesFilters from '../Components/CommunitiesFilters'
import EmptyState from '../Components/EmptyState'
import LoadingState from '../Components/LoadingState'
import communityIcon from '../assets/community.svg'

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

const Community = () => {
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
  const [isLoading, setIsLoading] = useState(true)
  const [allCommunities, setAllCommunities] = useState([])
  const [myCommunities, setMyCommunities] = useState([])

  useEffect(() => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      if (activeTab === 'all') {
        setAllCommunities(communitiesData) // Replace with actual API call
      } else {
        setMyCommunities([]) // Empty for demo - replace with actual data
      }
      setIsLoading(false)
    }, 1000)
  }, [activeTab])

  const handleCreateCommunity = () => {
    console.log('Create community clicked')
  }

  const displayData = activeTab === 'all' ? allCommunities : myCommunities
  const isEmpty = activeTab === 'mine' && !isLoading && myCommunities.length === 0

  return (
    <Layout>
      <MobileHeader onMenuClick={() => openLeft()} />
      <Sidebar collapsed={collapsed} onToggle={toggleSidebar} isOpen={leftOpen} onClose={closeSidebars} />
      <Main $collapsed={collapsed}>
        <PageHeader>
          <Title>Community</Title>
          <Actions>
            <CreateBtn onClick={handleCreateCommunity}>+ Create Community</CreateBtn>
          </Actions>
        </PageHeader>
        <Tabs>
          <TabsLeft>
            <Tab $active={activeTab === 'all'} onClick={() => setActiveTab('all')}>All Communities</Tab>
            <Tab $active={activeTab === 'mine'} onClick={() => setActiveTab('mine')}>My Communities</Tab>
          </TabsLeft>
          <CommunitiesFilters />
        </Tabs>
        {isLoading ? (
          <LoadingState type="skeleton" skeletonCount={4} cardType="community" />
        ) : isEmpty ? (
          <EmptyState
            iconSrc={communityIcon}
            title="No Communities Yet"
            message="You haven't created or joined any communities. Start by creating your first community!"
            actionLabel="+ Create Community"
            onAction={handleCreateCommunity}
          />
        ) : (
          <Grid>
            {displayData.map(community => (
              <CommunityCard
                key={community.id}
                logo={community.logo}
                logoText={community.logoText}
                logoBgColor={community.logoBgColor}
                logoBorderColor={community.logoBorderColor}
                title={community.title}
                game={community.game}
                members={community.members}
              />
            ))}
          </Grid>
        )}
      </Main>
      <RightSidebar isOpen={true} onClose={closeSidebars} />
    </Layout>
  )
}

export default Community


