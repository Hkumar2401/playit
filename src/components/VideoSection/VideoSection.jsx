import './videosection.css'
import VideoCard from '../VideoCard/VideoCard';
import { useState, useEffect } from 'react';

const Videosection = ({fullSidebar}) => {

  const [popularVideosData, setPopularVideosData] = useState([]);

  const [channelData, setChannelData] = useState({});

  const apiKey = process.env.REACT_APP_YOUTUBE_API;



  

  

  useEffect(()=>{
    async function getData(){

      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '81d0a0f8d4mshf9fd9ba2956eeabp1820a4jsnfc7929700ec8',
          'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
        }
      };
      
      fetch('https://youtube138.p.rapidapi.com/channel/videos/?id=UCqrILQNl5Ed9Dz6CGMyvMTQ&hl=en&gl=US', options)
      .then(response => response.json())
      .then(response => {
        console.log(response);
        setPopularVideosData(response.contents);
      })
      .catch(err => console.error(err));
    }

    async function getChannelDetails(){
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '81d0a0f8d4mshf9fd9ba2956eeabp1820a4jsnfc7929700ec8',
          'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
        }
      };
      
      fetch('https://youtube138.p.rapidapi.com/channel/details/?id=UCqrILQNl5Ed9Dz6CGMyvMTQ&hl=en&gl=US', options)
        .then(response => response.json())
        .then(response => {
          console.log(response);
          setChannelData(response);
        })
        .catch(err => console.error(err));
    }

    getChannelDetails();
    getData();
  }, []);

  
  return (
    <div className={`video-section p-4 flex flex-wrap items-center ${fullSidebar ? 'pl-24' : 'pl-5'}`}>
    {
      popularVideosData.map((item, i)=>{
        return (
          <VideoCard
          key={i} 
          channelId={channelData.channelId}
          channelIcon={channelData.avatar[2].url}
          videoId={item.video.videoId}
          channelTitle={channelData.title}
          videoTitle={item.video.title}
          viewCount={item.video.stats.views}
          thumbnail={item.video.thumbnails[3].url} 
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