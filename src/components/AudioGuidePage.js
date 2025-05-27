import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
  display: flex;
  flex-direction: column;
  padding-bottom: 100px;
`;

const Header = styled.div`
  width: 100%;
  height: 60px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  position: sticky;
  top: 0;
  z-index: 50;
`;

const BackButton = styled.button`
  position: absolute;
  left: 20px;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: white;
  padding: 8px;
  border-radius: 50%;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.1);
  }
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: 600;
  color: white;
`;

const Content = styled.div`
  flex: 1;
  padding: 20px;
  max-width: 500px;
  margin: 0 auto;
  width: 100%;
`;

const PlayerContainer = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 25px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  text-align: center;
`;

const LocationTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
`;

const LocationSubtitle = styled.p`
  font-size: 16px;
  color: #666;
  margin-bottom: 30px;
`;

const AudioVisualizer = styled.div`
  width: 100%;
  height: 80px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 15px;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
`;

const WaveBar = styled.div`
  width: 4px;
  background: rgba(255, 255, 255, 0.8);
  margin: 0 2px;
  border-radius: 2px;
  animation: wave 1.5s ease-in-out infinite;
  animation-delay: ${props => props.delay}s;
  
  @keyframes wave {
    0%, 100% { height: 20px; }
    50% { height: ${props => props.isPlaying ? '60px' : '20px'}; }
  }
`;

const ControlsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
`;

const PlayButton = styled.button`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  }
`;

const ControlButton = styled.button`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: rgba(102, 126, 234, 0.2);
  border: 2px solid rgba(102, 126, 234, 0.3);
  color: #667eea;
  font-size: 18px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(102, 126, 234, 0.3);
    transform: scale(1.05);
  }
`;

const ProgressContainer = styled.div`
  width: 100%;
  margin-bottom: 15px;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 6px;
  background: rgba(102, 126, 234, 0.2);
  border-radius: 3px;
  overflow: hidden;
  cursor: pointer;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #667eea, #764ba2);
  width: ${props => props.progress}%;
  transition: width 0.1s ease;
`;

const TimeDisplay = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #666;
  margin-bottom: 20px;
`;

const SpeedControl = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
`;

const SpeedButton = styled.button`
  padding: 8px 12px;
  border-radius: 20px;
  border: 2px solid ${props => props.active ? '#667eea' : 'rgba(102, 126, 234, 0.3)'};
  background: ${props => props.active ? 'rgba(102, 126, 234, 0.2)' : 'transparent'};
  color: #667eea;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(102, 126, 234, 0.2);
  }
`;

const ChapterList = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 25px;
  margin-bottom: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
`;

const ChapterTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #333;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ChapterItem = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  border-radius: 12px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${props => props.active ? 'rgba(102, 126, 234, 0.1)' : 'transparent'};
  border: 2px solid ${props => props.active ? 'rgba(102, 126, 234, 0.3)' : 'transparent'};
  
  &:hover {
    background: rgba(102, 126, 234, 0.1);
  }
`;

const ChapterNumber = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: ${props => props.active ? '#667eea' : 'rgba(102, 126, 234, 0.2)'};
  color: ${props => props.active ? 'white' : '#667eea'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
  margin-right: 15px;
`;

const ChapterInfo = styled.div`
  flex: 1;
`;

const ChapterName = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin-bottom: 2px;
`;

const ChapterDuration = styled.div`
  font-size: 12px;
  color: #666;
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin-bottom: 20px;
`;

const FeatureCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.2);
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-3px);
  }
`;

const FeatureIcon = styled.div`
  font-size: 24px;
  margin-bottom: 8px;
`;

const FeatureText = styled.div`
  color: white;
  font-size: 12px;
  font-weight: 600;
`;

const audioGuideData = {
  'daein-market': {
    name: '대인시장',
    subtitle: '서민들의 연대와 나눔의 현장',
    totalDuration: '12:34',
    chapters: [
      { id: 1, name: '대인시장의 역사', duration: '3:45' },
      { id: 2, name: '1980년 5월의 기억', duration: '4:20' },
      { id: 3, name: '상인들의 연대', duration: '2:15' },
      { id: 4, name: '현재의 모습', duration: '2:14' }
    ]
  },
  'jeonnam-dochung': {
    name: '전남도청',
    subtitle: '시민군의 마지막 항쟁지',
    totalDuration: '15:42',
    chapters: [
      { id: 1, name: '도청 점거의 시작', duration: '4:30' },
      { id: 2, name: '시민군의 자치', duration: '5:12' },
      { id: 3, name: '마지막 항쟁', duration: '3:45' },
      { id: 4, name: '기억과 교훈', duration: '2:15' }
    ]
  }
};

function AudioGuidePage() {
  const navigate = useNavigate();
  const { locationId } = useParams();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(754); // 12:34 in seconds
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [currentChapter, setCurrentChapter] = useState(1);
  
  const location = audioGuideData[locationId];

  const handleBackClick = () => {
    navigate(`/mission/${locationId}`);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      // 재생 시뮬레이션
      const interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= duration) {
            setIsPlaying(false);
            clearInterval(interval);
            return 0;
          }
          return prev + 1;
        });
      }, 1000 / playbackSpeed);
    }
  };

  const handleSpeedChange = (speed) => {
    setPlaybackSpeed(speed);
  };

  const handleChapterClick = (chapterId) => {
    setCurrentChapter(chapterId);
    setCurrentTime(0);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = (currentTime / duration) * 100;

  if (!location) {
    return <div>음성 가이드를 찾을 수 없습니다.</div>;
  }

  return (
    <Container>
      <Header>
        <BackButton onClick={handleBackClick}>←</BackButton>
        <Title>음성 가이드</Title>
      </Header>
      
      <Content>
        <PlayerContainer>
          <LocationTitle>{location.name}</LocationTitle>
          <LocationSubtitle>{location.subtitle}</LocationSubtitle>
          
          <AudioVisualizer>
            {[...Array(20)].map((_, i) => (
              <WaveBar
                key={i}
                delay={i * 0.1}
                isPlaying={isPlaying}
              />
            ))}
          </AudioVisualizer>
          
          <ControlsContainer>
            <ControlButton>⏮️</ControlButton>
            <ControlButton>⏪</ControlButton>
            <PlayButton onClick={handlePlayPause}>
              {isPlaying ? '⏸️' : '▶️'}
            </PlayButton>
            <ControlButton>⏩</ControlButton>
            <ControlButton>⏭️</ControlButton>
          </ControlsContainer>
          
          <ProgressContainer>
            <ProgressBar>
              <ProgressFill progress={progress} />
            </ProgressBar>
          </ProgressContainer>
          
          <TimeDisplay>
            <span>{formatTime(currentTime)}</span>
            <span>{location.totalDuration}</span>
          </TimeDisplay>
          
          <SpeedControl>
            <span style={{ color: '#666', fontSize: '12px', marginRight: '10px' }}>재생 속도:</span>
            {[0.5, 0.75, 1, 1.25, 1.5, 2].map(speed => (
              <SpeedButton
                key={speed}
                active={playbackSpeed === speed}
                onClick={() => handleSpeedChange(speed)}
              >
                {speed}x
              </SpeedButton>
            ))}
          </SpeedControl>
        </PlayerContainer>

        <ChapterList>
          <ChapterTitle>🎧 챕터 목록</ChapterTitle>
          {location.chapters.map((chapter) => (
            <ChapterItem
              key={chapter.id}
              active={currentChapter === chapter.id}
              onClick={() => handleChapterClick(chapter.id)}
            >
              <ChapterNumber active={currentChapter === chapter.id}>
                {chapter.id}
              </ChapterNumber>
              <ChapterInfo>
                <ChapterName>{chapter.name}</ChapterName>
                <ChapterDuration>{chapter.duration}</ChapterDuration>
              </ChapterInfo>
            </ChapterItem>
          ))}
        </ChapterList>

        <FeatureGrid>
          <FeatureCard>
            <FeatureIcon>📱</FeatureIcon>
            <FeatureText>오프라인 다운로드</FeatureText>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>🌐</FeatureIcon>
            <FeatureText>다국어 지원</FeatureText>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>📝</FeatureIcon>
            <FeatureText>자막 보기</FeatureText>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>🔖</FeatureIcon>
            <FeatureText>북마크</FeatureText>
          </FeatureCard>
        </FeatureGrid>
      </Content>
    </Container>
  );
}

export default AudioGuidePage; 