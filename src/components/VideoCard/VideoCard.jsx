import './videocard.css'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

const VideoCard = (props) => {

  const fullSidebar = props.fullSidebar;

  const [duration, setDuration] = useState('');
  const [views, setViews] = useState(0);

  useEffect(()=>{
    handleDuration();
    handleViews();
  },[]);
  
  const handleDuration = () =>{
    let duration = props.duration;
    let date = new Date(null);
    date.setSeconds(duration);
    duration = date.toISOString().substring(11, 19);
    console.log(duration);
    if(duration.startsWith("00:")){
      duration = duration.replace("00:", " ");
    }

    setDuration(duration);
  }

  const handleViews = () =>{
    let views = props.viewCount;
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


  

  return (
    <Link to={`/video/${props.videoId}`}>
    <div className={`flex flex-col mt-5 ml-2 mr-2  ${fullSidebar ? 'video-card-full-sidebar' : 'video-card-not-full-sidebar'}`}
    >
      <div className="top relative">
        <img className='thumbnail' src={props.thumbnail} alt="" />
        <p className="duration text-sm pl-1 pr-1">
        {
          duration
        }
        </p>
      </div>

      <div className="bottom flex">
        <div className='pt-4'>
          <img className='channel-icon' src={props.channelIcon} alt="" />
        </div>

        <div className="details ml-3 pt-3 flex-col">
          <div>
            <p className='font-bold'>{props.videoTitle}</p>
          </div>
          <div>
            <p>{props.channelTitle}</p>
          </div>
          <div>
            <span>{views}</span>
            <span className='ml-2 mr-2'>•</span>
            <span>{props.publishedAt}</span>
          </div>
        </div>
      
      </div>
    </div>
    </Link>
  )
}

export default VideoCard