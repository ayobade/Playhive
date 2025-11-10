import React from 'react'
import styled from 'styled-components'
import searchIcon from '../assets/search.svg'
import chatIcon from '../assets/chat.svg'
import notificationIcon from '../assets/notification.svg'

const Header = styled.header`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: #151A1F;
  z-index: 100;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  @media (max-width: 1200px) {
    display: block;
  }
`

const TopNavBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`

const HamburgerButton = styled.button`
  width: 40px;
  height: 40px;
  background: transparent;
  border: 2px solid #66B22E;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover { background: #66B22E; }
  &:hover svg { fill: #0A0E12; }
  svg { width: 24px; height: 24px; fill: #66B22E; transition: fill 0.3s ease; }
`

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #4285F4 0%, #EA4335 50%, #9C27B0 100%);
`

const SearchSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

const SearchBar = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 12px;
  background: #1A1F26;
  border-radius: 24px;
  padding: 12px 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  img { width: 20px; height: 20px; display: block; }
  input {
    flex: 1;
    background: transparent;
    border: none;
    outline: none;
    color: #FFFFFF;
    font-family: 'Roboto', sans-serif;
    font-size: 14px;
  }
`

const IconButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: transparent;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  img { width: 40px; height: 40px; display: block; }
`

const NotificationBadge = styled.span`
  position: absolute;
  top: 4px;
  right: 4px;
  width: 8px;
  height: 8px;
  background: #FFFFFF;
  border-radius: 50%;
`

const MobileHeader = ({ onMenuClick }) => {
  return (
    <Header>
      <TopNavBar>
        <HamburgerButton onClick={onMenuClick}>
          <svg viewBox="0 0 24 24">
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
          </svg>
        </HamburgerButton>
        <Avatar />
      </TopNavBar>
      <SearchSection>
        <SearchBar>
          <img src={searchIcon} alt="Search" />
          <input type="text" placeholder="Search" />
        </SearchBar>
        <IconButton>
          <img src={notificationIcon} alt="Notifications" />
          <NotificationBadge />
        </IconButton>
        <IconButton>
          <img src={chatIcon} alt="Chat" />
        </IconButton>
      </SearchSection>
    </Header>
  )
}

export default MobileHeader


