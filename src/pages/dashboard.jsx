import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import Sidebar from '../Components/sidebar'
import RightSidebar from '../Components/rightSidebar'
import gtaVI from '../assets/GTA VI.png'
import redDead from '../assets/Red dead.png'
import streetFighter from '../assets/Street fighter.png'
import valorant from '../assets/Valorant.png'
import cod from '../assets/COD.png'
import searchIcon from '../assets/search.svg'
import chatIcon from '../assets/chat.svg'
import notificationIcon from '../assets/notification.svg'
import filterIcon from '../assets/filter.svg'
import { tournamentsData, livestreamsData, communitiesData } from '../data/dataBank'
import LivestreamCard from '../Components/livestreamcard'
import CommunityCard from '../Components/communitycard'
import TournamentFilters from '../Components/TournamentFilters'

const DashboardLayout = styled.div`
  display: flex;
  min-height: 100vh;
  background: #0A0E12;
  position: relative;
`

const MobileHeader = styled.header`
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

const MobileHamburgerButton = styled.button`
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
  
  &:hover {
    background: #66B22E;
  }
  
  svg {
    width: 24px;
    height: 24px;
    fill: #66B22E;
    transition: fill 0.3s ease;
  }
  
  &:hover svg {
    fill: #0A0E12;
  }
`

const MobileUserAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #4285F4 0%, #EA4335 50%, #9C27B0 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
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
  
  img {
    width: 20px;
    height: 20px;
    display: block;
    
    @media (max-width: 1200px) {
      width: 24px;
      height: 24px;
    }
  }
  
  input {
    flex: 1;
    background: transparent;
    border: none;
    outline: none;
    color: #FFFFFF;
    font-family: 'Roboto', sans-serif;
    font-size: 14px;
    
    &::placeholder {
      color: rgba(255, 255, 255, 0.5);
    }
  }
`

const MobileIconButton = styled.button`
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

const MainContent = styled.main`
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
    padding: 20px 40px;
    padding-top: 140px;
  }
  
  @media (max-width: 768px) {
    padding: 20px;
    padding-top: 140px;
  }
`

const DashboardTitle = styled.h1`
  font-family: 'Orbitron', sans-serif;
  font-size: 3rem;
  font-weight: 700;
  color: #FFFFFF;
  margin-bottom: 40px;
  
  @media (max-width: 1200px) {
    display: none;
  }
`

const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 2000px;
  margin: 0 auto 60px;
  height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  
  @media (max-width: 1200px) {
    height: 400px;
    max-width: 1600px;
  }
  
  @media (max-width: 600px) {
    height: 350px;
    max-width: 100%;
  }
`

const CarouselWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const CarouselTrack = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: -20px;
  position: relative;
  width: 100%;
  height: 100%;
  perspective: 2000px;
  transform-style: preserve-3d;
`

const CarouselItem = styled.div`
  position: absolute;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  overflow: hidden;
  transform-style: preserve-3d;
  border-radius: 20px;
  
  ${props => {
    const index = props.$index;
    const centerIndex = props.$centerIndex;
    const sideDirection = props.$sideDirection;
    const totalImages = 5; // gameImages.length
    
    // Calculate circular distance
    const directDistance = Math.abs(index - centerIndex);
    const wrapDistance = totalImages - directDistance;
    const distance = Math.min(directDistance, wrapDistance);
    
    // Calculate tilt angle based on position relative to center
    // Cards to the left (index < centerIndex): tilt right (positive rotateY) - right side inwards
    // Cards to the right (index > centerIndex): tilt left (negative rotateY) - left side inwards
    // Center card: no tilt
    let tiltAngle = 0;
    if (index !== centerIndex) {
      // Determine if card is on left or right side
      const forwardDist = (index - centerIndex + totalImages) % totalImages;
      const backwardDist = (centerIndex - index + totalImages) % totalImages;
      const isOnLeft = forwardDist > backwardDist;
      
      if (isOnLeft) {
        // Card is on the left, tilt right (positive rotateY)
        tiltAngle = distance === 1 ? 25 : distance === 2 ? 35 : 0;
      } else {
        // Card is on the right, tilt left (negative rotateY)
        tiltAngle = distance === 1 ? -25 : distance === 2 ? -35 : 0;
      }
    }
    
    if (distance === 0) {
      // Center image - fully visible and prominent, no tilt
      return `
        transform: translateX(0) scale(1) rotateY(0deg);
        opacity: 1;
        width: 650px;
        height: 500px;
        max-height: 500px;
        left: 50%;
        margin-left: -325px;
        z-index: 10;
      `;
    } else if (distance === 1) {
      // Adjacent images - partially visible with tilt
      return `
        transform: translateX(${sideDirection * 400}px) scale(0.85) rotateY(${tiltAngle}deg);
        opacity: 1;
        width: 468px;
        height: 425px;
        max-height: 400px;
        left: 50%;
        margin-left: -234px;
        z-index: 5;
      `;
    } else if (distance === 2) {
      // Further images - more obscured with more tilt, pass behind visible cards
      return `
        transform: translateX(${sideDirection * 650}px) scale(0.7) rotateY(${tiltAngle}deg);
        opacity: 1;
        width: 385px;
        height: 350px;
        max-height: 350px;
        left: 50%;
        margin-left: -192.5px;
        z-index: 1;
      `;
    } else {
      // Hidden images - lowest z-index, pass behind everything
      return `
        transform: translateX(${sideDirection * 1000}px) scale(0.5) rotateY(${tiltAngle}deg);
        opacity: 0;
        width: 350px;
        height: 350px;
        left: 50%;
        margin-left: -175px;
        z-index: 0;
        pointer-events: none;
      `;
    }
  }}
  
  @media (max-width: 1200px) and (min-width: 601px) {
    ${props => {
      const index = props.$index;
      const centerIndex = props.$centerIndex;
      const sideDirection = props.$sideDirection;
      const totalImages = 5;
      
      const directDistance = Math.abs(index - centerIndex);
      const wrapDistance = totalImages - directDistance;
      const distance = Math.min(directDistance, wrapDistance);
      
      let tiltAngle = 0;
      if (index !== centerIndex) {
        const forwardDist = (index - centerIndex + totalImages) % totalImages;
        const backwardDist = (centerIndex - index + totalImages) % totalImages;
        const isOnLeft = forwardDist > backwardDist;
        
        if (isOnLeft) {
          tiltAngle = distance === 1 ? 25 : distance === 2 ? 35 : 0;
        } else {
          tiltAngle = distance === 1 ? -25 : distance === 2 ? -35 : 0;
        }
      }
      
      if (distance === 0) {
        return `
          transform: translateX(0) scale(1) rotateY(0deg);
          width: 330px;
          height: 300px;
          max-height: 300px;
          margin-left: -165px;
        `;
      } else if (distance === 1) {
        return `
          transform: translateX(${sideDirection * 240}px) scale(0.85) rotateY(${tiltAngle}deg);
          width: 280px;
          height: 255px;
          max-height: 255px;
          margin-left: -140px;
        `;
      } else if (distance === 2) {
        return `
          transform: translateX(${sideDirection * 400}px) scale(0.7) rotateY(${tiltAngle}deg);
          width: 231px;
          height: 210px;
          max-height: 210px;
          margin-left: -115.5px;
        `;
      } else {
        return `
          opacity: 0;
          pointer-events: none;
        `;
      }
    }}
  }
  
  @media (max-width: 600px) {
    ${props => {
      const sideDirection = props.$sideDirection;
      const index = props.$index;
      const centerIndex = props.$centerIndex;
      const totalImages = 5;
      
      const directDistance = Math.abs(index - centerIndex);
      const wrapDistance = totalImages - directDistance;
      const distance = Math.min(directDistance, wrapDistance);
      
      // Calculate tilt angle for mobile
      let tiltAngle = 0;
      if (index !== centerIndex) {
        const forwardDist = (index - centerIndex + totalImages) % totalImages;
        const backwardDist = (centerIndex - index + totalImages) % totalImages;
        const isOnLeft = forwardDist > backwardDist;
        
        if (isOnLeft) {
          tiltAngle = distance === 1 ? 20 : 0;
        } else {
          tiltAngle = distance === 1 ? -20 : 0;
        }
      }
      
      // On mobile, only show 3 cards (center + 1 on each side)
      if (distance === 0) {
        return `
          transform: translateX(0) scale(1) rotateY(0deg);
          width: 85%;
          max-width: 330px;
          height: 85%;
          max-height: 300px;
          margin-left: -42.5%;
        `;
      } else if (distance === 1) {
        return `
          transform: translateX(${sideDirection * 200}px) scale(0.8) rotateY(${tiltAngle}deg);
          width: 70%;
          max-width: 280px;
          height: 70%;
          max-height: 280px;
          margin-left: -35%;
        `;
      } else {
        // Hide cards beyond distance 1 on mobile (only show 3 cards)
        return `
          opacity: 0;
          pointer-events: none;
          transform: translateX(${sideDirection * 400}px) scale(0.5) rotateY(${tiltAngle}deg);
        `;
      }
    }}
  }
`

const GameImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
  transition: box-shadow 0.3s ease;
  display: block;
  backface-visibility: hidden;
  
  ${CarouselItem}:hover & {
    box-shadow: 0 15px 50px rgba(102, 178, 46, 0.4);
  }
`

const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${props => props.$direction === 'left' ? 'left: 20px;' : 'right: 20px;'}
  background: rgba(26, 30, 35, 0.9);
  border: 2px solid #66B22E;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  transition: all 0.3s ease;
  
  &:hover {
    background: #66B22E;
    transform: translateY(-50%) scale(1.1);
  }
  
  &:active {
    transform: translateY(-50%) scale(0.95);
  }
  
  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
    ${props => props.$direction === 'left' ? 'left: 10px;' : 'right: 10px;'}
  }
`

const ArrowIcon = styled.svg`
  width: 24px;
  height: 24px;
  fill: #66B22E;
  transition: fill 0.3s ease;
  
  ${ArrowButton}:hover & {
    fill: #0A0E12;
  }
  
  @media (max-width: 768px) {
    width: 20px;
    height: 20px;
  }
`

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 150;
  display: ${props => props.$visible ? 'block' : 'none'};
  
  @media (max-width: 1200px) {
    z-index: 200;
  }
  
  @media (min-width: 1201px) {
    display: none;
  }
`

const FiltersWrapper = styled.div`
  width: 100%;
  max-width: 2000px;
  margin: 0 auto;
  padding: 0 20px;
`

const TopFiltersBar = styled.div`
  position: sticky;
  top: -32px;
  width: 100%;
  max-width: 2000px;
  margin: 0 auto 40px;
  padding: 16px 20px;
  background: #151A1F;
  border-radius: 8px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  z-index: 100;
  
  @media (max-width: 1200px) {
    z-index: 80; /* below header (100) but above content */
    top: 4px;
  
  }
  
  @media (max-width: 768px) {
    position: relative;
    top: 0;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    border-bottom: none;
  }
`

const TopFilterItem = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.2s ease;
  
  &:first-child {
    padding-left: 0;
  }
  
  &:last-child {
    padding-right: 0;
  }
  
  &:not(:last-child)::after {
    content: '';
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 1px;
    height: 24px;
    background: rgba(255, 255, 255, 0.1);
  }
  
  &:hover {
    opacity: 1;
  }
  
  @media (max-width: 768px) {
    width: 100%;
    padding: 12px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    
    &:not(:last-child)::after {
      display: none;
    }
  }
`

const GameIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 6px;
  background: linear-gradient(135deg, #4285F4 0%, #EA4335 50%, #9C27B0 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    inset: 2px;
    background: 
      linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%),
      linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 25%, #45B7D1 50%, #FFA07A 75%, #98D8C8 100%);
    background-size: 200% 200%, 100% 100%;
    border-radius: 4px;
  }
`

const FilterText = styled.span`
  color: #FFFFFF;
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  font-weight: 400;
  flex: 1;
`

const TopChevronIcon = styled.svg`
  width: 16px;
  height: 16px;
  fill: #FFFFFF;
  flex-shrink: 0;
  transition: transform 0.3s ease;
  
  ${props => props.$isOpen && `
    transform: rotate(180deg);
  `}
`

const TopDropdownMenu = styled.div`
  position: absolute;
  top: calc(100% + 12px);
  left: 0;
  min-width: 200px;
  background: #151A1F; /* solid, non-transparent */
  border: 1px solid #66B22E;
  border-radius: 8px;
  padding: 8px 0;
  z-index: 300; /* ensure in front of page content */
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
  max-height: 200px;
  overflow-y: auto;
  display: ${props => props.$isOpen ? 'block' : 'none'};
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: #151A1F;
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #66B22E;
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: #5a9e28;
  }
`

const FindTournamentsSection = styled.div`
  width: 100%;
  max-width: 2000px;
  margin: 0 auto 40px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 24px;
  }
`

const SectionTitle = styled.h2`
  font-family: 'Orbitron', sans-serif;
  font-size: 2rem;
  font-weight: 700;
  color: #FFFFFF;
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`

const SectionHeader = styled.div`
  width: calc(100% + 40px);
  margin-left: -20px;
  margin-right: -20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 24px;
  
  @media (max-width: 768px) {
    width: calc(100% + 40px);
    margin-left: -20px;
    margin-right: -20px;
  }
`

const FiltersContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    width: 100%;
    flex-direction: column;
    gap: 12px;
  }
`

const FilterDropdown = styled.div`
  position: relative;
  min-width: 180px;
  
  @media (max-width: 1200px) {
    display: none;
  }
  
  @media (max-width: 768px) {
    width: 100%;
  }
`

const FilterButton = styled.button`
  width: 100%;
  padding: 12px 16px;
  background: #1A1F26;
  border: 1px solid #66B22E;
  border-radius: 8px;
  color: #FFFFFF;
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  font-weight: 400;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(102, 178, 46, 0.1);
    border-color: #66B22E;
  }
  
  ${props => props.$isOpen && `
    background: rgba(102, 178, 46, 0.1);
    border-color: #66B22E;
  `}
`

const ChevronIcon = styled.svg`
  width: 16px;
  height: 16px;
  fill: #FFFFFF;
  transition: transform 0.3s ease;
  
  ${props => props.$isOpen && `
    transform: rotate(180deg);
  `}
`

const DropdownMenu = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  background: #1A1F26;
  border: 1px solid #66B22E;
  border-radius: 8px;
  padding: 8px 0;
  z-index: 100;
  max-height: 200px;
  overflow-y: auto;
  display: ${props => props.$isOpen ? 'block' : 'none'};
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: #151A1F;
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #66B22E;
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: #5a9e28;
  }
`

const MobileFiltersWrapper = styled.div`
  position: relative;
  display: none;
  
  @media (max-width: 1200px) {
    display: block;
  }
`

const MobileFiltersToggle = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  transition: all 0.2s ease;
  
  img {
    width: 48px;
    height: 48px;
    display: block;
  }
`

const MobileFiltersMenu = styled.div`
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  width: 280px;
  background: #151A1F;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 16px;
  z-index: 200;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
`

const MobileGroupTitle = styled.div`
  color: #FFFFFF;
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  font-weight: 700;
  opacity: 0.7;
  margin: 14px 4px 8px;
`

const MobileFiltersTitle = styled.div`
  color: #FFFFFF;
  font-family: 'Orbitron', sans-serif;
  font-size: 18px;
  font-weight: 700;
  margin: 2px 4px 6px;
`

const MobileOptionRow = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 8px;
  border-radius: 10px;
  background: transparent;
  border: 1px solid transparent;
  color: #FFFFFF;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease;
  
  &:hover {
    background: rgba(102, 178, 46, 0.08);
    border-color: rgba(102, 178, 46, 0.25);
  }
`

const CheckBox = styled.span`
  width: 18px;
  height: 18px;
  border-radius: 4px;
  border: 1px solid ${props => props.$checked ? '#66B22E' : 'rgba(255, 255, 255, 0.25)'};
  background: ${props => props.$checked ? '#66B22E' : 'transparent'};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  
  svg {
    width: 12px;
    height: 12px;
    fill: #0A0E12;
    display: ${props => props.$checked ? 'block' : 'none'};
  }
`

const MobileActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: 14px;
`

const ClearAllButton = styled.button`
  flex: 1;
  padding: 10px 14px;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: #D1D5DB;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: opacity 0.2s ease;
  
  &:hover { opacity: 0.9; }
`

const ApplyButton = styled.button`
  flex: 1;
  padding: 10px 14px;
  border-radius: 9999px;
  background: #66B22E;
  border: 1px solid #66B22E;
  color: #0A0E12;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  transition: transform 0.1s ease;
  
  &:active { transform: scale(0.98); }
`

const DropdownItem = styled.button`
  width: 100%;
  padding: 10px 16px;
  background: #1A1F26;
  border: none;
  color: #FFFFFF;
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  text-align: left;
  cursor: pointer;
  transition: background 0.2s ease;
  
  &:hover {
    background: #243022;
  }
  
  ${props => props.$isSelected && `
    background: #30442b;
    color: #66B22E;
    font-weight: 600;
  `}
`

const TournamentsGrid = styled.div`
  width: 100%;
  max-width: 2000px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  margin-bottom: 60px;
  
  @media (max-width: 640px) {
    flex-direction: column;
  }
`

const TournamentCard = styled.div`
  background: rgba(24, 24, 27, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  cursor: pointer;
  max-width: 360px;
  flex: 1 1 calc((100% - 48px) / 3);
  min-width: 280px;
  
  &:hover {
    transform: translateY(-5px);
    border-color: #66B22E;
    box-shadow: 0 10px 30px rgba(102, 178, 46, 0.2);
  }
  
  &::after {
    content: '';
    position: absolute;
    left: 50%;
    top: 55%;
    transform: translate(-50%, -50%);
    width: 140%;
    height: 160%;
    pointer-events: none;
    background: radial-gradient(50% 50% at 50% 50%, rgba(75, 93, 54, 0.5) 0%, rgba(75, 93, 54, 0.25) 40%, rgba(75, 93, 54, 0.0) 70%);
    filter: blur(40px);
    mix-blend-mode: screen;
    z-index: 0;
  }
  
  @media (max-width: 640px) {
    max-width: 100%;
    min-width: 100%;
    flex: 1 1 100%;
  }
`

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  overflow: visible;
  z-index: 1;
`

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  position: relative;
  z-index: 1;
`

const RegistrationBadge = styled.div`
  position: absolute;
  bottom: -14px;
  left: 16px;
  background: #18181B;
  border-radius: 20px;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  color: #FFFFFF;
  z-index: 10;
  
  &::before {
    content: '';
    width: 8px;
    height: 8px;
    background: #00AA06;
    border-radius: 50%;
  }
`

const CardContent = styled.div`
  padding: 20px;
  padding-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: relative;
  z-index: 1;
`

const TournamentTitle = styled.h3`
  font-family: 'Orbitron', sans-serif;
  font-size: 1.3rem;
  font-weight: 700;
  color: #FFFFFF;
  margin: 0;
  line-height: 1.3;
`

const MatchDetails = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  color: #A1A1AA;
  margin: 0;
`

const DateTime = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  color: #A1A1AA;
  margin: 0;
`

const TeamProgress = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

const TeamAvatars = styled.div`
  display: flex;
  gap: -8px;
  
  .avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: #2E3440;
    border: 2px solid #18181B;
    margin-left: -8px;
    
    &:first-child {
      margin-left: 0;
    }
  }
`

const TeamCount = styled.span`
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  color: #A1A1AA;
`

const CardFooter = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`

const FooterBadge = styled.div`
  background: rgba(24, 24, 27, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 6px 12px;
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  font-weight: 500;
  color: #FFFFFF;
`

const LiveStreamsSection = styled.div`
  width: 100%;
  max-width: 2000px;
  margin: 0 auto 60px;
  padding: 0 20px;
`

const LiveStreamsHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 32px;
`

const LiveStreamsTitle = styled.h2`
  font-family: 'Orbitron', sans-serif;
  font-size: 2rem;
  font-weight: 700;
  color: #FFFFFF;
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`

const ViewAllButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 18px;
  border-radius: 9999px;
  border: 1px solid #66B22E;
  background: rgba(102, 178, 46, 0.15);
  color: #66B22E;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  svg {
    width: 16px;
    height: 16px;
    fill: currentColor;
  }
  
  &:hover {
    background: #66B22E;
    color: #0A0E12;
  }
  
  &:active {
    transform: scale(0.97);
  }
  
  @media (max-width: 768px) {
    align-self: flex-start;
  }
`

const LiveStreamsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  
  @media (max-width: 640px) {
    flex-direction: column;
  }
`

const CommunitiesSection = styled.div`
  width: 100%;
  max-width: 2000px;
  margin: 0 auto 60px;
  padding: 0 20px;
`

const CommunitiesHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 32px;
`

const CommunitiesTitle = styled.h2`
  font-family: 'Orbitron', sans-serif;
  font-size: 2rem;
  font-weight: 700;
  color: #FFFFFF;
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`

const CommunitiesGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  
  > * {
    flex: 1 1 calc((100% - 24px) / 2);
    max-width: calc((100% - 24px) / 2);
  }
  
  @media (max-width: 965px) {
    > * {
      flex: 1 1 100%;
      max-width: 100%;
    }
  }
  
  @media (max-width: 640px) {
    flex-direction: column;
  }
`

const DashboardPage = () => {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
    const [leftSidebarOpen, setLeftSidebarOpen] = useState(false)
    const [rightSidebarOpen, setRightSidebarOpen] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [openDropdown, setOpenDropdown] = useState(null)
    const [selectedFilters, setSelectedFilters] = useState({
        games: 'All Games',
        regions: 'All Regions',
        platforms: 'All Platforms',
        date: 'All Dates',
        prizePool: 'All Prizes',
        gameType: 'All Types'
    })

    const toggleSidebar = () => {
        setSidebarCollapsed(!sidebarCollapsed)
    }

    const toggleLeftSidebar = () => {
        setLeftSidebarOpen(!leftSidebarOpen)
    }

    const toggleRightSidebar = () => {
        setRightSidebarOpen(!rightSidebarOpen)
    }

    const closeSidebars = () => {
        setLeftSidebarOpen(false)
        setRightSidebarOpen(false)
    }

    const gameImages = [gtaVI, redDead, streetFighter, valorant, cod]

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === 0 ? gameImages.length - 1 : prevIndex - 1
        )
    }

    const handleNext = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === gameImages.length - 1 ? 0 : prevIndex + 1
        )
    }

    const toggleDropdown = (dropdown) => {
        setOpenDropdown(openDropdown === dropdown ? null : dropdown)
    }

    const handleFilterSelect = (filterType, value) => {
        setSelectedFilters(prev => ({
            ...prev,
            [filterType]: value
        }))
        setOpenDropdown(null)
    }

    const gamesOptions = ['All Games', 'GTA VI', 'Red Dead Redemption', 'Street Fighter', 'Valorant', 'Call of Duty']
    const regionsOptions = ['All Regions', 'North America', 'Europe', 'Asia', 'South America', 'Africa', 'Oceania']
    const platformsOptions = ['All Platforms', 'PC', 'PlayStation', 'Xbox', 'Nintendo Switch', 'Mobile']
    const dateOptions = ['All Dates', 'Today', 'This Week', 'This Month', 'Upcoming']
    const prizePoolOptions = ['All Prizes', '$0 - $1,000', '$1,000 - $5,000', '$5,000 - $10,000', '$10,000+']
    const gameTypeOptions = ['All Types', 'Solo', 'Duo', 'Squad', 'Team']

    const dropdownRef = useRef(null)
    const mobileFiltersRef = useRef(null)
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpenDropdown(null)
            }
        }

        if (openDropdown) {
            document.addEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [openDropdown])
    
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (mobileFiltersRef.current && !mobileFiltersRef.current.contains(event.target)) {
                setMobileFiltersOpen(false)
            }
        }
        if (mobileFiltersOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [mobileFiltersOpen])

    return (
        <DashboardLayout>
            <Overlay $visible={leftSidebarOpen} onClick={closeSidebars} />
            <MobileHeader>
                <TopNavBar>
                    <MobileHamburgerButton onClick={toggleLeftSidebar}>
                        <svg viewBox="0 0 24 24">
                            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
                        </svg>
                    </MobileHamburgerButton>
                    <MobileUserAvatar>
                        <div style={{
                            width: '100%',
                            height: '100%',
                            background: 'linear-gradient(135deg, #4285F4 0%, #EA4335 50%, #9C27B0 100%)',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#FFFFFF',
                            fontSize: '16px',
                            fontWeight: '600'
                        }}>
                            BS
                        </div>
                    </MobileUserAvatar>
                </TopNavBar>
                <SearchSection>
                    <SearchBar>
                        <img src={searchIcon} alt="Search" />
                        <input type="text" placeholder="Search" />
                    </SearchBar>
                    <MobileIconButton>
                        <img src={notificationIcon} alt="Notifications" />
                        <NotificationBadge />
                    </MobileIconButton>
                    <MobileIconButton>
                        <img src={chatIcon} alt="Chat" />
                    </MobileIconButton>
                </SearchSection>
            </MobileHeader>
            <Sidebar 
                collapsed={sidebarCollapsed} 
                onToggle={toggleSidebar}
                isOpen={leftSidebarOpen}
                onClose={() => {
                    setLeftSidebarOpen(false)
                }}
            />
            <MainContent $collapsed={sidebarCollapsed}>
               
                
                <CarouselContainer>
                    <CarouselWrapper>
                        <ArrowButton $direction="left" onClick={handlePrevious}>
                            <ArrowIcon viewBox="0 0 24 24">
                                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                            </ArrowIcon>
                        </ArrowButton>
                        
                        <CarouselTrack>
                            {gameImages.map((image, index) => {
                                // Calculate circular distance
                                const directDistance = Math.abs(index - currentIndex)
                                const wrapDistance = gameImages.length - directDistance
                                const distance = Math.min(directDistance, wrapDistance)
                                
                                // Determine if it's on the left or right side
                                let sideDirection = 0
                                if (index !== currentIndex) {
                                    const forwardDist = (index - currentIndex + gameImages.length) % gameImages.length
                                    const backwardDist = (currentIndex - index + gameImages.length) % gameImages.length
                                    sideDirection = forwardDist <= backwardDist ? 1 : -1
                                }
                                
                                const isCenter = index === currentIndex
                                const isNear = distance === 1
                                
                                return (
                                    <CarouselItem
                                        key={index}
                                        $index={index}
                                        $centerIndex={currentIndex}
                                        $sideDirection={sideDirection}
                                        $isCenter={isCenter}
                                        $isNear={isNear}
                                        onClick={() => setCurrentIndex(index)}
                                    >
                                        <GameImage src={image} alt={['GTA VI', 'Red Dead Redemption', 'Street Fighter', 'Valorant', 'Call of Duty'][index]} />
                                    </CarouselItem>
                                )
                            })}
                        </CarouselTrack>
                        
                        <ArrowButton $direction="right" onClick={handleNext}>
                            <ArrowIcon viewBox="0 0 24 24">
                                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                            </ArrowIcon>
                        </ArrowButton>
                    </CarouselWrapper>
                </CarouselContainer>
                
                <TopFiltersBar ref={dropdownRef}>
                    <TopFilterItem onClick={() => toggleDropdown('games')}>
                        <GameIcon />
                        <FilterText>{selectedFilters.games}</FilterText>
                        <TopChevronIcon 
                            $isOpen={openDropdown === 'games'}
                            viewBox="0 0 24 24"
                        >
                            <path d="M7 10l5 5 5-5z"/>
                        </TopChevronIcon>
                        <TopDropdownMenu $isOpen={openDropdown === 'games'}>
                            {gamesOptions.map((option) => (
                                <DropdownItem
                                    key={option}
                                    $isSelected={selectedFilters.games === option}
                                    onClick={() => handleFilterSelect('games', option)}
                                >
                                    {option}
                                </DropdownItem>
                            ))}
                        </TopDropdownMenu>
                    </TopFilterItem>
                    
                    <TopFilterItem onClick={() => toggleDropdown('regions')}>
                        <FilterText>{selectedFilters.regions}</FilterText>
                        <TopChevronIcon 
                            $isOpen={openDropdown === 'regions'}
                            viewBox="0 0 24 24"
                        >
                            <path d="M7 10l5 5 5-5z"/>
                        </TopChevronIcon>
                        <TopDropdownMenu $isOpen={openDropdown === 'regions'}>
                            {regionsOptions.map((option) => (
                                <DropdownItem
                                    key={option}
                                    $isSelected={selectedFilters.regions === option}
                                    onClick={() => handleFilterSelect('regions', option)}
                                >
                                    {option}
                                </DropdownItem>
                            ))}
                        </TopDropdownMenu>
                    </TopFilterItem>
                    
                    <TopFilterItem onClick={() => toggleDropdown('platforms')}>
                        <FilterText>{selectedFilters.platforms}</FilterText>
                        <TopChevronIcon 
                            $isOpen={openDropdown === 'platforms'}
                            viewBox="0 0 24 24"
                        >
                            <path d="M7 10l5 5 5-5z"/>
                        </TopChevronIcon>
                        <TopDropdownMenu $isOpen={openDropdown === 'platforms'}>
                            {platformsOptions.map((option) => (
                                <DropdownItem
                                    key={option}
                                    $isSelected={selectedFilters.platforms === option}
                                    onClick={() => handleFilterSelect('platforms', option)}
                                >
                                    {option}
                                </DropdownItem>
                            ))}
                        </TopDropdownMenu>
                    </TopFilterItem>
                </TopFiltersBar>
                
                <FiltersWrapper>
                    <FindTournamentsSection>
                    <SectionHeader>
                        <SectionTitle>Find Tournaments</SectionTitle>
                        <TournamentFilters 
                            value={{
                                date: selectedFilters.date,
                                prizePool: selectedFilters.prizePool,
                                gameType: selectedFilters.gameType
                            }}
                            onChange={(filters) => {
                                setSelectedFilters(prev => ({ ...prev, ...filters }))
                            }}
                        />
                    </SectionHeader>
                </FindTournamentsSection>
                </FiltersWrapper>
                
                <TournamentsGrid>
                    {tournamentsData.slice(0, 6).map((tournament) => (
                        <TournamentCard key={tournament.id}>
                            <ImageContainer>
                                <CardImage src={tournament.image} alt={tournament.title} />
                                <RegistrationBadge>Registration Ongoing</RegistrationBadge>
                            </ImageContainer>
                            <CardContent>
                                <TournamentTitle>{tournament.title}</TournamentTitle>
                                <MatchDetails>{tournament.matchType}</MatchDetails>
                                <DateTime>{tournament.date}</DateTime>
                                <TeamProgress>
                                    <TeamAvatars>
                                        <div className="avatar" />
                                        <div className="avatar" />
                                        <div className="avatar" />
                                    </TeamAvatars>
                                    <TeamCount>{tournament.teams.current}/{tournament.teams.total} Teams</TeamCount>
                                </TeamProgress>
                                <CardFooter>
                                    <FooterBadge>Prize Pool: ${tournament.prizePoolValue >= 1000 ? `${(tournament.prizePoolValue / 1000).toFixed(0)}K` : tournament.prizePoolValue}</FooterBadge>
                                    <FooterBadge>{tournament.entry}</FooterBadge>
                                    <FooterBadge>{tournament.gameType}</FooterBadge>
                                </CardFooter>
                            </CardContent>
                        </TournamentCard>
                    ))}
                </TournamentsGrid>
                
                <LiveStreamsSection>
                    <LiveStreamsHeader>
                        <LiveStreamsTitle>LiveStreams</LiveStreamsTitle>
                <ViewAllButton>
                    View All
                    <svg viewBox="0 0 24 24">
                        <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                    </svg>
                </ViewAllButton>
                    </LiveStreamsHeader>
                    <LiveStreamsGrid>
                        {livestreamsData.slice(0, 3).map((stream) => (
                            <LivestreamCard
                                key={stream.id}
                                thumbnail={stream.thumbnail}
                                alt={stream.alt}
                                streamer={stream.streamer}
                                title={stream.title}
                                viewers={stream.viewers}
                            />
                        ))}
                    </LiveStreamsGrid>
                </LiveStreamsSection>
                
                <CommunitiesSection>
                    <CommunitiesHeader>
                        <CommunitiesTitle>Communities</CommunitiesTitle>
                <ViewAllButton>
                    View All
                    <svg viewBox="0 0 24 24">
                        <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                    </svg>
                </ViewAllButton>
                    </CommunitiesHeader>
                    <CommunitiesGrid>
                        {communitiesData.slice(0, 6).map((community) => (
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
                    </CommunitiesGrid>
                </CommunitiesSection>
            </MainContent>
            <RightSidebar isOpen={true} onClose={closeSidebars} />
        </DashboardLayout>
    )
}

export default DashboardPage

