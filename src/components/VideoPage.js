import React, { useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useProgress } from '../context/ProgressContext';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #000;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  width: 100%;
  height: 60px;
  background-color: rgba(0,0,0,0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 10;
`;

const BackButton = styled.button`
  position: absolute;
  left: 20px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: white;
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: 600;
  color: white;
`;

const VideoContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const VideoOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
  opacity: ${props => props.show ? 1 : 0};
  transition: opacity 0.3s ease;
`;

const OverlayTitle = styled.h2`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.8);
`;

const OverlayText = styled.p`
  font-size: 16px;
  line-height: 1.5;
  max-width: 80%;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.8);
`;

const PlayButton = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: rgba(255,255,255,0.9);
  border: none;
  cursor: pointer;
  font-size: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: white;
    transform: translate(-50%, -50%) scale(1.1);
  }
`;



const videoData = {
  'daein-market': {
    title: '대인시장의 과거',
    description: '1980년 5월, 이곳은 시민들이 모여 서로를 위로하고 희망을 나누던 장소였습니다.',
    videoSrc: '/assets/daein-market-ai.mp4'
  },
  'hospital': {
    title: '병원의 과거',
    description: '1980년 5월, 이곳은 부상자들을 치료하고 생명을 구하기 위해 의료진들이 헌신했던 곳입니다.',
    videoSrc: '/assets/hospital-ai.mp4'
  },
  'sangmugwan': {
    title: '상무관의 과거',
    description: '1980년 5월, 이곳은 시민들이 모여 민주주의를 외쳤던 역사적인 장소입니다.',
    videoSrc: '/assets/sangmugwan-ai.mp4'
  }
};

function VideoPage() {
  const navigate = useNavigate();
  const { locationId } = useParams();
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);
  const { markVideoCompleted } = useProgress();
  
  const videoInfo = videoData[locationId];

  const handlePlayClick = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
      setShowOverlay(false);
    }
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
    setShowOverlay(true);
    markVideoCompleted(locationId);
  };

  const handleBackClick = () => {
    navigate(`/mission/${locationId}`);
  };

  if (!videoInfo) {
    return <div>영상을 찾을 수 없습니다.</div>;
  }

  return (
    <Container>
      <Header>
        <BackButton onClick={handleBackClick}>←</BackButton>
        <Title>AI 복원 영상</Title>
      </Header>
      
      <VideoContainer>
        <Video
          ref={videoRef}
          src={videoInfo.videoSrc}
          onEnded={handleVideoEnd}
          controls={isPlaying}
        />
        
        <VideoOverlay show={showOverlay}>
          <OverlayTitle>{videoInfo.title}</OverlayTitle>
          <OverlayText>{videoInfo.description}</OverlayText>
        </VideoOverlay>
        
        {!isPlaying && (
          <PlayButton onClick={handlePlayClick}>
            ▶
          </PlayButton>
        )}
      </VideoContainer>
      

    </Container>
  );
}

export default VideoPage; 