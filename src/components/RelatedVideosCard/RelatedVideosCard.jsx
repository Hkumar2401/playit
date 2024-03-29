import React, {useState, useEffect} from 'react'
import './relatedvideoscard.css'
import { Link } from 'react-router-dom';

const RelatedVideosCard = (props) => {

  const {videoId, thumbnail, duration, title, channelName, publishedAt, viewCount} = props;
  
    const [views, setViews] = useState();

    const [durationEdit, setDurationEdit] = useState();
    
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

    useEffect(()=>{
        handleViews();
        handleDuration();
    },[])
    
  return (
    <Link to={`/video/${videoId}`}>
    <div className='related-videos-card flex mt-1'>
        <div className='related-video-thumbnail-section relative'>
            <img className='related-video-thumbnail' src={thumbnail} alt="" />
            <p className='absolute text-sm pl-1 pr-1 right-2 bottom-1 bg-black text-white'>{durationEdit}</p>
        </div>

        <div className="related-video-detail-section ml-2">
            <p className='line-clamp-2'>{title}</p>
            <p className='text-sm'>{channelName}</p>
            <div className='flex'>
                <p className='text-sm'>{views}</p>
                <p className='mx-1'>•</p>
                <p className='text-sm'>{publishedAt}</p>
            </div>
        </div>
    </div>
    </Link>
  )
}

export default RelatedVideosCard