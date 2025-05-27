import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

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

const LocationImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 20px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
`;

const LocationTitle = styled.h2`
  font-size: 28px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
`;

const LocationSubtitle = styled.p`
  font-size: 16px;
  color: #666;
  margin-bottom: 20px;
`;

const InfoCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
`;

const InfoTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const InfoText = styled.p`
  font-size: 14px;
  line-height: 1.6;
  color: #555;
  margin-bottom: 10px;
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
  margin-bottom: 10px;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
  }
`;

const locationDetails = {
  'sangmugwan': {
    name: '상무관',
    subtitle: '시민들의 집회 장소',
    image: '/assets/sangmugwan.jpeg',
    history: '1980년 5월 18일, 전남대학교 학생들의 시위가 시작된 후 시민들이 모여든 곳입니다. 계엄군의 진압에 맞서 시민들이 연대하며 민주주의를 외쳤던 상징적인 장소입니다.',
    significance: '5.18 민주화운동의 시발점이 된 곳으로, 학생과 시민이 하나 되어 불의에 맞선 역사적 현장입니다.',
    currentStatus: '현재는 문화예술회관으로 사용되고 있으며, 당시의 역사를 기억하는 기념공간이 마련되어 있습니다.',
    hasVideo: true
  },
  'jeonnam-dochung': {
    name: '전남도청',
    subtitle: '시민군의 마지막 항쟁지',
    image: '/assets/jeonnam-dochung.jpg',
    history: '1980년 5월 21일부터 27일까지 시민군이 점거하며 끝까지 항쟁했던 곳입니다. 계엄군의 최후 진압작전이 이루어진 5.18의 마지막 현장입니다.',
    significance: '민주주의를 위해 목숨을 바친 시민들의 숭고한 희생정신이 깃든 곳으로, 5.18 정신의 상징입니다.',
    currentStatus: '현재는 5.18 기념관과 민주평화교육원이 설치되어 역사교육의 장으로 활용되고 있습니다.',
    hasVideo: false
  },
  'dochung-minwon': {
    name: '도청 민원실',
    subtitle: '시민들의 소통 공간',
    image: '/assets/dochung-minwon.jpg',
    history: '시민군이 도청을 점거한 기간 동안 시민들과의 소통창구 역할을 했던 곳입니다. 많은 시민들이 이곳을 통해 상황을 파악하고 서로를 격려했습니다.',
    significance: '혼란스러운 상황에서도 질서를 유지하며 민주적 절차를 지키려 했던 시민들의 성숙한 시민의식을 보여주는 공간입니다.',
    currentStatus: '현재는 역사적 의미를 보존하며 시민들에게 개방되어 있습니다.',
    hasVideo: false
  },
  'girok-forest': {
    name: '기록의 숲',
    subtitle: '기억과 기록의 공간',
    image: '/assets/girok-forest.jpg',
    history: '5.18 민주화운동의 기록과 증언을 보존하고 전시하는 공간입니다. 당시의 생생한 증언과 자료들이 전시되어 있습니다.',
    significance: '역사의 진실을 기록하고 후세에 전달하는 중요한 역할을 하는 곳으로, 5.18 정신의 계승을 위한 교육공간입니다.',
    currentStatus: '현재 다양한 전시와 교육 프로그램을 통해 5.18의 역사를 알리고 있습니다.',
    hasVideo: false
  },
  'hospital': {
    name: '병원',
    subtitle: '생명을 구한 의료진들의 현장',
    image: '/assets/hospital.jpg',
    history: '1980년 5월, 계엄군의 무력진압으로 부상당한 시민들을 치료했던 곳입니다. 의료진들은 위험을 무릅쓰고 부상자들을 치료하며 생명을 구했습니다.',
    significance: '인도주의 정신으로 부상자들을 치료한 의료진들의 숭고한 희생정신이 깃든 곳입니다.',
    currentStatus: '현재도 지역 의료기관으로 운영되며, 당시의 역사를 기억하는 기념공간이 마련되어 있습니다.',
    hasVideo: true
  },
  'daein-market': {
    name: '대인시장',
    subtitle: '시민들의 연대와 나눔의 현장',
    image: '/assets/daein-market.png',
    history: '1980년 5월, 시민들이 모여 서로를 위로하고 도움을 주고받았던 곳입니다. 상인들은 시민군과 부상자들에게 음식과 생필품을 제공했습니다.',
    significance: '어려운 상황에서도 서로를 돕고 연대했던 광주 시민들의 따뜻한 인정과 공동체 정신을 보여주는 곳입니다.',
    currentStatus: '현재도 전통시장으로 운영되며, 당시의 나눔 정신이 이어지고 있습니다.',
    hasVideo: true
  },
  '518-cemetery': {
    name: '국립 5.18 민주묘지',
    subtitle: '영령들이 잠든 성역',
    image: '/assets/518-cemetery.jpg',
    history: '5.18 민주화운동 과정에서 희생된 분들이 안장된 곳입니다. 민주주의를 위해 목숨을 바친 영령들의 넋을 기리는 성스러운 공간입니다.',
    significance: '5.18 정신을 계승하고 민주주의의 소중함을 되새기는 추모와 다짐의 공간입니다.',
    currentStatus: '매년 5월 18일 추모제가 열리며, 많은 시민들이 참배하는 민주성지입니다.',
    hasVideo: false
  }
};

function LocationDetailPage() {
  const navigate = useNavigate();
  const { locationId } = useParams();
  const location = locationDetails[locationId];

  const handleBackClick = () => {
    navigate(`/mission/${locationId}`);
  };

  const handleMissionClick = () => {
    navigate(`/mission/${locationId}`);
  };

  if (!location) {
    return <div>장소 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <Container>
      <Header>
        <BackButton onClick={handleBackClick}>←</BackButton>
        <Title>장소 정보</Title>
      </Header>
      
      <Content>
        <LocationImage src={location.image} alt={location.name} />
        <LocationTitle>{location.name}</LocationTitle>
        <LocationSubtitle>{location.subtitle}</LocationSubtitle>

        <InfoCard>
          <InfoTitle>📚 역사적 배경</InfoTitle>
          <InfoText>{location.history}</InfoText>
        </InfoCard>

        <InfoCard>
          <InfoTitle>⭐ 역사적 의의</InfoTitle>
          <InfoText>{location.significance}</InfoText>
        </InfoCard>

        <InfoCard>
          <InfoTitle>🏛️ 현재 모습</InfoTitle>
          <InfoText>{location.currentStatus}</InfoText>
        </InfoCard>

        <ActionButton onClick={handleMissionClick}>
          미션 수행하러 가기
        </ActionButton>
      </Content>
    </Container>
  );
}

export default LocationDetailPage; 