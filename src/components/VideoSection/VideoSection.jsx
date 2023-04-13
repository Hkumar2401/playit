import './videosection.css'
import VideoCard from '../VideoCard/VideoCard';
import { useState, useEffect } from 'react';
import SkeletonVideoCard from '../SkeletonVideoCard/SkeletonVideoCard';
import { useParams } from 'react-router-dom';
import InfiniteScroll from "react-infinite-scroll-component";
import { Oval } from 'react-loader-spinner';

const Videosection = ({fullSidebar}) => {


  const [videosData, setVideosData] = useState([]);

  const [cursorNext, setCursorNext] = useState();



  let {sidebarQuery} = useParams();
  
  if(sidebarQuery === undefined){
    sidebarQuery = 'ohara';
  }


  const [loading, setLoading] = useState(false);

  const [spinnerLoading, setSpinnerLoading] = useState(false);

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
        // console.log(data);
        
        setVideosData(data.contents.filter((item)=> item.type==='video'));
        setCursorNext(data.cursorNext);
        setLoading(false);
        
      }catch(error){
        console.log(error);
      }
          
    }  

    fetchFromApi();
  }, [sidebarQuery]);

    const fetchNext = async ()=>{
      setSpinnerLoading(true);
      const response = await fetch(`${BASE_URL}/search/?q=${sidebarQuery}&cursor=${cursorNext}&hl=en&gl=US`, options);
      const data = await response.json();
      setVideosData([...videosData, ...data.contents.filter((item)=> item.type === 'video')]);
      // console.log(videosData);
      setCursorNext(data.cursorNext);
      setSpinnerLoading(false);
    }



  
  return (
    <InfiniteScroll 
    dataLength={videosData.length}
    next={fetchNext}
    hasMore={true}
    loader={
      spinnerLoading &&
      <div className='loader'>
        <Oval
          height={50}
          width={50}
          color="gray"
          visible={true}
          ariaLabel='oval-loading'
          secondaryColor="rgb(174, 171, 171)"
          strokeWidth={4}
          strokeWidthSecondary={4}
        />
      </div>
    }
    endMessage={
        <p style={{textAlign: 'center'}}>
          <b>No more videos to show</b>
        </p>
        }
    >

      <div className={`video-section p-4 flex w-full flex-wrap items-center ${fullSidebar ? 'pl-24' : 'pl-5'}`}>
      {
        videosData.map((item, i)=>{
          return (
            loading ? 
              <SkeletonVideoCard 
                key={i}
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
              changeOnSidebarToggle={true}
            />

          

          );
        })
      }
      </div>
    </InfiniteScroll>
  )
}

export default Videosection