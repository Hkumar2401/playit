import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import VideoSection from '../VideoSection/VideoSection'
import { BrowserRouter, Routes, Route } from 'react-router-dom'


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
          </Routes>
    </div>
    </BrowserRouter>
  )
}

export default Feed