import React from 'react'
import styled, { keyframes } from 'styled-components'

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

const pulse = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  text-align: center;
`

const Spinner = styled.div`
  width: 60px;
  height: 60px;
  border: 4px solid rgba(102, 178, 46, 0.2);
  border-top-color: #66B22E;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  margin-bottom: 24px;
`

const LoadingText = styled.p`
  margin: 0;
  color: #A1A1AA;
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
`

const SkeletonGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  width: 100%;
`

const SkeletonCard = styled.div`
  background: rgba(24, 24, 27, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 20px;
  flex: ${props => {
    if (props.$cardType === 'community') return '1 1 calc((100% - 24px) / 2)'
    if (props.$cardType === 'organization') return '1 1 300px'
    return '1 1 calc((100% - 48px) / 3)'
  }};
  min-width: 280px;
  height: ${props => {
    if (props.$cardType === 'organization') return '200px'
    if (props.$cardType === 'community') return '150px'
    return '300px'
  }};
  animation: ${pulse} 1.5s ease-in-out infinite;
  
  @media (max-width: 1494px) {
    ${props => props.$cardType === 'community' && 'flex: 1 1 calc((100% - 24px) / 2);'}
  }
  
  @media (max-width: 800px) {
    ${props => props.$cardType === 'community' && 'flex: 1 1 100%;'}
  }
  
  @media (max-width: 640px) {
    flex: 1 1 100%;
  }
`

const LoadingState = ({ type = 'spinner', skeletonCount = 6, cardType = 'default' }) => {
  if (type === 'skeleton') {
    return (
      <SkeletonGrid>
        {Array.from({ length: skeletonCount }).map((_, idx) => (
          <SkeletonCard key={idx} $cardType={cardType} />
        ))}
      </SkeletonGrid>
    )
  }

  return (
    <Container>
      <Spinner />
      <LoadingText>Loading...</LoadingText>
    </Container>
  )
}

export default LoadingState

