import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
  padding: 20px;
  box-sizing: border-box;
`;

const Logo = styled.div`
  font-size: 48px;
  margin-bottom: 20px;
  animation: ${fadeIn} 1s ease-out;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 10px;
  animation: ${fadeIn} 1s ease-out 0.2s both;
`;

const Subtitle = styled.h2`
  font-size: 18px;
  font-weight: 300;
  margin-bottom: 40px;
  opacity: 0.9;
  animation: ${fadeIn} 1s ease-out 0.4s both;
`;

const Description = styled.p`
  font-size: 16px;
  line-height: 1.6;
  max-width: 600px;
  margin-bottom: 50px;
  opacity: 0.8;
  animation: ${fadeIn} 1s ease-out 0.6s both;
`;

const StartButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid white;
  color: white;
  padding: 15px 40px;
  font-size: 18px;
  font-weight: 600;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  animation: ${fadeIn} 1s ease-out 0.8s both;
  
  &:hover {
    background: white;
    color: #667eea;
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.2);
  }
`;

const Features = styled.div`
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-top: 40px;
  animation: ${fadeIn} 1s ease-out 1s both;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const Feature = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 150px;
`;

const FeatureIcon = styled.div`
  font-size: 32px;
  margin-bottom: 10px;
`;

const FeatureText = styled.p`
  font-size: 14px;
  opacity: 0.8;
  text-align: center;
`;

function HomePage() {
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate('/map');
  };

  return (
    <Container>
      <Logo>🏛️</Logo>
      <Title>5.18 역사 탐방</Title>
      <Subtitle>광주의 민주화 역사를 따라가는 여행</Subtitle>
      <Description>
        1980년 5월 광주에서 일어난 민주화운동의 현장을 직접 방문하고, 
        AI로 복원된 당시의 모습을 통해 역사를 생생하게 체험해보세요.
        각 장소에서 사진을 찍고 역사의 흔적을 기록해보세요.
      </Description>
      <StartButton onClick={handleStartClick}>
        탐방 시작하기
      </StartButton>
      
      <Features>
        <Feature>
          <FeatureIcon>🗺️</FeatureIcon>
          <FeatureText>역사적 장소 탐방</FeatureText>
        </Feature>
        <Feature>
          <FeatureIcon>🎬</FeatureIcon>
          <FeatureText>AI 복원 영상</FeatureText>
        </Feature>
        <Feature>
          <FeatureIcon>📸</FeatureIcon>
          <FeatureText>사진 기록</FeatureText>
        </Feature>
      </Features>
    </Container>
  );
}

export default HomePage; 