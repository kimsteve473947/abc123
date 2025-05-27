import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
`;

const Header = styled.div`
  width: 100%;
  height: 60px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
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

const ARContainer = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const CameraView = styled.div`
  width: 100%;
  max-width: 400px;
  height: 300px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
  position: relative;
  overflow: hidden;
`;

const CameraPlaceholder = styled.div`
  color: white;
  font-size: 18px;
  text-align: center;
  opacity: 0.8;
`;

const AROverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
`;

const HistoricalMarker = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  background: #FFD700;
  border-radius: 50%;
  border: 3px solid white;
  box-shadow: 0 0 20px rgba(255, 215, 0, 0.8);
  animation: pulse 2s infinite;
  cursor: pointer;
  pointer-events: all;
  
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.2); }
    100% { transform: scale(1); }
  }
`;

const InfoPanel = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  max-width: 400px;
  width: 100%;
`;

const InfoTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #333;
  margin-bottom: 10px;
`;

const InfoText = styled.p`
  font-size: 14px;
  line-height: 1.6;
  color: #555;
  margin-bottom: 15px;
`;

const ControlPanel = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
  flex-wrap: wrap;
`;

const ControlButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 12px 20px;
  border-radius: 15px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
  }
  
  &.active {
    background: rgba(255, 255, 255, 0.4);
    border-color: rgba(255, 255, 255, 0.6);
  }
`;

const TimeSlider = styled.div`
  width: 100%;
  max-width: 400px;
  margin: 20px 0;
`;

const SliderLabel = styled.div`
  color: white;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 10px;
  text-align: center;
`;

const Slider = styled.input`
  width: 100%;
  height: 6px;
  border-radius: 3px;
  background: rgba(255, 255, 255, 0.3);
  outline: none;
  
  &::-webkit-slider-thumb {
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #FFD700;
    cursor: pointer;
    box-shadow: 0 0 10px rgba(255, 215, 0, 0.8);
  }
`;

const FeatureCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 15px;
  margin: 10px;
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

const locationARData = {
  'daein-market': {
    name: '대인시장',
    historicalInfo: '1980년 5월, 이곳에서 시민들이 모여 서로를 위로하고 도움을 주고받았습니다.',
    arMarkers: [
      { x: 30, y: 40, info: '상인들이 시민군에게 음식을 제공한 곳' },
      { x: 70, y: 60, info: '시민들이 모여 정보를 교환한 장소' }
    ]
  },
  'jeonnam-dochung': {
    name: '전남도청',
    historicalInfo: '1980년 5월 21일부터 27일까지 시민군이 점거했던 마지막 항쟁지입니다.',
    arMarkers: [
      { x: 50, y: 30, info: '시민군이 마지막까지 항쟁한 건물' },
      { x: 25, y: 70, info: '계엄군의 최후 진압이 시작된 지점' }
    ]
  }
};

function ARViewPage() {
  const navigate = useNavigate();
  const { locationId } = useParams();
  const [activeMode, setActiveMode] = useState('historical');
  const [timeSliderValue, setTimeSliderValue] = useState(2024);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [isARActive, setIsARActive] = useState(false);
  
  const location = locationARData[locationId];

  const handleBackClick = () => {
    navigate(`/mission/${locationId}`);
  };

  const handleStartAR = () => {
    setIsARActive(true);
    alert('🔮 AR 카메라가 활성화되었습니다! 주변을 둘러보세요.');
  };

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
  };

  const handleModeChange = (mode) => {
    setActiveMode(mode);
  };

  const getTimeLabel = (value) => {
    if (value <= 1980) return '1980년 5월';
    if (value <= 1990) return '1980년대';
    if (value <= 2000) return '1990년대';
    if (value <= 2010) return '2000년대';
    if (value <= 2020) return '2010년대';
    return '현재';
  };

  if (!location) {
    return <div>AR 데이터를 찾을 수 없습니다.</div>;
  }

  return (
    <Container>
      <Header>
        <BackButton onClick={handleBackClick}>←</BackButton>
        <Title>AR 체험 - {location.name}</Title>
      </Header>
      
      <ARContainer>
        <CameraView>
          {!isARActive ? (
            <CameraPlaceholder>
              📱 AR 카메라를 시작하려면<br />
              아래 버튼을 눌러주세요
            </CameraPlaceholder>
          ) : (
            <AROverlay>
              {location.arMarkers.map((marker, index) => (
                <HistoricalMarker
                  key={index}
                  style={{ left: `${marker.x}%`, top: `${marker.y}%` }}
                  onClick={() => handleMarkerClick(marker)}
                />
              ))}
            </AROverlay>
          )}
        </CameraView>

        {selectedMarker && (
          <InfoPanel>
            <InfoTitle>🏛️ 역사적 정보</InfoTitle>
            <InfoText>{selectedMarker.info}</InfoText>
          </InfoPanel>
        )}

        <InfoPanel>
          <InfoTitle>📍 {location.name}</InfoTitle>
          <InfoText>{location.historicalInfo}</InfoText>
        </InfoPanel>

        <TimeSlider>
          <SliderLabel>시간 여행: {getTimeLabel(timeSliderValue)}</SliderLabel>
          <Slider
            type="range"
            min="1980"
            max="2024"
            value={timeSliderValue}
            onChange={(e) => setTimeSliderValue(e.target.value)}
          />
        </TimeSlider>

        <ControlPanel>
          <ControlButton
            className={activeMode === 'historical' ? 'active' : ''}
            onClick={() => handleModeChange('historical')}
          >
            🏛️ 역사 모드
          </ControlButton>
          <ControlButton
            className={activeMode === 'comparison' ? 'active' : ''}
            onClick={() => handleModeChange('comparison')}
          >
            🔄 비교 모드
          </ControlButton>
          <ControlButton
            className={activeMode === 'story' ? 'active' : ''}
            onClick={() => handleModeChange('story')}
          >
            📖 스토리 모드
          </ControlButton>
        </ControlPanel>

        {!isARActive && (
          <ControlPanel>
            <ControlButton onClick={handleStartAR}>
              🔮 AR 시작하기
            </ControlButton>
          </ControlPanel>
        )}

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          <FeatureCard>
            <FeatureIcon>📸</FeatureIcon>
            <FeatureText>AR 사진</FeatureText>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>🎥</FeatureIcon>
            <FeatureText>AR 영상</FeatureText>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>🔊</FeatureIcon>
            <FeatureText>음성 해설</FeatureText>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>🗺️</FeatureIcon>
            <FeatureText>3D 지도</FeatureText>
          </FeatureCard>
        </div>
      </ARContainer>
    </Container>
  );
}

export default ARViewPage; 