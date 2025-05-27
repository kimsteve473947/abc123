import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import BottomNavigation from './BottomNavigation';

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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

const Title = styled.h1`
  font-size: 20px;
  font-weight: 600;
  color: white;
`;

const Content = styled.div`
  flex: 1;
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
  width: 100%;
`;

const ProfileCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 25px;
  margin-bottom: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  text-align: center;
`;

const Avatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  margin: 0 auto 15px;
  color: white;
`;

const UserName = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
`;

const UserLevel = styled.div`
  font-size: 14px;
  color: #667eea;
  font-weight: 600;
  margin-bottom: 15px;
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 15px;
  margin-bottom: 20px;
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #333;
`;

const StatLabel = styled.div`
  font-size: 12px;
  color: #666;
`;

const BadgeContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
`;

const Badge = styled.div`
  background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
  color: white;
  padding: 5px 12px;
  border-radius: 15px;
  font-size: 12px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const FeedContainer = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 25px;
  margin-bottom: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
`;

const FeedTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #333;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const PostCard = styled.div`
  background: #f8f9fa;
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 15px;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
  }
`;

const PostHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const PostAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: white;
  margin-right: 12px;
`;

const PostUserInfo = styled.div`
  flex: 1;
`;

const PostUserName = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #333;
`;

const PostTime = styled.div`
  font-size: 12px;
  color: #666;
`;

const PostContent = styled.div`
  font-size: 14px;
  line-height: 1.6;
  color: #333;
  margin-bottom: 15px;
`;

const PostImage = styled.div`
  width: 100%;
  height: 200px;
  background: linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  margin-bottom: 15px;
`;

const PostActions = styled.div`
  display: flex;
  gap: 20px;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: #666;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: color 0.3s ease;
  
  &:hover {
    color: #667eea;
  }
  
  &.liked {
    color: #e74c3c;
  }
`;

const ChallengeCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 25px;
  margin-bottom: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
`;

const ChallengeTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #333;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ChallengeItem = styled.div`
  background: linear-gradient(135deg, #f8f9ff 0%, #e8f0ff 100%);
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 15px;
  border-left: 4px solid #667eea;
`;

const ChallengeName = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
`;

const ChallengeDescription = styled.div`
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
`;

const ChallengeProgress = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ProgressBar = styled.div`
  flex: 1;
  height: 8px;
  background: rgba(102, 126, 234, 0.2);
  border-radius: 4px;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #667eea, #764ba2);
  width: ${props => props.progress}%;
  transition: width 0.5s ease;
`;

const ProgressText = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: #667eea;
`;

const FloatingButton = styled.button`
  position: fixed;
  bottom: 120px;
  right: 20px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  z-index: 40;
  
  &:hover {
    transform: scale(1.1);
  }
`;

const mockPosts = [
  {
    id: 1,
    user: '김민수',
    avatar: '👨',
    time: '2시간 전',
    content: '대인시장에서 할머니께서 들려주신 1980년 이야기가 정말 감동적이었어요. 역사를 직접 체험할 수 있어서 좋았습니다.',
    image: '📸',
    likes: 24,
    comments: 8,
    location: '대인시장'
  },
  {
    id: 2,
    user: '이지은',
    avatar: '👩',
    time: '5시간 전',
    content: '전남도청 AR 체험이 정말 놀라웠어요! 과거와 현재를 비교해보니 더 생생하게 느껴졌습니다.',
    image: '🎥',
    likes: 31,
    comments: 12,
    location: '전남도청'
  },
  {
    id: 3,
    user: '박준호',
    avatar: '👨‍🎓',
    time: '1일 전',
    content: '5.18 민주묘지에서 묵념을 올렸습니다. 평화의 소중함을 다시 한번 느꼈어요.',
    image: '🕯️',
    likes: 45,
    comments: 15,
    location: '5.18 민주묘지'
  }
];

const mockChallenges = [
  {
    id: 1,
    name: '역사 탐험가',
    description: '모든 장소를 방문하고 사진을 촬영하세요',
    progress: 60,
    total: 7
  },
  {
    id: 2,
    name: '스토리텔러',
    description: '3개 이상의 후기를 작성하세요',
    progress: 33,
    total: 3
  },
  {
    id: 3,
    name: '소셜 마스터',
    description: '친구들과 10개의 게시물을 공유하세요',
    progress: 80,
    total: 10
  }
];

function SocialPage() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState(mockPosts);
  const [userStats, setUserStats] = useState({
    visitedPlaces: 4,
    totalPhotos: 12,
    sharedPosts: 8,
    level: 3,
    badges: ['🏛️', '📸', '🎯']
  });

  const handleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.likes + 1 }
        : post
    ));
  };

  const handleCreatePost = () => {
    alert('📝 새 게시물 작성 기능이 곧 추가됩니다!');
  };

  return (
    <Container>
      <Header>
        <Title>커뮤니티</Title>
      </Header>
      
      <Content>
        <ProfileCard>
          <Avatar>👤</Avatar>
          <UserName>광주 탐험가</UserName>
          <UserLevel>레벨 {userStats.level} • 역사 애호가</UserLevel>
          
          <StatsContainer>
            <StatItem>
              <StatNumber>{userStats.visitedPlaces}</StatNumber>
              <StatLabel>방문한 곳</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>{userStats.totalPhotos}</StatNumber>
              <StatLabel>촬영한 사진</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>{userStats.sharedPosts}</StatNumber>
              <StatLabel>공유한 글</StatLabel>
            </StatItem>
          </StatsContainer>
          
          <BadgeContainer>
            {userStats.badges.map((badge, index) => (
              <Badge key={index}>
                {badge} 획득
              </Badge>
            ))}
          </BadgeContainer>
        </ProfileCard>

        <ChallengeCard>
          <ChallengeTitle>🎯 진행 중인 챌린지</ChallengeTitle>
          {mockChallenges.map((challenge) => (
            <ChallengeItem key={challenge.id}>
              <ChallengeName>{challenge.name}</ChallengeName>
              <ChallengeDescription>{challenge.description}</ChallengeDescription>
              <ChallengeProgress>
                <ProgressBar>
                  <ProgressFill progress={challenge.progress} />
                </ProgressBar>
                <ProgressText>{Math.floor(challenge.total * challenge.progress / 100)}/{challenge.total}</ProgressText>
              </ChallengeProgress>
            </ChallengeItem>
          ))}
        </ChallengeCard>

        <FeedContainer>
          <FeedTitle>📱 커뮤니티 피드</FeedTitle>
          {posts.map((post) => (
            <PostCard key={post.id}>
              <PostHeader>
                <PostAvatar>{post.avatar}</PostAvatar>
                <PostUserInfo>
                  <PostUserName>{post.user}</PostUserName>
                  <PostTime>{post.time} • {post.location}</PostTime>
                </PostUserInfo>
              </PostHeader>
              
              <PostContent>{post.content}</PostContent>
              
              <PostImage>{post.image}</PostImage>
              
              <PostActions>
                <ActionButton onClick={() => handleLike(post.id)}>
                  ❤️ {post.likes}
                </ActionButton>
                <ActionButton>
                  💬 {post.comments}
                </ActionButton>
                <ActionButton>
                  🔗 공유
                </ActionButton>
              </PostActions>
            </PostCard>
          ))}
        </FeedContainer>
      </Content>

      <FloatingButton onClick={handleCreatePost}>
        ✏️
      </FloatingButton>
      
      <BottomNavigation />
    </Container>
  );
}

export default SocialPage; 