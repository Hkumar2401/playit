import React, { useState, useEffect } from 'react'
import './channelsectioncard.css'
import { useParams } from 'react-router-dom'
import VideoCard from '../VideoCard/VideoCard'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Oval } from 'react-loader-spinner'

const ChannelSectionCard = ({ fullSidebar }) => {

    const { channelId } = useParams();
    const BASE_URL = `https://youtube138.p.rapidapi.com`;

    const [channelData, setChannelData] = useState([]);

    const [channelVideos, setChannelVideos] = useState([]);

    const [cursorNext, setCursorNext] = useState();

    const [spinnerLoading, setSpinnerLoading] = useState(false);

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
            'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
        }
    };

    useEffect(() => {
        const fetchChannelData = async () => {
            const res = await fetch(`${BASE_URL}/channel/details/?id=${channelId}&hl=en&gl=US`, options);
            const data = await res.json();
            setChannelData(data);
            console.log(data);
        }

        const fetchChannelVideos = async () => {
            const res = await fetch(`${BASE_URL}/channel/videos/?id=${channelId}&hl=en&gl=US`, options);
            const data = await res.json();
            // console.log(data.contents);
            setChannelVideos(data.contents);
            setCursorNext(data.cursorNext);
            

        }

        fetchChannelVideos();
        fetchChannelData();
    }, [channelId])


    const fetchNext = async ()=>{
        setSpinnerLoading(true);
        const response = await fetch(`${BASE_URL}/channel/videos/?q=${channelId}&cursor=${cursorNext}&hl=en&gl=US`, options);
        const data = await response.json();
        setChannelVideos([...channelVideos, ...data.contents]);
        // console.log(videosData);
        setSpinnerLoading(false);
      }
    

    return (
        <InfiniteScroll 
            dataLength={channelVideos.length}
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

            <div className={`${fullSidebar ? 'channel-section-full-sidebar' : 'channel-section-not-full-sidebar'} ml-5 flex flex-col items-center`}>
                {
                    channelData.banner !== undefined &&
                    <>

                        <div className='banner-section'>
                            <img className='w-full h-full' src={channelData.banner.desktop[channelData.banner.desktop.length-1].url} alt="" />
                        </div>

                        <div className='channel-details flex items-center justify-center mt-10 border-b-2 border-gray-200 pb-10'>
                            <div className='flex items-center w-8/12'>
                                <img className='rounded-full channel-section-channel-icon' src={channelData.avatar[channelData.avatar.length-1].url} alt="" />

                                <div className="channel-details-content ml-6 flex flex-col">
                                    <p className='text-2xl'>{channelData.title}</p>
                                    <div className='flex mt-1 mb-2'>
                                        <p className='text-sm font-semibold'>{channelData.username}</p>
                                        <p className='text-sm ml-3'>{channelData.stats.subscribersText}</p>
                                        <p className='text-sm ml-3'>{channelData.stats.videosText}</p>
                                    </div>
                                    <p className='line-clamp-2 w-8/12'>{channelData.description}</p>
                                </div>
                            </div>
                            <div className='bg-black text-white px-4 py-2 rounded-3xl ml-5 hover:bg-zinc-800'>
                                <button>Subscribe</button>
                            </div>
                        </div>
                    </>
                }

                <div className={`channel-videos-section flex flex-wrap ${fullSidebar ? 'pl-16' : 'pl-32' } mt-10 w-10/12`}>

                    {
                        channelVideos.map((item, i) => {
                            return (
                                <VideoCard
                                    key={i}
                                    videoId={item.video.videoId}
                                    videoTitle={item.video.title}
                                    viewCount={item.video.stats.views}
                                    thumbnail={item.video.thumbnails[item.video.thumbnails.length-1].url}
                                    movingThumbnail={item.video.movingThumbnails === null ? null : item.video.movingThumbnails[item.video.movingThumbnails.length-1].url}
                                    duration={item.video.lengthSeconds}
                                    publishedAt={item.video.publishedTimeText}
                                    fullSidebar={fullSidebar}
                                    changeOnSidebarToggle={false}
                                />
                            );
                        })
                    }


                </div>

            </div>
        </InfiniteScroll>
    )
}

export default ChannelSectionCard
