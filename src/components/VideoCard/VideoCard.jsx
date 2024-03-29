import './videocard.css'
import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom';

const VideoCard = (props) => {

  const {fullSidebar, videoId, changeOnSidebarToggle,thumbnail, movingThumbnail,  channelIcon, videoTitle, channelTitle, publishedAt, duration, viewCount} = props;
  
  const thumbnailRef = useRef();
  
  const videoCardRef = useRef();
  
  const [durationEdit, setDurationEdit] = useState('');
  const [views, setViews] = useState(0);

  useEffect(()=>{
    handleDuration();
    handleViews();
  },[]);
  
  const handleDuration = () =>{
    let durationTemp = duration;
    let date = new Date(null);
    date.setSeconds(durationTemp);
    durationTemp = date.toISOString().substring(11, 19);
    if(durationTemp.startsWith("00:")){
      durationTemp = durationTemp.replace("00:", " ");
    }

    setDurationEdit(durationTemp);
  }

  const handleViews = () =>{
    let views = viewCount;
    if(views<1000){

    } else if(views>=1000 && views<100000){
      views = `${Math.floor((views*10)/1000)/10}k`;
    } else if(views>=100000 && views<1000000){
      views = `${Math.floor((views*10)/1000)/10}k`;
    } else if(views>=1000000 && views<1000000000){
      views = `${Math.floor((views*10)/1000000)/10}M`;
    } else if(views>=1000000000 && views<1000000000000){
      views = `${Math.floor((views*10)/1000000000)/10}B`;
    }
    setViews(views);
  }

  const mouseOver = () =>{
    thumbnailRef.current.src = movingThumbnail;
    videoCardRef.current.style.position = 'relative';
    videoCardRef.current.style.transform = 'scale(1.1,1.1)';
    videoCardRef.current.style.zIndex = '10';
  }
  
  const mouseOut = () =>{
    thumbnailRef.current.src = thumbnail;
    videoCardRef.current.style.position = 'relative';
    videoCardRef.current.style.transform = 'scale(1,1)';
    videoCardRef.current.style.zIndex = '0';
  }

  const handleCardStyle = () =>{
    if(changeOnSidebarToggle){
      if(fullSidebar === true){
        videoCardRef.current.style.width = '360px';
        videoCardRef.current.style.height = '350px';
        thumbnailRef.current.style.width = '100%';
      }
      else{
        videoCardRef.current.style.width = '340px'
        thumbnailRef.current.style.width = '100%';
      }
    }
    
    else{
      videoCardRef.current.style.width = '300px';
      videoCardRef.current.style.height = '320px';
      thumbnailRef.current.style.width = '300px';
      thumbnailRef.current.style.height = '170px';

    }
  }

  useEffect(()=>{
    handleCardStyle();
  },[fullSidebar])
  

  return (
    <Link to={`/video/${videoId}`}>
    <div ref={videoCardRef} className={`flex flex-col transition-all ease-linear rounded-lg bg-white mt-5 ml-2 mr-2`} onMouseOver={mouseOver} onMouseOut={mouseOut}
    >
      <div className="top relative">
        <img className='thumbnail rounded-lg' ref={thumbnailRef} src={thumbnail} alt="" />
        <p className={`absolute text-sm pl-1 pr-1 right-4 bottom-4 bg-black text-white`}>
        {
          durationEdit
        }
        </p>
      </div>

      <div className="bottom flex">
        <div className={`pt-4 mr-3 ${channelIcon === undefined && 'hidden'}`}>
          <img className='channel-icon' src={channelIcon} alt="" />
        </div>

        <div className={`details  pt-3 flex-col`}>
          <div>
            <p className='font-bold'>{videoTitle}</p>
          </div>
          <div>
            <p>{channelTitle}</p>
          </div>
          <div>
            <span>{views}</span>
            <span className='ml-2 mr-2'>•</span>
            <span>{publishedAt}</span>
          </div>
        </div>
      
      </div>
    </div>
    </Link>
  )
}

export default VideoCard