import React, { useState } from 'react'
import styled from 'styled-components'

const NavbarContainer = styled.nav`
  background: #1A1A1A;
  border: 1px solid #333333;
  border-radius: 50px;
  padding: 12px 32px;
  margin: 20px auto;
  max-width: 1200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 40px);
  max-width: 1200px;
  z-index: 10;
  
  @media (max-width: 768px) {
    padding: 12px 20px;
    width: calc(100% - 20px);
  }
`

const Logo = styled.div`
  font-family: 'Orbitron', sans-serif;
  font-size: 24px;
  font-weight: 700;
  display: flex;
  align-items: center;
  
  .play {
    color: #FFFFFF;
  }
  
  .hive {
    color: #66B22E;
  }
`

const NavLinks = styled.ul`
  display: flex;
  list-style: none;
  gap: 40px;
  margin: 0;
  padding: 0;
  
  @media (max-width: 768px) {
    display: none;
  }
`

const NavLink = styled.li`
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  font-weight: 500;
  color: ${props => props.active ? '#66B22E' : '#CCCCCC'};
  cursor: pointer;
  transition: color 0.3s ease;
  
  &:hover {
    color: #66B22E;
  }
`

const CTAButton = styled.button`
  background: #5C8D30;
  color: #FFFFFF;
  border: none;
  border-radius: 25px;
  padding: 12px 24px;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #66B22E;
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(102, 178, 46, 0.3);
  }
  
  @media (max-width: 768px) {
    display: none;
  }
`

const HamburgerMenu = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  flex-direction: column;
  justify-content: space-around;
  width: 30px;
  height: 30px;
  
  @media (max-width: 768px) {
    display: flex;
  }
`

const HamburgerLine = styled.span`
  width: 25px;
  height: 3px;
  background: #FFFFFF;
  border-radius: 2px;
  transition: all 0.3s ease;
  
  &:nth-child(1) {
    transform: ${props => props.isOpen ? 'rotate(45deg) translate(6px, 6px)' : 'none'};
  }
  
  &:nth-child(2) {
    opacity: ${props => props.isOpen ? '0' : '1'};
  }
  
  &:nth-child(3) {
    transform: ${props => props.isOpen ? 'rotate(-45deg) translate(6px, -6px)' : 'none'};
  }
`

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    return (
        <NavbarContainer>
            <Logo>
                <span className="play">Play</span>
                <span className="hive">Hive</span>
            </Logo>
            
            <NavLinks>
                <NavLink active>Home</NavLink>
                <NavLink>Tournaments</NavLink>
                <NavLink>Communities</NavLink>
                <NavLink>About Us</NavLink>
            </NavLinks>

            <CTAButton>Join The Hive Now</CTAButton>
            
            <HamburgerMenu onClick={toggleMenu}>
                <HamburgerLine isOpen={isMenuOpen} />
                <HamburgerLine isOpen={isMenuOpen} />
                <HamburgerLine isOpen={isMenuOpen} />
            </HamburgerMenu>
        </NavbarContainer>
    )
}

export default Navbar