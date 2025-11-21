import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Sidebar from '../Components/sidebar'
import RightSidebar from '../Components/rightSidebar'
import MobileHeader from '../Components/MobileHeader'
import { useSidebarState } from '../hooks/useSidebarState'
import { livestreamsData } from '../data/dataBank'
import LivestreamCard from '../Components/livestreamcard'
import LivestreamFilters from '../Components/LivestreamFilters'
import EmptyState from '../Components/EmptyState'
import LoadingState from '../Components/LoadingState'
import streamsIcon from '../assets/streams.svg'

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
  const [activeTab, setActiveTab] = useState('all')
  const [isLoading, setIsLoading] = useState(true)
  const [allStreams, setAllStreams] = useState([])
  const [myStreams, setMyStreams] = useState([])

  useEffect(() => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      if (activeTab === 'all') {
        setAllStreams(livestreamsData) // Replace with actual API call
      } else {
        setMyStreams([]) // Empty for demo - replace with actual data
      }
      setIsLoading(false)
    }, 1000)
  }, [activeTab])

  const handleCreateStream = () => {
    console.log('Create stream clicked')
  }

  const displayData = activeTab === 'all' ? allStreams : myStreams
  const isEmpty = activeTab === 'mine' && !isLoading && myStreams.length === 0

  return (
    <Layout>
      <MobileHeader onMenuClick={() => openLeft()} />
      <Sidebar collapsed={collapsed} onToggle={toggleSidebar} isOpen={leftOpen} onClose={closeSidebars} />
      <Main $collapsed={collapsed}>
        <PageHeader>
          <Title>Streams</Title>
          <Actions>
            <CreateBtn onClick={handleCreateStream}>+ Create Stream</CreateBtn>
          </Actions>
        </PageHeader>
        <Tabs>
          <TabsLeft>
            <Tab $active={activeTab === 'all'} onClick={() => setActiveTab('all')}>All Livestreams</Tab>
            <Tab $active={activeTab === 'mine'} onClick={() => setActiveTab('mine')}>My Livestreams</Tab>
          </TabsLeft>
          <LivestreamFilters />
        </Tabs>
        {isLoading ? (
          <LoadingState type="skeleton" skeletonCount={6} />
        ) : isEmpty ? (
          <EmptyState
            iconSrc={streamsIcon}
            title="No Livestreams Yet"
            message="You haven't created any livestreams. Start by creating your first livestream!"
            actionLabel="+ Create Stream"
            onAction={handleCreateStream}
          />
        ) : (
          <Grid>
            {displayData.map(stream => (
              <LivestreamCard
                key={stream.id}
                thumbnail={stream.thumbnail}
                streamer={stream.streamer}
                title={stream.title}
                viewers={stream.viewers}
                alt={stream.alt}
              />
            ))}
          </Grid>
        )}
      </Main>
      <RightSidebar isOpen={true} onClose={closeSidebars} />
    </Layout>
  )
}

export default Streams


