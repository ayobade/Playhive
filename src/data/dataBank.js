import tournament01 from '../assets/tournament01.png'
import tournament02 from '../assets/tournament02.png'
import game01 from '../assets/game01.png'
import game02 from '../assets/game02.png'
import game03 from '../assets/game03.png'
import game04 from '../assets/game04.png'
import game05 from '../assets/game05.png'
import game06 from '../assets/game06.png'
import game07 from '../assets/game07.png'
import game08 from '../assets/game08.png'
import game09 from '../assets/game09.png'
import game10 from '../assets/game10.png'
import live01 from '../assets/live01.png'
import live02 from '../assets/live02.png'
import live03 from '../assets/live03.png'
import community01 from '../assets/community01.png'
import community02 from '../assets/community02.png'
import community03 from '../assets/community03.png'
import community04 from '../assets/community04.png'
import community05 from '../assets/community05.png'
import community06 from '../assets/community06.png'

export const tournamentsData = [
    { id: 1, image: tournament01, game: 'Call of Duty', region: 'North America', prizePoolValue: 30000, gameType: 'Online', title: 'Call of Duty - Modern Warfare Reimagined', matchType: '4 x 4 Team Matches', date: 'Jan 19, 12:00 PM', teams: { current: 10, total: 25 }, entry: 'Free entry' },
    { id: 2, image: tournament02, game: 'Modern Strike', region: 'Europe', prizePoolValue: 45000, gameType: 'Offline', title: 'Modern Strike 2 - Reimagined', matchType: '5 x 5 Team Matches', date: 'Jan 20, 2:00 PM', teams: { current: 15, total: 30 }, entry: '$50 entry' },
    { id: 3, image: game04, game: 'UFC', region: 'Asia', prizePoolValue: 25000, gameType: 'Hybrid', title: 'UFC 25 - Championship Series', matchType: '1v1 Matches', date: 'Jan 21, 4:00 PM', teams: { current: 8, total: 16 }, entry: 'Free entry' },
    { id: 4, image: game01, game: 'FC25', region: 'South America', prizePoolValue: 60000, gameType: 'Online', title: 'FC25 - World Cup', matchType: '2 x 2 Team Matches', date: 'Jan 22, 10:00 AM', teams: { current: 12, total: 32 }, entry: '$25 entry' },
    { id: 5, image: game02, game: 'Valorant', region: 'North America', prizePoolValue: 85000, gameType: 'Offline', title: 'Valorant - Masters Tournament', matchType: '5 x 5 Team Matches', date: 'Jan 23, 3:00 PM', teams: { current: 18, total: 24 }, entry: 'Free entry' },
    { id: 6, image: game03, game: 'Apex Legends', region: 'Europe', prizePoolValue: 15000, gameType: 'Online', title: 'Apex Legends - Battle Royale', matchType: '3 x 3 Squad Matches', date: 'Jan 24, 6:00 PM', teams: { current: 5, total: 20 }, entry: 'Free entry' },
    { id: 7, image: game05, game: 'Call of Duty', region: 'Asia', prizePoolValue: 55000, gameType: 'Hybrid', title: 'Call of Duty - Winter Championship', matchType: '4 x 4 Team Matches', date: 'Jan 25, 11:00 AM', teams: { current: 20, total: 28 }, entry: '$75 entry' },
    { id: 8, image: game06, game: 'Valorant', region: 'Oceania', prizePoolValue: 35000, gameType: 'Online', title: 'Valorant - Pacific League', matchType: '5 x 5 Team Matches', date: 'Jan 26, 1:00 PM', teams: { current: 14, total: 20 }, entry: 'Free entry' },
    { id: 9, image: game07, game: 'FC25', region: 'Africa', prizePoolValue: 20000, gameType: 'Offline', title: 'FC25 - African Cup', matchType: '2 x 2 Team Matches', date: 'Jan 27, 3:00 PM', teams: { current: 6, total: 16 }, entry: '$30 entry' },
    { id: 10, image: game08, game: 'Apex Legends', region: 'North America', prizePoolValue: 95000, gameType: 'Online', title: 'Apex Legends - Grand Finals', matchType: '3 x 3 Squad Matches', date: 'Jan 28, 5:00 PM', teams: { current: 22, total: 30 }, entry: 'Free entry' },
    { id: 11, image: game09, game: 'UFC', region: 'Europe', prizePoolValue: 40000, gameType: 'Hybrid', title: 'UFC - European Championship', matchType: '1v1 Matches', date: 'Jan 29, 12:00 PM', teams: { current: 11, total: 18 }, entry: '$50 entry' },
    { id: 12, image: game10, game: 'Modern Strike', region: 'Asia', prizePoolValue: 70000, gameType: 'Offline', title: 'Modern Strike - Asian Masters', matchType: '5 x 5 Team Matches', date: 'Jan 30, 4:00 PM', teams: { current: 16, total: 24 }, entry: 'Free entry' },
    { id: 13, image: game01, game: 'Call of Duty', region: 'South America', prizePoolValue: 28000, gameType: 'Online', title: 'Call of Duty - South American Open', matchType: '4 x 4 Team Matches', date: 'Feb 1, 10:00 AM', teams: { current: 9, total: 22 }, entry: 'Free entry' },
    { id: 14, image: game02, game: 'Valorant', region: 'North America', prizePoolValue: 120000, gameType: 'Offline', title: 'Valorant - North American Finals', matchType: '5 x 5 Team Matches', date: 'Feb 2, 2:00 PM', teams: { current: 24, total: 32 }, entry: '$100 entry' },
    { id: 15, image: game03, game: 'FC25', region: 'Europe', prizePoolValue: 50000, gameType: 'Hybrid', title: 'FC25 - European Championship', matchType: '2 x 2 Team Matches', date: 'Feb 3, 1:00 PM', teams: { current: 13, total: 20 }, entry: 'Free entry' },
    { id: 16, image: game04, game: 'Apex Legends', region: 'Oceania', prizePoolValue: 18000, gameType: 'Online', title: 'Apex Legends - Oceanic Series', matchType: '3 x 3 Squad Matches', date: 'Feb 4, 6:00 PM', teams: { current: 7, total: 18 }, entry: 'Free entry' },
    { id: 17, image: game05, game: 'UFC', region: 'Africa', prizePoolValue: 32000, gameType: 'Offline', title: 'UFC - African Championship', matchType: '1v1 Matches', date: 'Feb 5, 11:00 AM', teams: { current: 10, total: 16 }, entry: '$40 entry' },
    { id: 18, image: game06, game: 'Modern Strike', region: 'Asia', prizePoolValue: 65000, gameType: 'Online', title: 'Modern Strike - Asian Pro League', matchType: '5 x 5 Team Matches', date: 'Feb 6, 3:00 PM', teams: { current: 17, total: 26 }, entry: 'Free entry' }
]

export const livestreamsData = [
    { id: 1, thumbnail: live01, streamer: 'Bobby Swagger', title: 'FC25 – FC Pro Open match week 5 Reimagined', viewers: '10,000', alt: 'FC25 stream' },
    { id: 2, thumbnail: live02, streamer: 'Bobby Swagger', title: 'Call of Duty – Mordern Warfare Reimagined', viewers: '10,000', alt: 'Call of Duty stream' },
    { id: 3, thumbnail: live03, streamer: 'Bobby Swagger', title: 'FC25 – FC Pro Open match week 5 Reimagined', viewers: '10,000', alt: 'Apex stream' },
    { id: 4, thumbnail: live01, streamer: 'Alex Turner', title: 'Valorant – Champions Tour Finals', viewers: '25,000', alt: 'Valorant stream' },
    { id: 5, thumbnail: live02, streamer: 'Sophia Lee', title: 'Apex Legends – Global Championship', viewers: '18,500', alt: 'Apex Legends stream' },
    { id: 6, thumbnail: live03, streamer: 'Marcus Johnson', title: 'UFC 25 – Championship Match', viewers: '12,000', alt: 'UFC stream' }
]

export const communitiesData = [
    { id: 1, logo: community01, logoText: 'ORLANDO PIANO COLLECTIVE', logoBgColor: '#FFFFFF', logoBorderColor: null, title: 'COD - Battlegrounds Reimagined', game: 'Fortnite', members: '10k members' },
    { id: 2, logo: community02, logoText: 'KETCHUP STUDIOS', logoBgColor: '#DC2626', logoBorderColor: '#FFFFFF', title: 'COD - Battlegrounds Reimagined', game: 'Fortnite', members: '10k members' },
    { id: 3, logo: community03, logoText: 'GAMING ELITE', logoBgColor: '#2E3440', logoBorderColor: null, title: 'Valorant - Champions League', game: 'Valorant', members: '25k members' },
    { id: 4, logo: community04, logoText: 'PRO PLAYERS', logoBgColor: '#1A2E2E', logoBorderColor: null, title: 'Apex Legends - Battle Royale', game: 'Apex Legends', members: '15k members' },
    { id: 5, logo: community05, logoText: 'ESPORTS HUB', logoBgColor: '#4A5568', logoBorderColor: null, title: 'FC25 - World Championship', game: 'FC25', members: '30k members' },
    { id: 6, logo: community06, logoText: 'TOURNAMENT MASTERS', logoBgColor: '#66B22E', logoBorderColor: null, title: 'UFC 25 - Championship Series', game: 'UFC', members: '8k members' }
]

