import React, {useState, useEffect} from 'react'
import './relatedvideoscard.css'
import { Link } from 'react-router-dom';

const RelatedVideosCard = (props) => {

    const [views, setViews] = useState();
    
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

    useEffect(()=>{
        handleViews();
    },[])
    
  return (
    <Link to={`/video/${props.videoId}`}>
    <div className='related-videos-card flex mt-1'>
        <div className='related-video-thumbnail-section'>
            <img className='related-video-thumbnail' src={props.thumbnail} alt="" />
        </div>

        <div className="related-video-detail-section ml-2">
            <p className='line-clamp-2'>{props.title}</p>
            <p className='text-sm'>{props.channelName}</p>
            <div className='flex'>
                <p className='text-sm'>{views}</p>
                <p className='mx-1'>•</p>
                <p className='text-sm'>{props.publishedAt}</p>
            </div>
        </div>
    </div>
    </Link>
  )
}

export default RelatedVideosCard