import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MapPage from './components/MapPage';
import MissionPage from './components/MissionPage';
import VideoPage from './components/VideoPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<MapPage />} />
          <Route path="/mission/:locationId" element={<MissionPage />} />
          <Route path="/video/:locationId" element={<VideoPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 