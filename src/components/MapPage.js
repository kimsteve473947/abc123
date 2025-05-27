import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  position: relative;
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
  z-index: 10;
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

const MapContainer = styled.div`
  flex: 1;
  position: relative;
  background-image: url('/assets/gwangju-map.jpeg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const MissionMarker = styled.div`
  position: absolute;
  width: 60px;
  height: 80px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: scale(1.1);
  }
`;

const MarkerIcon = styled.div`
  width: 40px;
  height: 40px;
  background-color: #ff4444;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 20px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.3);
  margin-bottom: 5px;
`;

const MarkerLabel = styled.div`
  background-color: rgba(255, 255, 255, 0.9);
  color: #333;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: bold;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  white-space: nowrap;
`;

const BottomNav = styled.div`
  width: 100%;
  height: 80px;
  background-color: white;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0 -2px 4px rgba(0,0,0,0.1);
`;

const NavIcon = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 24px;
  color: #333;
  transition: color 0.2s ease;
  
  &:hover {
    color: #ff4444;
  }
`;

const locations = [
  { id: 'sangmugwan', name: '상무관', x: '25%', y: '45%' },
  { id: 'jeonnam-dochung', name: '전남도청', x: '45%', y: '55%' },
  { id: 'dochung-minwon', name: '도청 민원실', x: '47%', y: '57%' },
  { id: 'girok-forest', name: '기록의 숲', x: '40%', y: '35%' },
  { id: 'hospital', name: '병원', x: '55%', y: '40%' },
  { id: 'daein-market', name: '대인시장', x: '35%', y: '65%' },
  { id: '518-cemetery', name: '국립 5.18 민주묘지', x: '70%', y: '75%' }
];

function MapPage() {
  const navigate = useNavigate();

  const handleMarkerClick = (locationId) => {
    navigate(`/mission/${locationId}`);
  };

  return (
    <Container>
      <Header>
        <BackButton>←</BackButton>
        <Title>Mission</Title>
      </Header>
      
      <MapContainer>
        {locations.map((location) => (
          <MissionMarker
            key={location.id}
            style={{ left: location.x, top: location.y }}
            onClick={() => handleMarkerClick(location.id)}
          >
            <MarkerIcon>📍</MarkerIcon>
            <MarkerLabel>{location.name}</MarkerLabel>
          </MissionMarker>
        ))}
      </MapContainer>
      
      <BottomNav>
        <NavIcon>🏠</NavIcon>
        <NavIcon>🗺️</NavIcon>
        <NavIcon>🔍</NavIcon>
        <NavIcon>📋</NavIcon>
      </BottomNav>
    </Container>
  );
}

export default MapPage; 