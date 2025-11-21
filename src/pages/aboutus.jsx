import React from 'react'
import styled from 'styled-components'
import Navbar from '../Components/navbar'
import Footer from '../Components/footer'

const AboutUsContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

const ContentSection = styled.div`
  flex: 1;
  padding: 180px 20px 80px 20px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`

const ComingSoonTitle = styled.h1`
  font-family: 'Orbitron', sans-serif;
  font-size: 3rem;
  font-weight: 700;
  color: #FFFFFF;
  margin: 0 0 24px 0;
  text-transform: uppercase;
  letter-spacing: 2px;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`

const ComingSoonMessage = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 1.2rem;
  color: #A1A1AA;
  margin: 0;
  max-width: 600px;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`

const AboutUs = () => {
  return (
    <AboutUsContainer>
      <Navbar />
      <ContentSection>
        <ComingSoonTitle>About Us</ComingSoonTitle>
        <ComingSoonMessage>
          We're working on something amazing! Our About Us page is coming soon. 
          Check back later to learn more about PlayHive and our mission to revolutionize e-sports.
        </ComingSoonMessage>
      </ContentSection>
      <Footer />
    </AboutUsContainer>
  )
}

export default AboutUs

