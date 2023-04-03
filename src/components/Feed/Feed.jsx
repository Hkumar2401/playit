import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import VideoSection from '../VideoSection/VideoSection'

const Feed = ({fullSidebar, setFullSidebar}) => {
  return (
    <div className="body flex">
          <Sidebar 
            fullSidebar={fullSidebar}
          />
          <VideoSection 
            fullSidebar={fullSidebar}
          />
    </div>
  )
}

export default Feed