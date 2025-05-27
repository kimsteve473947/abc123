import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  padding-bottom: 80px;
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

const Title = styled.h1`
  font-size: 20px;
  font-weight: 600;
  color: #333;
`;

const Content = styled.div`
  flex: 1;
  padding: 20px;
`;

const InfoCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
`;

const InfoTitle = styled.h2`
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

const Timeline = styled.div`
  margin-top: 15px;
`;

const TimelineItem = styled.div`
  display: flex;
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
  
  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
`;

const TimelineDate = styled.div`
  min-width: 80px;
  font-weight: 600;
  color: #667eea;
  font-size: 12px;
`;

const TimelineContent = styled.div`
  flex: 1;
  font-size: 13px;
  line-height: 1.5;
  color: #555;
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  font-size: 14px;
  color: #555;
`;

const ContactInfo = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
`;

const ContactTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const ContactText = styled.p`
  font-size: 14px;
  opacity: 0.9;
  margin: 5px 0;
`;

function InfoPage() {
  const navigate = useNavigate();

  const timelineData = [
    {
      date: '5월 18일',
      content: '전남대학교에서 학생 시위 시작, 계엄군 진압으로 부상자 발생'
    },
    {
      date: '5월 19일',
      content: '시위 확산, 시민들이 학생들과 연대하기 시작'
    },
    {
      date: '5월 20일',
      content: '계엄군의 무력진압 강화, 시민들의 저항 격화'
    },
    {
      date: '5월 21일',
      content: '시민군 결성, 전남도청 점거'
    },
    {
      date: '5월 22-26일',
      content: '시민군의 자치 기간, 질서 유지와 민주적 운영'
    },
    {
      date: '5월 27일',
      content: '계엄군의 최후 진압작전, 도청 재점령'
    }
  ];

  return (
    <Container>
      <Header>
        <Title>5.18 정보</Title>
      </Header>
      
      <Content>
        <InfoCard>
          <InfoTitle>📖 5.18 민주화운동이란?</InfoTitle>
          <InfoText>
            1980년 5월 18일부터 27일까지 광주와 전라남도 일원에서 일어난 민주화운동입니다. 
            신군부의 집권 연장 시도에 맞서 광주 시민들이 민주주의를 요구하며 일으킨 항쟁으로, 
            한국 민주주의 발전에 큰 영향을 미쳤습니다.
          </InfoText>
        </InfoCard>

        <InfoCard>
          <InfoTitle>📅 주요 일정</InfoTitle>
          <Timeline>
            {timelineData.map((item, index) => (
              <TimelineItem key={index}>
                <TimelineDate>{item.date}</TimelineDate>
                <TimelineContent>{item.content}</TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </InfoCard>

        <InfoCard>
          <InfoTitle>🎯 앱 사용법</InfoTitle>
          <FeatureList>
            <FeatureItem>
              <span>🗺️</span>
              <span>지도에서 역사적 장소들을 확인하세요</span>
            </FeatureItem>
            <FeatureItem>
              <span>📍</span>
              <span>마커를 클릭하여 각 장소의 미션을 수행하세요</span>
            </FeatureItem>
            <FeatureItem>
              <span>📸</span>
              <span>현장에서 사진을 촬영하여 기록을 남기세요</span>
            </FeatureItem>
            <FeatureItem>
              <span>🎬</span>
              <span>AI로 복원된 과거 영상을 시청하세요</span>
            </FeatureItem>
            <FeatureItem>
              <span>📊</span>
              <span>진행상황 페이지에서 탐방 현황을 확인하세요</span>
            </FeatureItem>
          </FeatureList>
        </InfoCard>

        <InfoCard>
          <InfoTitle>🏛️ 5.18 정신</InfoTitle>
          <InfoText>
            <strong>민주주의:</strong> 독재에 맞서 민주주의를 수호하려 했던 정신
          </InfoText>
          <InfoText>
            <strong>인권존중:</strong> 모든 사람의 인권과 존엄성을 중시하는 정신
          </InfoText>
          <InfoText>
            <strong>정의:</strong> 불의에 맞서 정의를 실현하려는 의지
          </InfoText>
          <InfoText>
            <strong>연대:</strong> 어려운 상황에서도 서로를 돕고 연대하는 공동체 정신
          </InfoText>
        </InfoCard>

        <ContactInfo>
          <ContactTitle>📞 문의 및 도움말</ContactTitle>
          <ContactText>5.18 기념재단: 062-360-0518</ContactText>
          <ContactText>국립 5.18 민주묘지: 062-268-0518</ContactText>
          <ContactText>앱 관련 문의: help@518history.kr</ContactText>
        </ContactInfo>
      </Content>
    </Container>
  );
}

export default InfoPage; 