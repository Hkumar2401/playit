import React from 'react'
import './videodetails.css'
import { Link, useParams } from 'react-router-dom'
import Youtube from 'react-youtube'
import { useContext } from 'react'
import { HideSidebarContext } from '../../App'

const VideoDetails = () => {

    const hideSidebar = useContext(HideSidebarContext);
    console.log(hideSidebar);
    
    const id = useParams();

    const opts = {
      height: '650',
      width: '1150',
    };


    
  return (
    <div className='video-details'>

    <Youtube 
        videoId={id.id}
        opts={opts}
    />

    </div>
  )
}

export default VideoDetails