import React from 'react'
import Header from './components/header';
import Sidebar from './components/sidebar';
import MainContent from './components/mainContent';
import { Route, Routes } from 'react-router-dom';
import Video from './components/video';
import TrendingPage from './components/trendingPage';
import Subscriber from './components/Subscriber';
import Playlist from './components/playlistItems';
import Likewatch from './components/Like&watch';
import Watch from './components/watch';
import { useContext } from 'react';
import { Theme } from './components/ThemeContext';
import Channels from './components/Channel';
import YouTubeShorts from './components/shorts';

function App() {
  const { likesitem, watchitem } = useContext(Theme)
  return (
    <>
      <Header />
      <Sidebar />
      <Routes>
        <Route path='/' element={<MainContent />} />
        <Route path='/:id' element={<Video />} />
        <Route path='/trending' element={<MainContent />} />
        <Route path='/searchContainer' element={<MainContent />} />
        <Route path='/history' element={<TrendingPage />} />
        <Route path='/history/:iid' element={<Video />} />
        <Route path='/subscriber' element={<Subscriber />} />
        <Route path='/playlist' element={<Playlist like={likesitem} watchitem={watchitem} />} />
        <Route path='/likes' element={<Likewatch />} />
        <Route path='/watch' element={<Watch />} />
        <Route path='/Channel/:channelid' element={<Channels />} />
        <Route exact path='/Channel/:channelid/videos' element={<Channels />} />
        <Route path='/Shorts' element={<YouTubeShorts />} />
      </Routes>
    </>
  )
}

export default App
