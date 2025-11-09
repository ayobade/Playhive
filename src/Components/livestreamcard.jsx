import React from 'react'
import styled from 'styled-components'

const LiveCard = styled.div`
  background: #18181B50;
  border: 1px solid #333333;
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  cursor: pointer;
  max-width: 360px;
  width: 100%;
  
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
    width: 300%;
    height: 200%;
    pointer-events: none;
    background: radial-gradient(50% 50% at 50% 50%, rgba(75, 93, 54, 0.5) 0%, rgba(75, 93, 54, 0.25) 40%, rgba(75, 93, 54, 0.0) 70%);
    filter: blur(80px);
    mix-blend-mode: screen;
  }

 
`

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
  z-index: 1;
  line-height: 0;
  font-size: 0;
  margin: 0;
  padding: 0;
`

const LiveThumb = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  margin: 0;
  padding: 0;
  vertical-align: top;
  z-index: 2;
`

const LiveBadge = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  background: #E11D48;
  color: #FFFFFF;
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  font-weight: 700;
  padding: 6px 12px;
  border-radius: 9999px;
  z-index: 5;
`

const LiveInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px 20px 20px 20px;
  background: rgba(21, 26, 31, 0.7);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  margin-top: 0;
`

const LiveStreamer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: #FFFFFF;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 0.95rem;
`

const Avatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #2E3440;
  overflow: hidden;
`

const LiveTitleText = styled.h3`
  margin: 0;
  color: #FFFFFF;
  font-family: 'Inter', sans-serif;
  font-weight: 800;
  font-size: 1.4rem;
  line-height: 1.3;
`

const LiveMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: #A1A1AA;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 0.95rem;
`

const LivestreamCard = ({ thumbnail, streamer, title, viewers, alt }) => {
    return (
        <LiveCard>
            <ImageWrapper>
                <LiveThumb src={thumbnail} alt={alt || title} />
                <LiveBadge>Live</LiveBadge>
            </ImageWrapper>
            <LiveInfo>
                <LiveStreamer>
                    <Avatar />
                    {streamer}
                </LiveStreamer>
                <LiveTitleText>{title}</LiveTitleText>
                <LiveMeta>{viewers} Viewers</LiveMeta>
            </LiveInfo>
        </LiveCard>
    )
}

export default LivestreamCard

