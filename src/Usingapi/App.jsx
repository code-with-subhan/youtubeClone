import React from 'react'
import Header from './components/header';
import Sidebar from './components/sidebar';
import MainContent from './components/mainContent';
import { Route, Routes } from 'react-router-dom';
import Video from './components/video';
import TrendingPage from './components/trendingPage';
function App() {
  return (
    <>
      <Header />
      <Sidebar />
      {/* Routes */}
      <Routes>
        <Route path='/' element={<MainContent />} />
        <Route path='/:id' element={<Video />} />
        <Route path='/trending' element={<MainContent />} />
        <Route path='/searchContainer' element={<MainContent />} />
        <Route path='/history' element={<TrendingPage />} />
        <Route path='/history/:iid' element={<Video />} />
      </Routes>
    </>
  )
}

export default App
