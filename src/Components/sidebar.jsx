import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import homeIcon from '../assets/home.svg'
import tournamentIcon from '../assets/tournament.svg'
import organizationsIcon from '../assets/organizations.svg'
import communityIcon from '../assets/community.svg'
import leaderboardIcon from '../assets/leaderboard.svg'
import streamsIcon from '../assets/streams.svg'
import subscriptionsIcon from '../assets/subscriptions.svg'

const SidebarContainer = styled.aside`
  width: ${props => props.$collapsed ? '80px' : '280px'};
  height: 100vh;
  background: #151A1F;
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 0;
  top: 0;
  padding: 30px 0;
  z-index: 100;
  overflow-y: auto;
  transition: width 0.3s ease;
  
  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    position: relative;
  }
`

const ToggleButton = styled.button`
  position: absolute;
  top: 30px;
  right: ${props => props.$collapsed ? '20px' : '20px'};
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;
  
  &:hover {
    background: rgba(255, 255, 255, 0.12);
    border-color: rgba(255, 255, 255, 0.15);
  }
  
  svg {
    width: 18px;
    height: 18px;
    fill: #FFFFFF;
    transition: transform 0.3s ease;
    transform: ${props => props.$collapsed ? 'rotate(180deg)' : 'rotate(0deg)'};
  }
`

const Logo = styled.div`
  font-family: 'Orbitron', sans-serif;
  font-size: 24px;
  font-weight: 700;
  padding: 0 30px;
  margin-bottom: 40px;
  opacity: ${props => props.$collapsed ? '0' : '1'};
  transition: opacity 0.3s ease;
  white-space: nowrap;
  overflow: hidden;
  
  .play {
    color: #FFFFFF;
  }
  
  .hive {
    color: #66B22E;
  }
`

const CollapsedLogo = styled.div`
  font-family: 'Orbitron', sans-serif;
  font-size: 24px;
  font-weight: 700;
  padding: 0;
  margin-bottom: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${props => props.$collapsed ? '1' : '0'};
  width: ${props => props.$collapsed ? 'auto' : '0'};
  height: ${props => props.$collapsed ? 'auto' : '0'};
  overflow: hidden;
  transition: opacity 0.3s ease, width 0.3s ease, height 0.3s ease;
  
  .p {
    color: #FFFFFF;
  }
  
  .h {
    color: #66B22E;
  }
`

const NavList = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0 20px;
  flex: 1;
`

const NavItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px ${props => props.$collapsed ? '12px' : '16px'};
  border-radius: 0 12px 12px 0;
  text-decoration: none;
  color: #CCCCCC;
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
  background: ${props => props.$active ? '#1A1E20' : 'transparent'};
  margin-left: ${props => props.$active && !props.$collapsed ? '-20px' : '0'};
  margin-right: ${props => props.$active && !props.$collapsed ? '-20px' : '0'};
  padding-left: ${props => props.$active && !props.$collapsed ? '36px' : props.$collapsed ? '12px' : '16px'};
  border-radius: ${props => props.$active && !props.$collapsed ? '0' : '0 12px 12px 0'};
  justify-content: ${props => props.$collapsed ? 'center' : 'flex-start'};
  
  ${props => props.$active && props.$collapsed && `
    margin-left: -20px;
    margin-right: -20px;
    padding-left: ;
    border-radius: 0;
    width: calc(100% + 40px);
  `}
  
  &:hover {
    color: #FFFFFF;
    background: ${props => props.$active ? '#1A1E20' : 'rgba(255, 255, 255, 0.05)'};
  }
  
  span {
    opacity: ${props => props.$collapsed ? '0' : '1'};
    width: ${props => props.$collapsed ? '0' : 'auto'};
    overflow: hidden;
    white-space: nowrap;
    transition: opacity 0.3s ease, width 0.3s ease;
  }
  
  ${props => props.$active && `
    color: #FFFFFF;
    font-weight: 600;
    
    &::before {
      content: '';
      position: absolute;
      left: -12px;
      top: 0;
      bottom: 0;
      width: 24px;
      background: #66B22E;
      border-radius: 0 56px 56px 0;
    }
  `}
`

const IconImage = styled.img`
  width: 20px;
  height: 20px;
  filter: ${props => props.$active 
    ? 'brightness(0) saturate(100%) invert(100%)' 
    : 'brightness(0) saturate(100%) invert(100%)'};
  opacity: ${props => props.$active ? '1' : '0.6'};
  transition: all 0.3s ease;
`

const DropdownIcon = styled.span`
  margin-left: auto;
  display: flex;
  align-items: center;
  opacity: ${props => props.$collapsed ? '0' : '1'};
  width: ${props => props.$collapsed ? '0' : 'auto'};
  overflow: hidden;
  transition: opacity 0.3s ease, width 0.3s ease;
  
  svg {
    width: 16px;
    height: 16px;
    fill: currentColor;
  }
`

const CTACard = styled.div`
  background: #66B22E;
  border-radius: 12px;
  padding: ${props => props.$collapsed ? '12px' : '20px'};
  margin: 20px ${props => props.$collapsed ? '12px' : '20px'} 30px ${props => props.$collapsed ? '12px' : '20px'};
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: #5C8D30;
    transform: translateY(-2px);
  }
`

const CTAText = styled.p`
  color: #FFFFFF;
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  font-weight: 600;
  margin: 0;
  line-height: 1.4;
  opacity: ${props => props.$collapsed ? '0' : '1'};
  width: ${props => props.$collapsed ? '0' : 'auto'};
  height: ${props => props.$collapsed ? '0' : 'auto'};
  overflow: hidden;
  white-space: nowrap;
  transition: opacity 0.3s ease, width 0.3s ease, height 0.3s ease;
`

const CTAIcon = styled.div`
  position: ${props => props.$collapsed ? 'relative' : 'absolute'};
  top: ${props => props.$collapsed ? '0' : '16px'};
  right: ${props => props.$collapsed ? '0' : '16px'};
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    width: 20px;
    height: 20px;
    fill: #FFFFFF;
  }
`

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.$collapsed ? '0' : '12px'};
  padding: 16px ${props => props.$collapsed ? '20px' : '30px'};
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: auto;
  justify-content: ${props => props.$collapsed ? 'center' : 'flex-start'};
`

const UserAvatar = styled.div`
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #4285F4 0%, #EA4335 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #FFFFFF;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 0.9rem;
  flex-shrink: 0;
  opacity: ${props => props.$collapsed ? '0' : '1'};
  width: ${props => props.$collapsed ? '0' : '40px'};
  overflow: hidden;
  transition: opacity 0.3s ease, width 0.3s ease;
`

const UserInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  opacity: ${props => props.$collapsed ? '0' : '1'};
  width: ${props => props.$collapsed ? '0' : 'auto'};
  overflow: hidden;
  transition: opacity 0.3s ease, width 0.3s ease;
`

const Username = styled.span`
  color: #FFFFFF;
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
`

const LogoutButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #CCCCCC;
  transition: all 0.3s ease;
  
  &:hover {
    color: #FFFFFF;
  }
  
  svg {
    width: 20px;
    height: 20px;
    fill: currentColor;
  }
`


const ChevronDownIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
)

const ExternalLinkIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15 3 21 3 21 9"/>
    <line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
)

const LogoutIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
    <polyline points="16 17 21 12 16 7"/>
    <line x1="21" y1="12" x2="9" y2="12"/>
  </svg>
)

const ChevronLeftIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="15 18 9 12 15 6"/>
  </svg>
)

const Sidebar = ({ collapsed, onToggle }) => {
    const location = useLocation()
    const [showSubscriptions, setShowSubscriptions] = useState(false)

    return (
        <SidebarContainer $collapsed={collapsed}>
            <ToggleButton $collapsed={collapsed} onClick={onToggle}>
                <ChevronLeftIcon />
            </ToggleButton>
            
            <Logo $collapsed={collapsed}>
                <span className="play">Play</span>
                <span className="hive">Hive</span>
            </Logo>
            
            <CollapsedLogo $collapsed={collapsed}>
                <span className="p">P</span>
                <span className="h">H</span>
            </CollapsedLogo>
            
            <NavList>
                <NavItem to="/dashboard" $active={location.pathname === '/dashboard'} $collapsed={collapsed}>
                    <IconImage src={homeIcon} alt="Home" $active={location.pathname === '/dashboard'} />
                    <span>Home</span>
                </NavItem>
                <NavItem to="/tournaments" $active={location.pathname === '/tournaments'} $collapsed={collapsed}>
                    <IconImage src={tournamentIcon} alt="Tournaments" $active={location.pathname === '/tournaments'} />
                    <span>Tournaments</span>
                </NavItem>
                <NavItem to="/organizations" $active={location.pathname === '/organizations'} $collapsed={collapsed}>
                    <IconImage src={organizationsIcon} alt="Organizations" $active={location.pathname === '/organizations'} />
                    <span>Organizations</span>
                </NavItem>
                <NavItem to="/community" $active={location.pathname === '/community'} $collapsed={collapsed}>
                    <IconImage src={communityIcon} alt="Community" $active={location.pathname === '/community'} />
                    <span>Community</span>
                </NavItem>
                <NavItem to="/leaderboard" $active={location.pathname === '/leaderboard'} $collapsed={collapsed}>
                    <IconImage src={leaderboardIcon} alt="Leaderboard" $active={location.pathname === '/leaderboard'} />
                    <span>Leaderboard</span>
                </NavItem>
                <NavItem to="/streams" $active={location.pathname === '/streams'} $collapsed={collapsed}>
                    <IconImage src={streamsIcon} alt="Streams" $active={location.pathname === '/streams'} />
                    <span>Streams</span>
                </NavItem>
                <NavItem 
                    to="/subscriptions" 
                    $active={location.pathname === '/subscriptions'}
                    $collapsed={collapsed}
                    onClick={(e) => {
                        e.preventDefault()
                        setShowSubscriptions(!showSubscriptions)
                    }}
                >
                    <IconImage src={subscriptionsIcon} alt="Subscriptions" $active={location.pathname === '/subscriptions'} />
                    <span>Subscriptions</span>
                    <DropdownIcon $collapsed={collapsed}>
                        <ChevronDownIcon />
                    </DropdownIcon>
                </NavItem>
            </NavList>
            
            <CTACard $collapsed={collapsed}>
                <CTAText $collapsed={collapsed}>
                    Join the PlayHive<br />Community!
                </CTAText>
                <CTAIcon $collapsed={collapsed}>
                    <ExternalLinkIcon />
                </CTAIcon>
            </CTACard>
            
            <UserSection $collapsed={collapsed}>
                <UserAvatar $collapsed={collapsed}>BS</UserAvatar>
                <UserInfo $collapsed={collapsed}>
                    <Username>Bobby Swagger</Username>
                </UserInfo>
                <LogoutButton>
                    <LogoutIcon />
                </LogoutButton>
            </UserSection>
        </SidebarContainer>
    )
}

export default Sidebar

