import React, { createContext, useContext, useState, useEffect } from 'react';

const ProgressContext = createContext();

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};

export const ProgressProvider = ({ children }) => {
  const [visitedLocations, setVisitedLocations] = useState(() => {
    const saved = localStorage.getItem('visitedLocations');
    return saved ? JSON.parse(saved) : [];
  });

  const [photosTaken, setPhotosTaken] = useState(() => {
    const saved = localStorage.getItem('photosTaken');
    return saved ? JSON.parse(saved) : {};
  });

  const [completedVideos, setCompletedVideos] = useState(() => {
    const saved = localStorage.getItem('completedVideos');
    return saved ? JSON.parse(saved) : [];
  });

  // 로컬 스토리지에 저장
  useEffect(() => {
    localStorage.setItem('visitedLocations', JSON.stringify(visitedLocations));
  }, [visitedLocations]);

  useEffect(() => {
    localStorage.setItem('photosTaken', JSON.stringify(photosTaken));
  }, [photosTaken]);

  useEffect(() => {
    localStorage.setItem('completedVideos', JSON.stringify(completedVideos));
  }, [completedVideos]);

  const markLocationVisited = (locationId) => {
    if (!visitedLocations.includes(locationId)) {
      setVisitedLocations(prev => [...prev, locationId]);
    }
  };

  const markPhotoTaken = (locationId, photoData) => {
    setPhotosTaken(prev => ({
      ...prev,
      [locationId]: {
        ...photoData,
        timestamp: new Date().toISOString()
      }
    }));
  };

  const markVideoCompleted = (locationId) => {
    if (!completedVideos.includes(locationId)) {
      setCompletedVideos(prev => [...prev, locationId]);
    }
  };

  const isLocationVisited = (locationId) => {
    return visitedLocations.includes(locationId);
  };

  const isPhotoTaken = (locationId) => {
    return !!photosTaken[locationId];
  };

  const isVideoCompleted = (locationId) => {
    return completedVideos.includes(locationId);
  };

  const getProgress = () => {
    const totalLocations = 7; // 전체 장소 수
    const visitedCount = visitedLocations.length;
    const photoCount = Object.keys(photosTaken).length;
    const videoCount = completedVideos.length;
    
    return {
      visited: {
        count: visitedCount,
        total: totalLocations,
        percentage: Math.round((visitedCount / totalLocations) * 100)
      },
      photos: {
        count: photoCount,
        total: totalLocations,
        percentage: Math.round((photoCount / totalLocations) * 100)
      },
      videos: {
        count: videoCount,
        total: 3, // AI 영상이 있는 장소 수
        percentage: Math.round((videoCount / 3) * 100)
      }
    };
  };

  const resetProgress = () => {
    setVisitedLocations([]);
    setPhotosTaken({});
    setCompletedVideos([]);
    localStorage.removeItem('visitedLocations');
    localStorage.removeItem('photosTaken');
    localStorage.removeItem('completedVideos');
  };

  const value = {
    visitedLocations,
    photosTaken,
    completedVideos,
    markLocationVisited,
    markPhotoTaken,
    markVideoCompleted,
    isLocationVisited,
    isPhotoTaken,
    isVideoCompleted,
    getProgress,
    resetProgress
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
}; 