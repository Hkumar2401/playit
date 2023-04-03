import './videocard.css'
import { useState, useEffect } from 'react'
import moment from 'moment/moment';
moment().format();

const VideoCard = (props) => {

  const fullSidebar = props.fullSidebar;

  const [duration, setDuration] = useState('');
  const [views, setViews] = useState(0);

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '81d0a0f8d4mshf9fd9ba2956eeabp1820a4jsnfc7929700ec8',
      'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
    }
  };
  

  useEffect(()=>{
    handleDuration();
    handleViews();
  },[]);
  
  const handleDuration = () =>{
    let duration = props.duration;

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
    <div className={`flex flex-col mt-5 ml-2 mr-2  ${fullSidebar ? 'video-card-full-sidebar' : 'video-card-not-full-sidebar'}`}>
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
  )
}

export default VideoCard