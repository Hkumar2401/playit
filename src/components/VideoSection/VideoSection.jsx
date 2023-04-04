import './videosection.css'
import VideoCard from '../VideoCard/VideoCard';
import { useState, useEffect } from 'react';
import ChannelCard from '../ChannelCard/ChannelCard';
import PlaylistCard from '../PlaylistCard/PlaylistCard';


const Videosection = ({fullSidebar}) => {

  const [popularVideosData, setPopularVideosData] = useState([]);

  const [url, setUrl] = useState('search/?q=cleverprogrammer');

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


      await fetch(`${BASE_URL}/${url}`, options)
          .then(async(response) =>  {
            return await response.json();
          })
          .then(response => {
            console.log(response.contents);
            setPopularVideosData(response.contents);
          })
          .catch(err => console.error(err));
  
          
    }

    fetchFromApi();
    
  }, []);

  
  return (
    <div className={`video-section p-4 flex flex-wrap items-center ${fullSidebar ? 'pl-24' : 'pl-5'}`}>
    {
      popularVideosData.map((item, i)=>{
        return (
          item.type==="video" &&
          <VideoCard
          key={i} 
          channelId={item.video.author.channelId}
          channelIcon={item.video.author.avatar[0].url}
          videoId={item.video.videoId}
          channelTitle={item.video.author.title}
          videoTitle={item.video.title}
          viewCount={item.video.stats.views}
          thumbnail={item.video.thumbnails[1].url} 
          duration={item.video.lengthSeconds}
          publishedAt={item.video.publishedTimeText}
          fullSidebar={fullSidebar}

          />
        );
      })
    }
    </div>
  )
}

export default Videosection