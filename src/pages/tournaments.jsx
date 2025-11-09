import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import Navbar from '../Components/navbar'
import Footer from '../Components/footer'
import { tournamentsData } from '../data/dataBank'

const TournamentsContainer = styled.div`
  padding: 180px 20px 80px 20px;
  max-width: 1200px;
  margin: 0 auto;
  min-height: 80vh;
`

const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 40px;
  gap: 20px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`

const PageTitle = styled.h1`
  font-family: 'Orbitron', sans-serif;
  font-size: 3rem;
  font-weight: 700;
  color: #FFFFFF;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 2px;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`

const CreateButton = styled.button`
  background: #FFFFFF;
  color: #0A0E12;
  border: none;
  border-radius: 25px;
  padding: 12px 24px;
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  white-space: nowrap;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(255, 255, 255, 0.2);
  }
  
  svg {
    width: 18px;
    height: 18px;
    fill: #66B22E;
  }
`

const FiltersContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 40px;
  flex-wrap: wrap;
  align-items: center;

  
  @media (max-width: 640px) {
    flex-direction: column;
  }
`

const ResetButton = styled.button`
  background: rgba(102, 178, 46, 0.1);
  border: 1px solid rgba(102, 178, 46, 0.3);
  border-radius: 8px;
  padding: 12px 20px;
  color: #66B22E;
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  white-space: nowrap;
  
  &:hover {
    background: rgba(102, 178, 46, 0.2);
    border-color: rgba(102, 178, 46, 0.5);
    transform: translateY(-1px);
  }
  
  svg {
    width: 16px;
    height: 16px;
    fill: currentColor;
  }
  
  @media (max-width: 640px) {
    width: 100%;
    justify-content: center;
  }
`

const FilterDropdown = styled.div`
  position: relative;
  min-width: 180px;
  flex: 1;
  
`

const FilterButton = styled.button`
  background: rgba(24, 24, 27, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 12px 16px;
  color: #FFFFFF;
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: rgba(102, 178, 46, 0.5);
  }
  
  svg {
    width: 16px;
    height: 16px;
    fill: currentColor;
    transform: ${props => props.$isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
    transition: transform 0.3s ease;
  }
`

const DropdownMenu = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  background: rgba(24, 24, 27, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 8px 0;
  z-index: 100;
  display: ${props => props.$isOpen ? 'block' : 'none'};
  backdrop-filter: blur(10px);
  max-height: 200px;
  overflow-y: auto;
  
  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }
  
  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none;
  scrollbar-width: none;
`

const DropdownItem = styled.button`
  width: 100%;
  padding: 10px 16px;
  background: transparent;
  border: none;
  color: #FFFFFF;
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(102, 178, 46, 0.1);
    color: #66B22E;
  }
  
  ${props => props.$active && `
    background: rgba(102, 178, 46, 0.2);
    color: #66B22E;
  `}
`

const TournamentsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
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

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 60px;
`

const PaginationButton = styled.button`
  background: ${props => props.$active ? '#669933' : '#3E5031'};
  border: none;
  border-radius: 8px;
  padding: 10px 16px;
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  font-weight: 600;
  color: ${props => {
    if (props.$active) return '#FFFFFF'
    if (props.$inactive) return '#A0A0A0'
    if (props.$disabled) return '#A0A0A0'
    return '#FFFFFF'
  }};
  cursor: ${props => props.$disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.3s ease;
  min-width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover:not(:disabled) {
    background: ${props => props.$active ? '#669933' : '#4A5F3A'};
    transform: translateY(-1px);
  }
  
  &:disabled {
    opacity: 0.8;
  }
  
  svg {
    width: 18px;
    height: 18px;
    fill: currentColor;
  }
`

const TournamentsPage = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [openDropdown, setOpenDropdown] = useState(null)
    const [filters, setFilters] = useState({
        game: 'All Games',
        region: 'All Region',
        prizePool: 'All Prizes',
        gameType: 'All Types'
    })
    const filterRef = useRef(null)
    
    const gameOptions = ['All Games', 'Call of Duty', 'Valorant', 'FC25', 'Apex Legends', 'UFC', 'Modern Strike']
    const regionOptions = ['All Region', 'North America', 'Europe', 'Asia', 'South America', 'Africa', 'Oceania']
    const prizePoolOptions = ['All Prizes', '$0 - $10,000', '$10,000 - $50,000', '$50,000 - $100,000', '$100,000+']
    const gameTypeOptions = ['All Types', 'Online', 'Offline', 'Hybrid']
    
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (filterRef.current && !filterRef.current.contains(event.target)) {
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
    
    const handleFilterClick = (filterType) => {
        setOpenDropdown(openDropdown === filterType ? null : filterType)
    }
    
    const handleFilterSelect = (filterType, value) => {
        setFilters(prev => ({ ...prev, [filterType]: value }))
        setOpenDropdown(null)
        setCurrentPage(1)
    }
    
    const handleResetFilters = () => {
        setFilters({
            game: 'All Games',
            region: 'All Region',
            prizePool: 'All Prizes',
            gameType: 'All Types'
        })
        setOpenDropdown(null)
        setCurrentPage(1)
    }
    
    
    const getPrizePoolRange = (value) => {
        if (value < 10000) return '$0 - $10,000'
        if (value < 50000) return '$10,000 - $50,000'
        if (value < 100000) return '$50,000 - $100,000'
        return '$100,000+'
    }
    
    const filteredTournaments = tournamentsData.filter(tournament => {
        const gameMatch = filters.game === 'All Games' || tournament.game === filters.game
        const regionMatch = filters.region === 'All Region' || tournament.region === filters.region
        const prizePoolMatch = filters.prizePool === 'All Prizes' || getPrizePoolRange(tournament.prizePoolValue) === filters.prizePool
        const gameTypeMatch = filters.gameType === 'All Types' || tournament.gameType === filters.gameType
        
        return gameMatch && regionMatch && prizePoolMatch && gameTypeMatch
    })
    
    const cardsPerPage = 6
    const totalPages = Math.ceil(filteredTournaments.length / cardsPerPage)
    const startIndex = (currentPage - 1) * cardsPerPage
    const endIndex = startIndex + cardsPerPage
    const paginatedTournaments = filteredTournaments.slice(startIndex, endIndex)
    
    useEffect(() => {
        if (currentPage > totalPages && totalPages > 0) {
            setCurrentPage(1)
        }
    }, [totalPages, currentPage])
    
    const formatPrizePool = (value) => {
        if (value >= 1000) {
            return `$${(value / 1000).toFixed(0)}K`
        }
        return `$${value}`
    }
    
    const renderPaginationButtons = () => {
        const buttons = []
        
        buttons.push(
            <PaginationButton 
                key="prev"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                $inactive={currentPage === 1}
            >
                <svg viewBox="0 0 24 24">
                    <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                </svg>
            </PaginationButton>
        )
        
        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) {
                buttons.push(
                    <PaginationButton 
                        key={i}
                        $active={currentPage === i}
                        onClick={() => setCurrentPage(i)}
                    >
                        {i}
                    </PaginationButton>
                )
            }
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 4; i++) {
                    buttons.push(
                        <PaginationButton 
                            key={i}
                            $active={currentPage === i}
                            onClick={() => setCurrentPage(i)}
                        >
                            {i}
                        </PaginationButton>
                    )
                }
                buttons.push(
                    <PaginationButton key="ellipsis1" $inactive disabled>
                        ...
                    </PaginationButton>
                )
                buttons.push(
                    <PaginationButton 
                        key={totalPages}
                        $active={currentPage === totalPages}
                        onClick={() => setCurrentPage(totalPages)}
                    >
                        {totalPages}
                    </PaginationButton>
                )
            } else if (currentPage >= totalPages - 2) {
                buttons.push(
                    <PaginationButton 
                        key={1}
                        $active={currentPage === 1}
                        onClick={() => setCurrentPage(1)}
                    >
                        1
                    </PaginationButton>
                )
                buttons.push(
                    <PaginationButton key="ellipsis1" $inactive disabled>
                        ...
                    </PaginationButton>
                )
                for (let i = totalPages - 3; i <= totalPages; i++) {
                    buttons.push(
                        <PaginationButton 
                            key={i}
                            $active={currentPage === i}
                            onClick={() => setCurrentPage(i)}
                        >
                            {i}
                        </PaginationButton>
                    )
                }
            } else {
                buttons.push(
                    <PaginationButton 
                        key={1}
                        $active={currentPage === 1}
                        onClick={() => setCurrentPage(1)}
                    >
                        1
                    </PaginationButton>
                )
                buttons.push(
                    <PaginationButton key="ellipsis1" $inactive disabled>
                        ...
                    </PaginationButton>
                )
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    buttons.push(
                        <PaginationButton 
                            key={i}
                            $active={currentPage === i}
                            onClick={() => setCurrentPage(i)}
                        >
                            {i}
                        </PaginationButton>
                    )
                }
                buttons.push(
                    <PaginationButton key="ellipsis2" $inactive disabled>
                        ...
                    </PaginationButton>
                )
                buttons.push(
                    <PaginationButton 
                        key={totalPages}
                        $active={currentPage === totalPages}
                        onClick={() => setCurrentPage(totalPages)}
                    >
                        {totalPages}
                    </PaginationButton>
                )
            }
        }
        
        buttons.push(
            <PaginationButton 
                key="next"
                disabled={currentPage === totalPages || totalPages === 0}
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                $inactive={currentPage === totalPages || totalPages === 0}
            >
                <svg viewBox="0 0 24 24">
                    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                </svg>
            </PaginationButton>
        )
        
        return buttons
    }

    return (
        <>
            <Navbar />
            <TournamentsContainer>
                <HeaderSection>
                    <PageTitle>All Tournaments</PageTitle>
                    <CreateButton>
                        <svg viewBox="0 0 24 24">
                            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                        </svg>
                        Create Tournament
                    </CreateButton>
                </HeaderSection>
                
                <FiltersContainer ref={filterRef}>
                    <FilterDropdown>
                        <FilterButton 
                            onClick={() => handleFilterClick('game')}
                            $isOpen={openDropdown === 'game'}
                        >
                            {filters.game}
                            <svg viewBox="0 0 24 24">
                                <path d="M7 10l5 5 5-5z"/>
                            </svg>
                        </FilterButton>
                        <DropdownMenu $isOpen={openDropdown === 'game'}>
                            {gameOptions.map((option) => (
                                <DropdownItem
                                    key={option}
                                    onClick={() => handleFilterSelect('game', option)}
                                    $active={filters.game === option}
                                >
                                    {option}
                                </DropdownItem>
                            ))}
                        </DropdownMenu>
                    </FilterDropdown>
                    <FilterDropdown>
                        <FilterButton 
                            onClick={() => handleFilterClick('region')}
                            $isOpen={openDropdown === 'region'}
                        >
                            {filters.region}
                            <svg viewBox="0 0 24 24">
                                <path d="M7 10l5 5 5-5z"/>
                            </svg>
                        </FilterButton>
                        <DropdownMenu $isOpen={openDropdown === 'region'}>
                            {regionOptions.map((option) => (
                                <DropdownItem
                                    key={option}
                                    onClick={() => handleFilterSelect('region', option)}
                                    $active={filters.region === option}
                                >
                                    {option}
                                </DropdownItem>
                            ))}
                        </DropdownMenu>
                    </FilterDropdown>
                    <FilterDropdown>
                        <FilterButton 
                            onClick={() => handleFilterClick('prizePool')}
                            $isOpen={openDropdown === 'prizePool'}
                        >
                            {filters.prizePool}
                            <svg viewBox="0 0 24 24">
                                <path d="M7 10l5 5 5-5z"/>
                            </svg>
                        </FilterButton>
                        <DropdownMenu $isOpen={openDropdown === 'prizePool'}>
                            {prizePoolOptions.map((option) => (
                                <DropdownItem
                                    key={option}
                                    onClick={() => handleFilterSelect('prizePool', option)}
                                    $active={filters.prizePool === option}
                                >
                                    {option}
                                </DropdownItem>
                            ))}
                        </DropdownMenu>
                    </FilterDropdown>
                    <FilterDropdown>
                        <FilterButton 
                            onClick={() => handleFilterClick('gameType')}
                            $isOpen={openDropdown === 'gameType'}
                        >
                            {filters.gameType}
                            <svg viewBox="0 0 24 24">
                                <path d="M7 10l5 5 5-5z"/>
                            </svg>
                        </FilterButton>
                        <DropdownMenu $isOpen={openDropdown === 'gameType'}>
                            {gameTypeOptions.map((option) => (
                                <DropdownItem
                                    key={option}
                                    onClick={() => handleFilterSelect('gameType', option)}
                                    $active={filters.gameType === option}
                                >
                                    {option}
                                </DropdownItem>
                            ))}
                        </DropdownMenu>
                    </FilterDropdown>
                    <ResetButton onClick={handleResetFilters}>
                        <svg viewBox="0 0 24 24">
                            <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
                        </svg>
                        Reset Filters
                    </ResetButton>
                </FiltersContainer>
                
                <TournamentsGrid>
                    {paginatedTournaments.length > 0 ? (
                        paginatedTournaments.map((tournament) => (
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
                                        <FooterBadge>Prize Pool: {formatPrizePool(tournament.prizePoolValue)}</FooterBadge>
                                        <FooterBadge>{tournament.entry}</FooterBadge>
                                        <FooterBadge>{tournament.gameType}</FooterBadge>
                                    </CardFooter>
                                </CardContent>
                            </TournamentCard>
                        ))
                    ) : (
                        <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px 20px', color: '#A1A1AA', fontFamily: 'Inter, sans-serif' }}>
                            No tournaments found matching your filters.
                        </div>
                    )}
                </TournamentsGrid>
                
                {totalPages > 0 && (
                    <PaginationContainer>
                        {renderPaginationButtons()}
                    </PaginationContainer>
                )}
            </TournamentsContainer>
            <Footer />
        </>
    )
}

export default TournamentsPage
