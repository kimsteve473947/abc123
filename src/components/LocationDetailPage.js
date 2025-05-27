import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  display: flex;
  flex-direction: column;
  padding-bottom: 100px;
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
  max-width: 600px;
  margin: 0 auto;
  width: 100%;
`;

const HeroSection = styled.div`
  position: relative;
  margin-bottom: 30px;
`;

const LocationImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.15);
`;

const ImageOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0,0,0,0.7));
  color: white;
  padding: 30px 20px 20px;
  border-radius: 0 0 20px 20px;
`;

const LocationTitle = styled.h2`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 5px;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
`;

const LocationSubtitle = styled.p`
  font-size: 16px;
  opacity: 0.9;
`;

const TabContainer = styled.div`
  display: flex;
  background: white;
  border-radius: 15px;
  padding: 5px;
  margin-bottom: 20px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
`;

const Tab = styled.button`
  flex: 1;
  padding: 12px 16px;
  border: none;
  background: ${props => props.active ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'transparent'};
  color: ${props => props.active ? 'white' : '#666'};
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.active ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'rgba(102, 126, 234, 0.1)'};
  }
`;

const InfoCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 25px;
  margin-bottom: 20px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
  }
`;

const InfoTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: #333;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const InfoText = styled.p`
  font-size: 15px;
  line-height: 1.7;
  color: #555;
  margin-bottom: 15px;
`;

const FactsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const FactItem = styled.li`
  background: linear-gradient(135deg, #f8f9ff 0%, #e8f0ff 100%);
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 12px;
  border-left: 4px solid #667eea;
  font-size: 14px;
  line-height: 1.6;
  color: #333;
`;

const TimelineContainer = styled.div`
  position: relative;
  padding-left: 30px;
`;

const TimelineItem = styled.div`
  position: relative;
  margin-bottom: 25px;
  
  &::before {
    content: '';
    position: absolute;
    left: -22px;
    top: 5px;
    width: 12px;
    height: 12px;
    background: #667eea;
    border-radius: 50%;
    border: 3px solid white;
    box-shadow: 0 0 0 3px #667eea;
  }
  
  &::after {
    content: '';
    position: absolute;
    left: -16px;
    top: 20px;
    width: 2px;
    height: calc(100% + 10px);
    background: linear-gradient(to bottom, #667eea, transparent);
  }
  
  &:last-child::after {
    display: none;
  }
`;

const TimelineDate = styled.div`
  font-weight: 700;
  color: #667eea;
  font-size: 14px;
  margin-bottom: 5px;
`;

const TimelineContent = styled.div`
  background: white;
  padding: 15px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  font-size: 14px;
  line-height: 1.6;
  color: #333;
`;

const ActionButtonContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin-top: 30px;
`;

const ActionButton = styled.button`
  background: ${props => props.primary ? 
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 
    'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
  };
  color: ${props => props.primary ? 'white' : '#333'};
  border: none;
  padding: 18px 20px;
  border-radius: 15px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.2);
  }
`;

const InteractiveMap = styled.div`
  width: 100%;
  height: 200px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 20px;
  
  &:hover {
    transform: scale(1.02);
  }
`;

const PhotoGallery = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
  margin-bottom: 20px;
`;

const GalleryImage = styled.div`
  aspect-ratio: 1;
  background: linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const ReviewSection = styled.div`
  background: white;
  border-radius: 20px;
  padding: 25px;
  margin-bottom: 20px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.1);
`;

const ReviewInput = styled.textarea`
  width: 100%;
  min-height: 100px;
  border: 2px solid #f0f0f0;
  border-radius: 12px;
  padding: 15px;
  font-size: 14px;
  resize: vertical;
  margin-bottom: 15px;
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const SubmitButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
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
    timeline: [
      { date: '1980.05.18', content: '전남대 학생들의 시위 시작' },
      { date: '1980.05.19', content: '시민들이 합류하여 대규모 집회' },
      { date: '1980.05.20', content: '계엄군의 무력진압 시작' }
    ],
    facts: [
      '전남대학교 학생들이 처음 모인 장소',
      '시민과 학생이 연대한 상징적 공간',
      '현재 문화예술 공간으로 활용'
    ],
    coordinates: { lat: 35.1595, lng: 126.8526 },
    hasVideo: true
  },
  'jeonnam-dochung': {
    name: '전남도청',
    subtitle: '시민군의 마지막 항쟁지',
    image: '/assets/jeonnam-dochung.jpg',
    history: '1980년 5월 21일부터 27일까지 시민군이 점거하며 끝까지 항쟁했던 곳입니다. 계엄군의 최후 진압작전이 이루어진 5.18의 마지막 현장입니다.',
    significance: '민주주의를 위해 목숨을 바친 시민들의 숭고한 희생정신이 깃든 곳으로, 5.18 정신의 상징입니다.',
    currentStatus: '현재는 5.18 기념관과 민주평화교육원이 설치되어 역사교육의 장으로 활용되고 있습니다.',
    timeline: [
      { date: '1980.05.21', content: '시민군이 도청 점거' },
      { date: '1980.05.22-26', content: '시민군의 자치 기간' },
      { date: '1980.05.27', content: '계엄군의 최후 진압작전' }
    ],
    facts: [
      '시민군이 6일간 점거한 마지막 항쟁지',
      '민주주의를 위한 최후의 보루',
      '현재 5.18 기념공간으로 보존'
    ],
    coordinates: { lat: 35.1595, lng: 126.8526 },
    hasVideo: false
  },
  'dochung-minwon': {
    name: '도청 민원실',
    subtitle: '시민들의 소통 공간',
    image: '/assets/dochung-minwon.jpg',
    history: '시민군이 도청을 점거한 기간 동안 시민들과의 소통창구 역할을 했던 곳입니다. 많은 시민들이 이곳을 통해 상황을 파악하고 서로를 격려했습니다.',
    significance: '혼란스러운 상황에서도 질서를 유지하며 민주적 절차를 지키려 했던 시민들의 성숙한 시민의식을 보여주는 공간입니다.',
    currentStatus: '현재는 역사적 의미를 보존하며 시민들에게 개방되어 있습니다.',
    timeline: [
      { date: '1980.05.21', content: '시민들의 소통창구로 활용 시작' },
      { date: '1980.05.22-26', content: '민주적 질서 유지의 중심' },
      { date: '현재', content: '역사교육 공간으로 활용' }
    ],
    facts: [
      '시민들의 소통과 정보 교환 장소',
      '민주적 질서 유지의 상징',
      '시민의식의 성숙함을 보여주는 공간'
    ],
    coordinates: { lat: 35.1595, lng: 126.8526 },
    hasVideo: false
  },
  'girok-forest': {
    name: '기록의 숲',
    subtitle: '기억과 기록의 공간',
    image: '/assets/girok-forest.jpg',
    history: '5.18 민주화운동의 기록과 증언을 보존하고 전시하는 공간입니다. 당시의 생생한 증언과 자료들이 전시되어 있습니다.',
    significance: '역사의 진실을 기록하고 후세에 전달하는 중요한 역할을 하는 곳으로, 5.18 정신의 계승을 위한 교육공간입니다.',
    currentStatus: '현재 다양한 전시와 교육 프로그램을 통해 5.18의 역사를 알리고 있습니다.',
    timeline: [
      { date: '1980년대', content: '증언과 기록 수집 시작' },
      { date: '1990년대', content: '체계적인 자료 정리' },
      { date: '현재', content: '디지털 아카이브 구축' }
    ],
    facts: [
      '5.18 관련 자료와 증언 보존',
      '역사교육과 연구의 중심지',
      '디지털 아카이브로 전 세계 공개'
    ],
    coordinates: { lat: 35.1595, lng: 126.8526 },
    hasVideo: false
  },
  'hospital': {
    name: '병원',
    subtitle: '생명을 구한 의료진들의 현장',
    image: '/assets/hospital.jpg',
    history: '1980년 5월, 계엄군의 무력진압으로 부상당한 시민들을 치료했던 곳입니다. 의료진들은 위험을 무릅쓰고 부상자들을 치료하며 생명을 구했습니다.',
    significance: '인도주의 정신으로 부상자들을 치료한 의료진들의 숭고한 희생정신이 깃든 곳입니다.',
    currentStatus: '현재도 지역 의료기관으로 운영되며, 당시의 역사를 기억하는 기념공간이 마련되어 있습니다.',
    timeline: [
      { date: '1980.05.18-27', content: '부상자 응급치료' },
      { date: '1980.05.21', content: '의료진들의 헌신적 치료' },
      { date: '현재', content: '의료진 추모공간 운영' }
    ],
    facts: [
      '5.18 당시 부상자 치료의 중심지',
      '의료진들의 인도주의적 헌신',
      '생명을 구한 천사들의 현장'
    ],
    coordinates: { lat: 35.1595, lng: 126.8526 },
    hasVideo: true
  },
  'daein-market': {
    name: '대인시장',
    subtitle: '시민들의 연대와 나눔의 현장',
    image: '/assets/daein-market.png',
    history: '1980년 5월, 시민들이 모여 서로를 위로하고 도움을 주고받았던 곳입니다. 상인들은 시민군과 부상자들에게 음식과 생필품을 제공했습니다.',
    significance: '어려운 상황에서도 서로를 돕고 연대했던 광주 시민들의 따뜻한 인정과 공동체 정신을 보여주는 곳입니다.',
    currentStatus: '현재도 전통시장으로 운영되며, 당시의 나눔 정신이 이어지고 있습니다.',
    timeline: [
      { date: '1980.05.18-27', content: '시민군에게 음식과 물자 제공' },
      { date: '1980.05.21', content: '상인들의 자발적 연대' },
      { date: '현재', content: '전통시장으로 계속 운영' }
    ],
    facts: [
      '시민들에게 음식과 물자를 제공한 곳',
      '상인들의 자발적 연대와 나눔',
      '현재도 광주의 대표적인 전통시장'
    ],
    coordinates: { lat: 35.1462, lng: 126.9178 },
    hasVideo: true
  },
  '518-cemetery': {
    name: '국립 5.18 민주묘지',
    subtitle: '영령들이 잠든 성역',
    image: '/assets/518-cemetery.jpg',
    history: '5.18 민주화운동 과정에서 희생된 분들이 안장된 곳입니다. 민주주의를 위해 목숨을 바친 영령들의 넋을 기리는 성스러운 공간입니다.',
    significance: '5.18 정신을 계승하고 민주주의의 소중함을 되새기는 추모와 다짐의 공간입니다.',
    currentStatus: '매년 5월 18일 추모제가 열리며, 많은 시민들이 참배하는 민주성지입니다.',
    timeline: [
      { date: '1980.05.27', content: '희생자들의 임시 매장' },
      { date: '1997', content: '국립묘지로 승격' },
      { date: '매년 5.18', content: '추모제 개최' }
    ],
    facts: [
      '5.18 희생자들의 영면처',
      '민주주의 성지로 인정',
      '매년 추모행사가 열리는 곳'
    ],
    coordinates: { lat: 35.1595, lng: 126.8526 },
    hasVideo: false
  }
};

function LocationDetailPage() {
  const navigate = useNavigate();
  const { locationId } = useParams();
  const [activeTab, setActiveTab] = useState('history');
  const [review, setReview] = useState('');
  const location = locationDetails[locationId];

  const handleBackClick = () => {
    navigate(`/mission/${locationId}`);
  };

  const handleMissionClick = () => {
    navigate(`/mission/${locationId}`);
  };

  const handleMapClick = () => {
    if (location.coordinates) {
      window.open(`https://maps.google.com/?q=${location.coordinates.lat},${location.coordinates.lng}`, '_blank');
    }
  };

  const handleVideoClick = () => {
    if (location.hasVideo) {
      navigate(`/video/${locationId}`);
    } else {
      alert('🎬 이 장소의 영상은 곧 공개됩니다!');
    }
  };

  const handleReviewSubmit = () => {
    if (review.trim()) {
      alert('💬 소중한 후기가 등록되었습니다!');
      setReview('');
    }
  };

  const handleShareClick = () => {
    if (navigator.share) {
      navigator.share({
        title: `${location.name} - 광주 다크투어리즘`,
        text: location.history,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('📋 링크가 클립보드에 복사되었습니다!');
    }
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
        <HeroSection>
          <LocationImage src={location.image} alt={location.name} />
          <ImageOverlay>
            <LocationTitle>{location.name}</LocationTitle>
            <LocationSubtitle>{location.subtitle}</LocationSubtitle>
          </ImageOverlay>
        </HeroSection>

        <TabContainer>
          <Tab active={activeTab === 'history'} onClick={() => setActiveTab('history')}>
            📚 역사
          </Tab>
          <Tab active={activeTab === 'timeline'} onClick={() => setActiveTab('timeline')}>
            ⏰ 타임라인
          </Tab>
          <Tab active={activeTab === 'gallery'} onClick={() => setActiveTab('gallery')}>
            📸 갤러리
          </Tab>
          <Tab active={activeTab === 'review'} onClick={() => setActiveTab('review')}>
            💬 후기
          </Tab>
        </TabContainer>

        {activeTab === 'history' && (
          <>
            <InfoCard>
              <InfoTitle>📖 역사적 배경</InfoTitle>
              <InfoText>{location.history}</InfoText>
            </InfoCard>

            <InfoCard>
              <InfoTitle>⭐ 역사적 의미</InfoTitle>
              <InfoText>{location.significance}</InfoText>
            </InfoCard>

            <InfoCard>
              <InfoTitle>🏛️ 현재 상황</InfoTitle>
              <InfoText>{location.currentStatus}</InfoText>
            </InfoCard>

            <InfoCard>
              <InfoTitle>💡 주요 사실들</InfoTitle>
              <FactsList>
                {location.facts.map((fact, index) => (
                  <FactItem key={index}>{fact}</FactItem>
                ))}
              </FactsList>
            </InfoCard>
          </>
        )}

        {activeTab === 'timeline' && (
          <InfoCard>
            <InfoTitle>⏰ 역사적 타임라인</InfoTitle>
            <TimelineContainer>
              {location.timeline.map((item, index) => (
                <TimelineItem key={index}>
                  <TimelineDate>{item.date}</TimelineDate>
                  <TimelineContent>{item.content}</TimelineContent>
                </TimelineItem>
              ))}
            </TimelineContainer>
          </InfoCard>
        )}

        {activeTab === 'gallery' && (
          <>
            <InfoCard>
              <InfoTitle>📸 사진 갤러리</InfoTitle>
              <PhotoGallery>
                <GalleryImage>📷</GalleryImage>
                <GalleryImage>🎥</GalleryImage>
                <GalleryImage>📰</GalleryImage>
                <GalleryImage>📄</GalleryImage>
              </PhotoGallery>
            </InfoCard>
            
            <InteractiveMap onClick={handleMapClick}>
              🗺️ 지도에서 위치 확인하기
            </InteractiveMap>
          </>
        )}

        {activeTab === 'review' && (
          <ReviewSection>
            <InfoTitle>💬 방문 후기 작성</InfoTitle>
            <ReviewInput
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="이 장소를 방문한 소감을 남겨주세요..."
            />
            <SubmitButton onClick={handleReviewSubmit}>
              후기 등록하기
            </SubmitButton>
          </ReviewSection>
        )}

        <ActionButtonContainer>
          <ActionButton primary onClick={handleMissionClick}>
            🎯 미션하기
          </ActionButton>
          <ActionButton onClick={handleVideoClick}>
            🎬 영상보기
          </ActionButton>
          <ActionButton onClick={handleMapClick}>
            🗺️ 지도보기
          </ActionButton>
          <ActionButton onClick={handleShareClick}>
            🔗 공유하기
          </ActionButton>
        </ActionButtonContainer>
      </Content>
    </Container>
  );
}

export default LocationDetailPage; 