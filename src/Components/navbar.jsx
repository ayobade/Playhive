import React from 'react'
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
`

const Navbar = () => {
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
        </NavbarContainer>
    )
}

export default Navbar