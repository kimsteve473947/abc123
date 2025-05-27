import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProgressProvider } from './context/ProgressContext';
import HomePage from './components/HomePage';
import MapPage from './components/MapPage';
import MissionPage from './components/MissionPage';
import VideoPage from './components/VideoPage';
import ProgressPage from './components/ProgressPage';
import LocationDetailPage from './components/LocationDetailPage';
import InfoPage from './components/InfoPage';
import ARViewPage from './components/ARViewPage';
import AudioGuidePage from './components/AudioGuidePage';
import SocialPage from './components/SocialPage';

function App() {
  return (
    <ProgressProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/mission/:locationId" element={<MissionPage />} />
            <Route path="/video/:locationId" element={<VideoPage />} />
            <Route path="/location/:locationId" element={<LocationDetailPage />} />
            <Route path="/ar/:locationId" element={<ARViewPage />} />
            <Route path="/audio/:locationId" element={<AudioGuidePage />} />
            <Route path="/social" element={<SocialPage />} />
            <Route path="/progress" element={<ProgressPage />} />
            <Route path="/info" element={<InfoPage />} />
          </Routes>
        </div>
      </Router>
    </ProgressProvider>
  );
}

export default App; 