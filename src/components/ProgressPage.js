import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useProgress } from '../context/ProgressContext';

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
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
`;

const ProgressCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
`;

const ProgressTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 15px;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background-color: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 10px;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  width: ${props => props.percentage}%;
  transition: width 0.3s ease;
`;

const ProgressText = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0;
`;

const LocationGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
  margin-top: 20px;
`;

const LocationCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 15px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  border: 2px solid ${props => props.completed ? '#4CAF50' : '#e0e0e0'};
  transition: all 0.3s ease;
`;

const LocationIcon = styled.div`
  font-size: 24px;
  margin-bottom: 8px;
`;

const LocationName = styled.p`
  font-size: 12px;
  font-weight: 500;
  color: #333;
  margin: 0 0 5px 0;
`;

const StatusBadge = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  font-size: 10px;
  color: ${props => props.completed ? '#4CAF50' : '#999'};
`;

const ResetButton = styled.button`
  background: #ff4444;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 20px;
  transition: background 0.3s ease;
  
  &:hover {
    background: #cc3333;
  }
`;

const locations = [
  { id: 'sangmugwan', name: '상무관', icon: '🏛️' },
  { id: 'jeonnam-dochung', name: '전남도청', icon: '🏢' },
  { id: 'dochung-minwon', name: '도청 민원실', icon: '📋' },
  { id: 'girok-forest', name: '기록의 숲', icon: '🌳' },
  { id: 'hospital', name: '병원', icon: '🏥' },
  { id: 'daein-market', name: '대인시장', icon: '🏪' },
  { id: '518-cemetery', name: '국립 5.18 민주묘지', icon: '⛩️' }
];

function ProgressPage() {
  const navigate = useNavigate();
  const { 
    getProgress, 
    isLocationVisited, 
    isPhotoTaken, 
    isVideoCompleted,
    resetProgress 
  } = useProgress();

  const progress = getProgress();

  const handleBackClick = () => {
    navigate('/map');
  };

  const handleResetClick = () => {
    if (window.confirm('모든 진행 상황을 초기화하시겠습니까?')) {
      resetProgress();
    }
  };

  return (
    <Container>
      <Header>
        <BackButton onClick={handleBackClick}>←</BackButton>
        <Title>진행 상황</Title>
      </Header>
      
      <Content>
        <ProgressCard>
          <ProgressTitle>전체 진행률</ProgressTitle>
          <ProgressBar>
            <ProgressFill percentage={progress.visited.percentage} />
          </ProgressBar>
          <ProgressText>
            {progress.visited.count}/{progress.visited.total} 장소 방문 완료 ({progress.visited.percentage}%)
          </ProgressText>
        </ProgressCard>

        <ProgressCard>
          <ProgressTitle>사진 촬영</ProgressTitle>
          <ProgressBar>
            <ProgressFill percentage={progress.photos.percentage} />
          </ProgressBar>
          <ProgressText>
            {progress.photos.count}/{progress.photos.total} 장소에서 사진 촬영 ({progress.photos.percentage}%)
          </ProgressText>
        </ProgressCard>

        <ProgressCard>
          <ProgressTitle>AI 영상 시청</ProgressTitle>
          <ProgressBar>
            <ProgressFill percentage={progress.videos.percentage} />
          </ProgressBar>
          <ProgressText>
            {progress.videos.count}/{progress.videos.total} 영상 시청 완료 ({progress.videos.percentage}%)
          </ProgressText>
        </ProgressCard>

        <ProgressCard>
          <ProgressTitle>장소별 상세 현황</ProgressTitle>
          <LocationGrid>
            {locations.map((location) => (
              <LocationCard 
                key={location.id}
                completed={isLocationVisited(location.id)}
              >
                <LocationIcon>{location.icon}</LocationIcon>
                <LocationName>{location.name}</LocationName>
                <StatusBadge completed={isLocationVisited(location.id)}>
                  {isLocationVisited(location.id) ? '✅ 방문' : '⭕ 미방문'}
                </StatusBadge>
                <StatusBadge completed={isPhotoTaken(location.id)}>
                  {isPhotoTaken(location.id) ? '📸 촬영' : '📷 미촬영'}
                </StatusBadge>
                {['daein-market', 'hospital', 'sangmugwan'].includes(location.id) && (
                  <StatusBadge completed={isVideoCompleted(location.id)}>
                    {isVideoCompleted(location.id) ? '🎬 시청' : '📺 미시청'}
                  </StatusBadge>
                )}
              </LocationCard>
            ))}
          </LocationGrid>
        </ProgressCard>

        <ResetButton onClick={handleResetClick}>
          진행 상황 초기화
        </ResetButton>
      </Content>
    </Container>
  );
}

export default ProgressPage; 