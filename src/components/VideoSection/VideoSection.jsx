import './videosection.css'
import VideoCard from '../VideoCard/VideoCard';
import { useState, useEffect } from 'react';
import SkeletonVideoCard from '../SkeletonVideoCard/SkeletonVideoCard';
import { useParams } from 'react-router-dom';

const Videosection = ({fullSidebar}) => {


  const [popularVideosData, setPopularVideosData] = useState([]);

  let {sidebarQuery} = useParams();
  
  if(sidebarQuery === undefined){
    sidebarQuery = 'ohara';
  }


  const [loading, setLoading] = useState(false);

  const BASE_URL = 'https://youtube138.p.rapidapi.com';

   
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
      'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
    }
  };

  useEffect(()=>{

    const fetchFromApi = async () =>{


      try{
        
        setLoading(true);
        const response = await fetch(`${BASE_URL}/search/?q=${sidebarQuery}&hl=en&gl=US`, options);
        const data = await response.json();
        // console.log(data.contents);
        
        setPopularVideosData(data.contents.filter((item)=> item.type==='video'));
        
      }catch(error){
        console.log(error);
      }
      setLoading(false);
          
    }  

    fetchFromApi();
  }, [sidebarQuery]);

  
  return (
    <div className={`video-section p-4 flex flex-wrap items-center ${fullSidebar ? 'pl-24' : 'pl-5'}`}>
    {
      popularVideosData.map((item, i)=>{
        return (
          loading ? 
            <SkeletonVideoCard 
              fullSidebar={fullSidebar}
            />
            :
          <VideoCard
            key={i} 
            channelId={item.video.author.channelId}
            channelIcon={item.video.author.avatar[item.video.author.avatar.length-1].url}
            videoId={item.video.videoId}
            channelTitle={item.video.author.title}
            videoTitle={item.video.title}
            viewCount={item.video.stats.views}
            thumbnail={item.video.thumbnails[item.video.thumbnails.length-1].url} 
            movingThumbnail={item.video.movingThumbnails === null ? null : item.video.movingThumbnails[item.video.movingThumbnails.length-1].url}
            duration={item.video.lengthSeconds}
            publishedAt={item.video.publishedTimeText}
            fullSidebar={fullSidebar}
            videoCardWidth={'360px'}
            videoCardThumbnailWidth={`360px`}
            videoCardThumbnailHeight={'202px'}
          />

        

        );
      })
    }
    </div>
  )
}

export default Videosection