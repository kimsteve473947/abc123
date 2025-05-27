import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useProgress } from '../context/ProgressContext';
import BottomNavigation from './BottomNavigation';

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  display: flex;
  flex-direction: column;
  padding-bottom: 100px; /* BottomNavigation을 위한 여백 */
`;

const Header = styled.div`
  width: 100%;
  height: 60px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 20px rgba(0,0,0,0.1);
  position: sticky;
  top: 0;
  z-index: 50;
`;

const BackButton = styled.button`
  position: absolute;
  left: 20px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #333;
  padding: 8px;
  border-radius: 50%;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: rgba(0,0,0,0.1);
    transform: scale(1.1);
  }
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: 600;
  color: #333;
`;

const Content = styled.div`
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 500px;
  margin: 0 auto;
  width: 100%;
`;

const LocationTitle = styled.h2`
  font-size: 32px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
`;

const PhotoContainer = styled.div`
  width: 100%;
  max-width: 400px;
  height: 300px;
  background-color: white;
  border-radius: 20px;
  margin-bottom: 20px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0,0,0,0.15);
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 40px rgba(0,0,0,0.2);
  }
`;

const PhotoImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const PhotoOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, rgba(102, 126, 234, 0.8), rgba(118, 75, 162, 0.8));
  opacity: 0;
  transition: opacity 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
  font-weight: bold;
  
  ${PhotoContainer}:hover & {
    opacity: 1;
  }
`;

const MissionText = styled.p`
  font-size: 18px;
  color: #333;
  text-align: center;
  line-height: 1.6;
  margin-bottom: 30px;
  font-weight: 500;
`;

const ButtonContainer = styled.div`
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const ActionButton = styled.button`
  background: ${props => props.primary ? 
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 
    'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
  };
  color: ${props => props.primary ? 'white' : '#333'};
  border: none;
  padding: 18px 30px;
  border-radius: 15px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.2);
  }
  
  &:active {
    transform: translateY(-1px);
  }
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  width: 100%;
  max-width: 400px;
  margin-top: 20px;
`;

const FeatureCard = styled.div`
  background: white;
  border-radius: 15px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.15);
  }
`;

const FeatureIcon = styled.div`
  font-size: 24px;
  margin-bottom: 8px;
`;

const FeatureText = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: #333;
`;

const StatusBadge = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  background: ${props => props.completed ? '#4CAF50' : '#FF9800'};
  color: white;
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 12px;
  font-weight: 600;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 6px;
  background-color: rgba(255,255,255,0.3);
  border-radius: 3px;
  margin: 20px 0;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #667eea, #764ba2);
  width: ${props => props.progress}%;
  transition: width 0.5s ease;
`;

const ShareButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 25px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 15px;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const locationData = {
  'sangmugwan': {
    name: '상무관',
    image: '/assets/sangmugwan.jpeg',
    description: '1980년 5월 광주민주화운동의 중요한 무대가 된 곳',
    coordinates: { lat: 35.1595, lng: 126.8526 },
    historicalFacts: [
      '1980년 5월 21일 계엄군과 시민들의 대치 현장',
      '광주시민들의 마지막 항쟁지',
      '현재는 문화예술공간으로 활용'
    ]
  },
  'jeonnam-dochung': {
    name: '전남도청',
    image: '/assets/jeonnam-dochung.jpg',
    description: '광주민주화운동의 핵심 무대, 시민들의 마지막 항쟁지',
    coordinates: { lat: 35.1595, lng: 126.8526 },
    historicalFacts: [
      '1980년 5월 21일부터 27일까지 시민군이 점거',
      '민주주의를 위한 마지막 보루',
      '현재는 5.18 기념공간으로 보존'
    ]
  },
  'dochung-minwon': {
    name: '도청 민원실',
    image: '/assets/dochung-minwon.jpg',
    description: '시민들이 모여 민주주의를 외쳤던 공간',
    coordinates: { lat: 35.1595, lng: 126.8526 },
    historicalFacts: [
      '시민들의 집회 장소',
      '민주화 요구의 중심지',
      '역사적 증언의 현장'
    ]
  },
  'girok-forest': {
    name: '기록의 숲',
    image: '/assets/girok-forest.jpg',
    description: '5.18 민주화운동의 기억을 보존하는 추모공간',
    coordinates: { lat: 35.1595, lng: 126.8526 },
    historicalFacts: [
      '희생자들을 기리는 추모공간',
      '역사적 기록 보존소',
      '평화와 민주주의의 상징'
    ]
  },
  'hospital': {
    name: '병원',
    image: '/assets/hospital.jpg',
    description: '부상자들을 치료했던 의료진들의 헌신이 깃든 곳',
    coordinates: { lat: 35.1595, lng: 126.8526 },
    historicalFacts: [
      '5.18 당시 부상자 치료 현장',
      '의료진들의 숭고한 희생',
      '생명을 구한 천사들의 공간'
    ]
  },
  'daein-market': {
    name: '대인시장',
    image: '/assets/daein-market.png',
    description: '서민들의 삶의 터전이자 민주화운동의 든든한 후원지',
    coordinates: { lat: 35.1462, lng: 126.9178 },
    historicalFacts: [
      '시민들에게 음식과 물자를 제공',
      '서민들의 연대와 나눔의 현장',
      '현재도 광주의 대표적인 전통시장'
    ]
  },
  '518-cemetery': {
    name: '국립 5.18 민주묘지',
    image: '/assets/518-cemetery.jpg',
    description: '민주주의를 위해 희생된 영령들이 잠든 성역',
    coordinates: { lat: 35.1595, lng: 126.8526 },
    historicalFacts: [
      '5.18 희생자들의 영면처',
      '민주주의 성지',
      '매년 5월 18일 추모행사 개최'
    ]
  }
};

function MissionPage() {
  const navigate = useNavigate();
  const { locationId } = useParams();
  const [photoTaken, setPhotoTaken] = useState(false);
  const [visitProgress, setVisitProgress] = useState(0);
  const [showShareModal, setShowShareModal] = useState(false);
  const { markLocationVisited, markPhotoTaken, markVideoCompleted } = useProgress();
  
  const location = locationData[locationId];
  const canvasRef = useRef(null);

  useEffect(() => {
    markLocationVisited(locationId);
    // 방문 진행률 계산
    const totalLocations = Object.keys(locationData).length;
    const visitedCount = Math.floor(Math.random() * totalLocations) + 1; // 임시 데이터
    setVisitProgress((visitedCount / totalLocations) * 100);
  }, [locationId, markLocationVisited]);

  const handlePhotoClick = () => {
    markPhotoTaken(locationId, { location: location.name });
    setPhotoTaken(true);
    
    // 사진 촬영 효과
    const flash = document.createElement('div');
    flash.style.position = 'fixed';
    flash.style.top = '0';
    flash.style.left = '0';
    flash.style.width = '100%';
    flash.style.height = '100%';
    flash.style.backgroundColor = 'white';
    flash.style.zIndex = '9999';
    flash.style.opacity = '0.8';
    document.body.appendChild(flash);
    
    setTimeout(() => {
      document.body.removeChild(flash);
      alert('📸 사진이 성공적으로 촬영되었습니다!');
    }, 200);
  };

  const handleVideoClick = () => {
    const availableVideos = ['daein-market', 'hospital', 'sangmugwan'];
    if (availableVideos.includes(locationId)) {
      navigate(`/video/${locationId}`);
    } else {
      alert('🎬 이 장소의 AI 복원 영상은 곧 공개됩니다!');
    }
  };

  const handleDetailClick = () => {
    navigate(`/location/${locationId}`);
  };

  const handleARClick = () => {
    navigate(`/ar/${locationId}`);
  };

  const handleAudioGuideClick = () => {
    navigate(`/audio/${locationId}`);
  };

  const handleMapClick = () => {
    if (location.coordinates) {
      window.open(`https://maps.google.com/?q=${location.coordinates.lat},${location.coordinates.lng}`, '_blank');
    }
  };

  const handleFavoriteClick = () => {
    alert('⭐ 즐겨찾기에 추가되었습니다!');
  };

  const handleShareClick = () => {
    if (navigator.share) {
      navigator.share({
        title: `${location.name} - 광주 다크투어리즘`,
        text: `${location.description}`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('📋 링크가 클립보드에 복사되었습니다!');
    }
  };

  const handleBackClick = () => {
    navigate('/map');
  };

  if (!location) {
    return <div>장소를 찾을 수 없습니다.</div>;
  }

  return (
    <Container>
      <Header>
        <BackButton onClick={handleBackClick}>←</BackButton>
        <Title>Mission</Title>
      </Header>
      
      <Content>
        <LocationTitle>{location.name}</LocationTitle>
        
        <PhotoContainer onClick={handlePhotoClick}>
          <PhotoImage src={location.image} alt={location.name} />
          <PhotoOverlay>📸 사진 촬영하기</PhotoOverlay>
          <StatusBadge completed={photoTaken}>
            {photoTaken ? '완료' : '미완료'}
          </StatusBadge>
        </PhotoContainer>
        
        <MissionText>
          이 장소에서 사진을 촬영하고<br />
          역사를 기록해보세요!
        </MissionText>

        <ProgressBar>
          <ProgressFill progress={visitProgress} />
        </ProgressBar>
        
        <ButtonContainer>
          <ActionButton primary onClick={handlePhotoClick}>
            📸 사진 촬영하기
          </ActionButton>
          
          <ActionButton onClick={handleVideoClick}>
            🎬 AI 복원 영상 보기
          </ActionButton>
          
          <ActionButton onClick={handleDetailClick}>
            📖 장소 정보 보기
          </ActionButton>
        </ButtonContainer>

        <FeatureGrid>
          <FeatureCard onClick={handleARClick}>
            <FeatureIcon>🔮</FeatureIcon>
            <FeatureText>AR 체험</FeatureText>
          </FeatureCard>
          
          <FeatureCard onClick={handleAudioGuideClick}>
            <FeatureIcon>🎧</FeatureIcon>
            <FeatureText>음성 가이드</FeatureText>
          </FeatureCard>
          
          <FeatureCard onClick={handleMapClick}>
            <FeatureIcon>🗺️</FeatureIcon>
            <FeatureText>지도 보기</FeatureText>
          </FeatureCard>
          
          <FeatureCard onClick={handleFavoriteClick}>
            <FeatureIcon>⭐</FeatureIcon>
            <FeatureText>즐겨찾기</FeatureText>
          </FeatureCard>
        </FeatureGrid>

        <ShareButton onClick={handleShareClick}>
          🔗 친구들과 공유하기
        </ShareButton>
      </Content>
      
      <BottomNavigation />
    </Container>
  );
}

export default MissionPage; 