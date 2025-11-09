import React from 'react'
import styled from 'styled-components'
import searchIcon from '../assets/search.svg'
import chatIcon from '../assets/chat.svg'
import notificationIcon from '../assets/notification.svg'

const RightSidebarContainer = styled.aside`
  width: 80px;
  height: 100vh;
  background: #151A1F;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  right: 0;
  top: 0;
  padding: 30px 0;
  z-index: 180;
  gap: 24px;
  transition: transform 0.3s ease;
  
  @media (min-width: 1201px) {
    transform: translateX(0);
  }
  
  @media (max-width: 1200px) {
    display: none;
  }
`

const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #4285F4 0%, #EA4335 50%, #9C27B0 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
  }
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.3) 0%, transparent 70%);
    border-radius: 50%;
  }
`

const AvatarImage = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #4285F4 0%, #EA4335 50%, #9C27B0 100%);
  border-radius: 50%;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.4) 0%, transparent 60%);
    border-radius: 50%;
  }
  
  &::after {
    content: '';
    position: absolute;
    inset: 20%;
    background: radial-gradient(circle at 40% 40%, rgba(255, 255, 255, 0.6) 0%, transparent 50%);
    border-radius: 50%;
    filter: blur(8px);
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
  transition: all 0.3s ease;
  position: relative;
  padding: 0;
  
  &:hover {
    transform: translateY(-2px);
    opacity: 0.9;
  }
  
  img {
    width: 40px;
    height: 40px;
    display: block;
  }
`

const NotificationBadge = styled.span`
  position: absolute;
  top: 4px;
  right: 4px;
  width: 8px;
  height: 8px;
  background: #FFFFFF;
  border-radius: 50%;
  z-index: 1;
`

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: none;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;
  
  @media (max-width: 1200px) {
    display: flex;
  }
  
  &:hover {
    background: rgba(255, 255, 255, 0.12);
    border-color: rgba(255, 255, 255, 0.15);
  }
  
  svg {
    width: 18px;
    height: 18px;
    stroke: #FFFFFF;
  }
`

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
)

const RightSidebar = ({ isOpen = true, onClose }) => {
    return (
        <RightSidebarContainer $isOpen={isOpen}>
            <UserAvatar>
                <AvatarImage />
            </UserAvatar>
            
            <IconButton>
                <img src={searchIcon} alt="Search" />
            </IconButton>
            
            <IconButton>
                <img src={chatIcon} alt="Chat" />
            </IconButton>
            
            <IconButton>
                <img src={notificationIcon} alt="Notifications" />
                <NotificationBadge />
            </IconButton>
        </RightSidebarContainer>
    )
}

export default RightSidebar

