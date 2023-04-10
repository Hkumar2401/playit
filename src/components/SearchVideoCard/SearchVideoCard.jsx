import React, {useState, useEffect, useRef} from 'react'
import './searchvideocard.css'
import { Link } from 'react-router-dom';

const SearchVideoCard = (props) => {

  const {videoId, thumbnail, movingThumbnail, title, publishedAt, channelIcon, channelTitle, description, viewCount} = props;
  
  const [views, setViews] = useState();

  const thumbnailRef = useRef();
  

  
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

  useEffect(()=>{
    handleViews();
  },[])

  
  const handleMouseOver = () =>{
    if(movingThumbnail !== null){
      thumbnailRef.current.src = movingThumbnail;
    }
  }
  
  const handleMouseOut = () =>{
    thumbnailRef.current.src = thumbnail;
  }
  
  
  return (
    <Link to={`/video/${videoId}`}>
    <div className='search-video-card flex mt-5 cursor-pointer' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>

        <div className="thumbnail-section">
            <img ref={thumbnailRef} className='search-video-card-thumbnail rounded-xl' src={thumbnail} alt="" />
        </div>

        <div className='search-video-card-content ml-4 p-1'>

            <p className='text-lg'>{title}</p>

            <div className='flex'>
                <p className='text-sm'>{views}</p>
                <p className='ml-1 mr-1'>•</p>
                <p className='text-sm'>{publishedAt}</p>
            </div>

            <div className='flex items-center my-2'>
              <img className='w-7 rounded-3xl' src={channelIcon} alt="" />
              <p className='text-sm ml-3'>{channelTitle}</p>
            </div>

            <p className='mt-3 w-10/12'>{description}</p>



            
        </div>

    </div>
    </Link>
  )
}

export default SearchVideoCard