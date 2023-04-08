import React, { useState, useEffect } from 'react'
import './channelsectioncard.css'
import { useParams } from 'react-router-dom'
import VideoCard from '../VideoCard/VideoCard'

const ChannelSectionCard = ({ fullSidebar }) => {

    const { channelId } = useParams();
    const BASE_URL = `https://youtube138.p.rapidapi.com`;

    const [channelData, setChannelData] = useState([]);

    const [channelVideos, setChannelVideos] = useState([]);

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
            'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
        }
    };

    useEffect(() => {
        const fetchChannelData = async () => {
            const res = await fetch(`${BASE_URL}/channel/details/?id=${channelId}`, options);
            const data = await res.json();
            // console.log(data);
            setChannelData(data);
        }

        const fetchChannelVideos = async () =>{
            const res = await fetch(`${BASE_URL}/channel/videos/?id=${channelId}`, options);
            const data = await res.json();
            console.log(data.contents);
            setChannelVideos(data.contents);
            
        }

        fetchChannelVideos();
        fetchChannelData();
    }, [channelId])

    return (
        <div className={`${fullSidebar ? 'channel-section-full-sidebar' : 'channel-section-not-full-sidebar'} ml-5 flex flex-col items-center`}>
            <div className='banner-section'>
                <img className='w-full h-full' src="https://yt3.googleusercontent.com/HC-xmAWmFB2FzWMOv9eOhhRRdPMQIq3VciFUtpBxPPMX85YSSpEU4nIhQxnkf6Fl5E6iT2ud_g=w2560-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj" alt="" />
            </div>

            <div className='channel-details flex items-center justify-center mt-10 border-b-2 border-gray-200 pb-10'>
                <div className='flex items-center w-8/12'>
                    <img className='rounded-full w-40' src="https://yt3.googleusercontent.com/kn17KZuOrWwzy4CF-vs5tuSUVhhxvdY6pFw4de9BhZN2J8lgNr15Svc0EA05q4zO3wlHZ-gwd_M=s176-c-k-c0x00ffffff-no-rj" alt="" />
                    <div className="channel-details-content ml-6 flex flex-col">
                        <p className='text-2xl'>Ohara</p>
                        <div className='flex mt-1 mb-2'>
                            <p className='text-sm font-semibold'>@Ohara-the-Fox</p>
                            <p className='text-sm ml-3'>860k subscribers</p>
                            <p className='text-sm ml-3'>240 videos</p>
                        </div>
                        <p className='line-clamp-2 w-8/12'>
                            Hi, I'm Ohara and welcome to my channel. Here we break down your favorite Anime and Manga to find out what makes them tick. If you are into One Piece, Hunter x Hunter, JuJutsu Kaisen or Shounen in general, this is the place for you. If you want to learn more about storytelling, world building, character design or simply want to enjoy your favorite characters a little bit more, you came to the right place. If this sounds like something that you're interested in and you're looking for a wonderful community to share your thoughts and ideas with, make sure to subscribe 🦊
                            And I love coffee, like...a little bit too much ☕
                        </p>
                    </div>
                </div>
                    <div className='bg-black text-white px-4 py-2 rounded-3xl ml-5 hover:bg-zinc-800'>
                        <button>Subscribe</button>
                    </div>
            </div>

            <div className="channel-videos-section flex flex-wrap mt-10">

                {
                    channelVideos.map((item, i)=>{
                        return (
                            <VideoCard
                                key={i} 
                                videoId={item.video.videoId}
                                videoTitle={item.video.title}
                                viewCount={item.video.stats.views}
                                thumbnail={item.video.thumbnails.reverse()[0].url} 
                                movingThumbnail={item.video.movingThumbnails === null ? null : item.video.movingThumbnails.reverse()[0].url}
                                duration={item.video.lengthSeconds}
                                publishedAt={item.video.publishedTimeText}
                                fullSidebar={fullSidebar}
                            />
                        );
                    })
                }


            </div>

        </div>
    )
}

export default ChannelSectionCard