import './videocard.css'
import { useState, useEffect } from 'react'
import moment from 'moment/moment';
moment().format();

const VideoCard = (props) => {

  const apiKey = process.env.REACT_APP_YOUTUBE_API;

  const fullSidebar = true;

  const [channelIconURl, setChannelIconURl] = useState('');

  const [duration, setDuration] = useState('');
  const [views, setViews] = useState(0);

  useEffect(()=>{
    const getChannelDetails = async () =>{
      try{
      const res = await fetch(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${props.channelId}&key=${apiKey}`)
      const data = await res.json();
      // console.log(data.items[0].snippet.thumbnails.high.url);
      setChannelIconURl(data.items[0].snippet.thumbnails.high.url);
    }catch(err){
      console.log(err);
    }
    }
    getChannelDetails();
    handleDuration();
    handleViews();
  },[]);
  
  const handleDuration = () =>{
    let string = props.duration;
    string = string.replace("PT", "");
    if(string.includes("M")){
      string = string.replace("M", ":");
      if(string.includes("S")){
        string = string.replace("S", "");
      } else{
        string = string + '00';
      }
    } else{
      string = '0:' + string
      if(string.includes("S")){
        string = string.replace("S", "");
      } else{
        string = string + '00';
      }
    }
    setDuration(string);
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
          <img className='channel-icon' src={channelIconURl} alt="" />
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
            <span>{moment(`${props.publishedAt.replace("T", " ").replace("Z", "")}`).fromNow()}</span>
          </div>
        </div>
      
      </div>
    </div>
  )
}

export default VideoCard