import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import VideoSection from '../VideoSection/VideoSection'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import VideoDetails from '../VideoDetails/VideoDetails'


const Feed = ({fullSidebar, setFullSidebar}) => {
  return (
    <BrowserRouter>
    <div className="body flex">
          <Sidebar 
            fullSidebar={fullSidebar}
          />
          
          <Routes>
            <Route path='/' element={
            <VideoSection 
            fullSidebar={fullSidebar}
          />
          } />

            <Route path='/video/:id' element={<VideoDetails />} />
          </Routes>
    </div>
    </BrowserRouter>
  )
}

export default Feed