import './videosection.css'
import VideoCard from '../VideoCard/VideoCard';
import { useState, useEffect } from 'react';

const Videosection = () => {

  const [popularVideosData, setPopularVideosData] = useState([]);

  const fullSidebar = true;

  const apiKey = process.env.REACT_APP_YOUTUBE_API;

  useEffect(()=>{
    async function getData(){
      const res = await fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=IN&key=${apiKey}&maxResults=50`);
      const data = await res.json();
      console.log(data);
      setPopularVideosData(data.items);
    }
    getData();
  }, []);

  
  return (
    <div className={`video-section p-4 flex flex-wrap items-center ${fullSidebar ? 'pl-24' : 'pl-5'}`}>
    {
      popularVideosData.map((item, i)=>{
        return (
          <VideoCard
          key={i} 
          channelId={item.snippet.channelId}
          videoId={item.id}
          channelTitle={item.snippet.channelTitle}
          videoTitle={item.snippet.title}
          viewCount={item.statistics.viewCount}
          thumbnail={item.snippet.thumbnails.high.url}
          duration={item.contentDetails.duration}
          publishedAt={item.snippet.publishedAt}

          />
        );
      })
    }
    </div>
  )
}

export default Videosection