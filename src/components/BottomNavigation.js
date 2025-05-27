import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const NavContainer = styled.div`
  width: 100%;
  height: 80px;
  background-color: white;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0 -2px 4px rgba(0,0,0,0.1);
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 100;
`;

const NavItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: all 0.2s ease;
  color: ${props => props.active ? '#667eea' : '#666'};
  
  &:hover {
    background-color: #f0f0f0;
  }
`;

const NavIcon = styled.div`
  font-size: 24px;
  margin-bottom: 4px;
`;

const NavLabel = styled.span`
  font-size: 10px;
  font-weight: 500;
`;

function BottomNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    {
      id: 'home',
      icon: '🏠',
      label: '홈',
      path: '/'
    },
    {
      id: 'map',
      icon: '🗺️',
      label: '지도',
      path: '/map'
    },
    {
      id: 'progress',
      icon: '📊',
      label: '진행상황',
      path: '/progress'
    },
    {
      id: 'info',
      icon: 'ℹ️',
      label: '정보',
      path: '/info'
    }
  ];

  const handleNavClick = (path) => {
    navigate(path);
  };

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <NavContainer>
      {navItems.map((item) => (
        <NavItem
          key={item.id}
          active={isActive(item.path)}
          onClick={() => handleNavClick(item.path)}
        >
          <NavIcon>{item.icon}</NavIcon>
          <NavLabel>{item.label}</NavLabel>
        </NavItem>
      ))}
    </NavContainer>
  );
}

export default BottomNavigation; 