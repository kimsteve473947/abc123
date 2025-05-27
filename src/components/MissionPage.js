import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useProgress } from '../context/ProgressContext';
import BottomNavigation from './BottomNavigation';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  width: 100%;
  height: 60px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  position: relative;
`;

const BackButton = styled.button`
  position: absolute;
  left: 20px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #333;
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
`;

const LocationTitle = styled.h2`
  font-size: 32px;
  font-weight: bold;
  color: #333;
  margin-bottom: 30px;
  text-align: center;
`;

const PhotoContainer = styled.div`
  width: 100%;
  max-width: 400px;
  height: 300px;
  background-color: white;
  border-radius: 12px;
  margin-bottom: 30px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  cursor: pointer;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: scale(1.02);
  }
`;

const PhotoImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const MissionText = styled.p`
  font-size: 18px;
  color: #333;
  text-align: center;
  line-height: 1.5;
  margin-bottom: 30px;
`;

const ActionButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
  max-width: 400px;
  margin-bottom: 15px;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
  }
`;



const locationData = {
  'sangmugwan': {
    name: '상무관',
    image: '/assets/sangmugwan.jpeg'
  },
  'jeonnam-dochung': {
    name: '전남도청',
    image: '/assets/jeonnam-dochung.jpg'
  },
  'dochung-minwon': {
    name: '도청 민원실',
    image: '/assets/dochung-minwon.jpg'
  },
  'girok-forest': {
    name: '기록의 숲',
    image: '/assets/girok-forest.jpg'
  },
  'hospital': {
    name: '병원',
    image: '/assets/hospital.jpg'
  },
  'daein-market': {
    name: '대인시장',
    image: '/assets/daein-market.png'
  },
  '518-cemetery': {
    name: '국립 5.18 민주묘지',
    image: '/assets/518-cemetery.jpg'
  }
};

function MissionPage() {
  const navigate = useNavigate();
  const { locationId } = useParams();
  const [photoTaken, setPhotoTaken] = useState(false);
  const { markLocationVisited, markPhotoTaken, markVideoCompleted } = useProgress();
  
  const location = locationData[locationId];

  useEffect(() => {
    // 페이지 방문 시 해당 장소를 방문한 것으로 표시
    markLocationVisited(locationId);
  }, [locationId, markLocationVisited]);

  const handlePhotoClick = () => {
    // 사진 촬영 시뮬레이션
    markPhotoTaken(locationId, { location: location.name });
    setPhotoTaken(true);
    alert('사진이 촬영되었습니다!');
  };

  const handleVideoClick = () => {
    const availableVideos = ['daein-market', 'hospital', 'sangmugwan'];
    if (availableVideos.includes(locationId)) {
      navigate(`/video/${locationId}`);
    } else {
      alert('이 장소의 AI 영상은 아직 준비 중입니다.');
    }
  };

  const handleDetailClick = () => {
    navigate(`/location/${locationId}`);
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
        </PhotoContainer>
        
        <MissionText>
          이 장소에서 사진을 촬영하고<br />
          역사를 기록해보세요!
        </MissionText>
        
        <ActionButton onClick={handlePhotoClick}>
          📸 사진 촬영하기
        </ActionButton>
        
        <ActionButton onClick={handleVideoClick}>
          🎬 AI 복원 영상 보기
        </ActionButton>
        
        <ActionButton onClick={handleDetailClick}>
          📖 장소 정보 보기
        </ActionButton>
      </Content>
      
      <BottomNavigation />
    </Container>
  );
}

export default MissionPage; 