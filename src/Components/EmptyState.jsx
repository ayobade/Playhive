import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  text-align: center;
`

const IconWrapper = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: rgba(102, 178, 46, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  
  svg {
    width: 60px;
    height: 60px;
    stroke: #66B22E;
  }
  
  img {
    width: 60px;
    height: 60px;
    object-fit: contain;
  }
`

const Title = styled.h3`
  margin: 0 0 12px 0;
  color: #FFFFFF;
  font-family: 'Orbitron', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
`

const Message = styled.p`
  margin: 0 0 32px 0;
  color: #A1A1AA;
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  max-width: 400px;
`

const ActionButton = styled.button`
  padding: 12px 24px;
  border-radius: 10px;
  background: #66B22E;
  border: 1px solid #66B22E;
  color: #0A0E12;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: #5C8D30;
    border-color: #5C8D30;
  }
`

const EmptyState = ({ icon, iconSrc, title, message, actionLabel, onAction }) => {
  return (
    <Container>
      <IconWrapper>
        {iconSrc ? (
          <img src={iconSrc} alt={title} />
        ) : icon ? (
          icon
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
        )}
      </IconWrapper>
      <Title>{title}</Title>
      <Message>{message}</Message>
      {actionLabel && onAction && (
        <ActionButton onClick={onAction}>{actionLabel}</ActionButton>
      )}
    </Container>
  )
}

export default EmptyState

