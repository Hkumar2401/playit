import React, {useState, useEffect} from 'react'
import './searchvideocard.css'
import { Link } from 'react-router-dom';

const SearchVideoCard = (props) => {

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
    <div className='search-video-card flex mt-5 cursor-pointer'>

        <div className="thumbnail-section">
            <img className='search-video-card-thumbnail rounded-xl' src={props.thumbnail} alt="" />
        </div>

        <div className='search-video-card-content ml-4 p-1'>

            <p className='text-lg'>{props.title}</p>

            <div className='flex'>
                <p className='text-sm'>{views}</p>
                <p className='ml-1 mr-1'>•</p>
                <p className='text-sm'>{props.publishedAt}</p>
            </div>

            <div className='flex items-center my-2'>
              <img className='w-7 rounded-3xl' src={props.channelIcon} alt="" />
              <p className='text-sm ml-3'>{props.channelTitle}</p>
            </div>

            <p className='mt-3 w-10/12'>{props.description}</p>



            
        </div>

    </div>
    </Link>
  )
}

export default SearchVideoCard