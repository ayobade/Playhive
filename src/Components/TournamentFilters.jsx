import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import filterIcon from '../assets/filter.svg'

const Wrapper = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
`

const Trigger = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0;
  background: transparent;
  border: none;
  color: #FFFFFF;
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  padding: 6px 0;
  
  img {
    width: 40px;
    height: 40px;
    display: block;
  }
`

const Dropdown = styled.div`
  position: absolute;
  top: calc(100% + 12px);
  right: 0;
  width: 280px;
  background: #151A1F;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 16px;
  z-index: 80;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.45);
`

const Title = styled.div`
  color: #FFFFFF;
  font-family: 'Orbitron', sans-serif;
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 12px;
`

const GroupTitle = styled.div`
  color: #FFFFFF;
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  font-weight: 700;
  opacity: 0.7;
  margin: 12px 4px 8px;
`

const Option = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 10px;
  border-radius: 10px;
  background: transparent;
  border: 1px solid ${props => props.$checked ? '#66B22E' : 'transparent'};
  color: #FFFFFF;
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease;
  
  &:hover {
    background: rgba(102, 178, 46, 0.1);
  }
`

const Checkbox = styled.span`
  width: 18px;
  height: 18px;
  border-radius: 4px;
  border: 2px solid ${props => props.$checked ? '#66B22E' : 'rgba(255,255,255,0.3)'};
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

const Actions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: 16px;
`

const ClearButton = styled.button`
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
`

const defaultFilters = {
  date: 'All Dates',
  prizePool: 'All Prizes',
  gameType: 'All Types'
}

const dateOptions = ['All Dates', 'Today', 'This Week', 'This Month', 'Upcoming']
const prizePoolOptions = ['All Prizes', '$0 - $1,000', '$1,000 - $5,000', '$5,000 - $10,000', '$10,000+']
const typeOptions = ['All Types', 'Solo', 'Duo', 'Squad', 'Team']

const TournamentFilters = ({ value, onChange }) => {
  const [open, setOpen] = useState(false)
  const [filters, setFilters] = useState(value || defaultFilters)
  const ref = useRef(null)

  useEffect(() => {
    const handleClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) setOpen(false)
    }
    if (open) document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [open])

  useEffect(() => {
    if (!value) return
    setFilters(value)
  }, [value?.date, value?.prizePool, value?.gameType])

  useEffect(() => {
    if (onChange) onChange(filters)
  }, [filters, onChange])

  const selectFilter = (type, value) => {
    setFilters(prev => ({ ...prev, [type]: value }))
  }

  const clearFilters = () => setFilters(defaultFilters)

  return (
    <Wrapper ref={ref}>
      <Trigger onClick={() => setOpen(v => !v)}>
        <img src={filterIcon} alt="Filter" />
      </Trigger>
      {open && (
        <Dropdown>
          <Title>Filter by</Title>
          <GroupTitle>Date</GroupTitle>
          {dateOptions.map(option => {
            const checked = filters.date === option
            return (
              <Option key={`date-${option}`} $checked={checked} onClick={() => selectFilter('date', option)}>
                <Checkbox $checked={checked}>
                  <svg viewBox="0 0 24 24">
                    <path d="M9 16.2l-3.5-3.5L4 14.2l5 5 12-12-1.5-1.5L9 16.2z"/>
                  </svg>
                </Checkbox>
                {option}
              </Option>
            )
          })}
          <GroupTitle>Prize Pool</GroupTitle>
          {prizePoolOptions.map(option => {
            const checked = filters.prizePool === option
            return (
              <Option key={`prize-${option}`} $checked={checked} onClick={() => selectFilter('prizePool', option)}>
                <Checkbox $checked={checked}>
                  <svg viewBox="0 0 24 24">
                    <path d="M9 16.2l-3.5-3.5L4 14.2l5 5 12-12-1.5-1.5L9 16.2z"/>
                  </svg>
                </Checkbox>
                {option}
              </Option>
            )
          })}
          <GroupTitle>Type</GroupTitle>
          {typeOptions.map(option => {
            const checked = filters.gameType === option
            return (
              <Option key={`type-${option}`} $checked={checked} onClick={() => selectFilter('gameType', option)}>
                <Checkbox $checked={checked}>
                  <svg viewBox="0 0 24 24">
                    <path d="M9 16.2l-3.5-3.5L4 14.2l5 5 12-12-1.5-1.5L9 16.2z"/>
                  </svg>
                </Checkbox>
                {option}
              </Option>
            )
          })}
          <Actions>
            <ClearButton onClick={clearFilters}>Clear All</ClearButton>
            <ApplyButton onClick={() => setOpen(false)}>Apply Filters</ApplyButton>
          </Actions>
        </Dropdown>
      )}
    </Wrapper>
  )
}

export default TournamentFilters


