import React from 'react'
import { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar/Sidebar'
import VideoDetails from './components/VideoDetails/VideoDetails'
import VideoSection from './components/VideoSection/VideoSection'
import SearchSection from './components/SearchSection/SearchSection'
import ChannelSectionCard from './components/ChannelSection/ChannelSectionCard'
import PlaylistSection from './components/PlaylistSection/PlaylistSection'

const App = () => {

  const [fullSidebar, setFullSidebar] = useState(true);

  const [search, setSearch] = useState('');

  
  return (
    <BrowserRouter>

      <div className='App relative'>
        <Navbar 
          fullSidebar={fullSidebar}
          setFullSidebar={setFullSidebar}
          search={search}
          setSearch={setSearch}
        />

        <Routes>

          <Route path='/' element={
              <div className='flex'>
                <Sidebar 
                  fullSidebar={fullSidebar}
                />
                <VideoSection 
                  fullSidebar={fullSidebar}
                />
            </div>
          } 
          />

          <Route path='/video/:id' element={
            <div className='flex transition-sidebar'>
              <Sidebar 
                fullSidebar={fullSidebar}
                collapseSidebar={true}
              />
              <VideoDetails 
                fullSidebar={fullSidebar}
                collapseSidebar={true}
                setFullSidebar={setFullSidebar}
              />
            </div>
          } />

          <Route path='/search/:query' element={
            <div className='flex'>
              <Sidebar 
                  fullSidebar={fullSidebar}
                />
                <SearchSection 
                  search={search}
                  fullSidebar={fullSidebar}
                />
            </div>
          } />

          <Route path='/category/:sidebarQuery' element={
            <div className='flex'>
                <Sidebar 
                  fullSidebar={fullSidebar}
                />
                <VideoSection 
                  fullSidebar={fullSidebar}
                />
            </div>
          }/>

          <Route path='/channel/details/:channelId' element={
            <div className='flex'>
                <Sidebar 
                  fullSidebar={fullSidebar}
                />
                <ChannelSectionCard
                  fullSidebar={fullSidebar}
                />
            </div>
          } />


          <Route path='/playlist/:playlistId' element={
            <div className='flex'>
                <Sidebar 
                  fullSidebar={fullSidebar}
                  collapseSidebar={true}
                />
                <PlaylistSection
                  fullSidebar={fullSidebar}
                  setFullSidebar={setFullSidebar}
                />
            </div>
          } />


        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App