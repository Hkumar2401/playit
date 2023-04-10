import React, {useState, useEffect} from 'react'
import './playlistdetails.css'
import Youtube from 'react-youtube'
import { useParams } from 'react-router-dom'

const PlaylistDetails = () => {

    const {playlistId} = useParams();

    const BASE_URL = 'https://youtube138.p.rapidapi.com';

    const [playlistData, setPlaylistData] = useState({});
    
    
    const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
          'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
        }
      };
    
    
    useEffect(()=>{
        const fetchPlaylistDetails = async ()=>{
            try {
                const response = await fetch(`${BASE_URL}/playlist/videos/?id=${playlistId}&hl=en&gl=US`, options);
                const data = await response.json();
                console.log(data.contents);
                setPlaylistData(data.contents);
              } catch (error) {
                console.log(error);
              }
        }
        

        fetchPlaylistDetails();
    },[])
    
  return (
    <div className='video-details flex mt-10 mx-auto ml-20'>

      {/* <div className='video-player-section mr-8'>
        <div className='video-player'>
          <Youtube
            videoId={id}
            opts={opts}
          />
        </div>

        <div>
          <VideoAbout 
            videoData={videoData}
            commentData={commentData}
          />
        </div>


      </div>

      <div className='related-videos mr-10'>
        {
          relatedVideoData.map((item, i) => {
            return (
              item.type === 'video' &&
              <RelatedVideosCard
                key={i}
                videoId={item.video.videoId}
                thumbnail={item.video.thumbnails.reverse()[0].url}
                title={item.video.title}
                channelName={item.video.author.title}
                viewCount={item.video.stats.views}
                publishedAt={item.video.publishedTimeText}
              />
            );
          })
        }
      </div> */}

    </div>
  )
}

export default PlaylistDetails