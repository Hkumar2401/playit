import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import './playlistsection.css'
import Youtube from 'react-youtube'
import PlaylistVideoCard from '../PlaylistVideoCard/PlaylistVideoCard';


const PlaylistSection = ({ fullSidebar, setFullSidebar }) => {

    const { playlistId } = useParams();

    const [playlistVideos, setPlaylistVideos] = useState([]);

    const [currentVideo, setCurrentVideo] = useState();

    const [viewsCompute, setViewsCompute] = useState(0);

    const [playlistDetails, setPlaylistDetails] = useState({
        title: '',
        author: {
            avatar: [
                {
                    url: ''
                }
            ],
            title: '',
        },
        stats: {
            views: ''
        },
        description: '',
    });

    const BASE_URL = 'https://youtube138.p.rapidapi.com';

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
            'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
        }
    };

    useEffect(() => {
        const fetchPlaylistVideos = async () => {
            try {
                const res = await fetch(`${BASE_URL}/playlist/videos/?id=${playlistId}&hl=en&gl=US`, options);
                const data = await res.json();
                // console.log(data.contents);
                setPlaylistVideos(data.contents);
                setCurrentVideo(data.contents[0].video.videoId);
            } catch (err) {
                console.log(err);
            }
        }

        const fetchPlaylistDetails = async () => {
            try {
                const res = await fetch(`${BASE_URL}/playlist/details/?id=${playlistId}&hl=en&gl=US`, options);
                const data = await res.json();
                // console.log(data);
                setPlaylistDetails(data);
            } catch (err) {
                console.log(err);
            }
        }

        fetchPlaylistDetails();
        fetchPlaylistVideos();
        setFullSidebar(false);
    }, [playlistId])

    useEffect(() => {

        const handleViews = () => {
            let views = playlistDetails.stats.views;
            if (views < 1000) {

            } else if (views >= 1000 && views < 100000) {
                views = `${Math.floor((views * 10) / 1000) / 10}k`;
            } else if (views >= 100000 && views < 1000000) {
                views = `${Math.floor((views * 10) / 1000) / 10}k`;
            } else if (views >= 1000000 && views < 1000000000) {
                views = `${Math.floor((views * 10) / 1000000) / 10}M`;
            } else if (views >= 1000000000 && views < 1000000000000) {
                views = `${Math.floor((views * 10) / 1000000000) / 10}B`;
            }
            setViewsCompute(views);
        }

        handleViews();
    }, [playlistDetails]);



    const opts = {
        height: '750',
        width: '1250',
    };


    return (
        <div className={`playlist-section mt-10 ml-20 flex  ${fullSidebar && 'blur-shade'}`}>

            <div className='video-player-section flex flex-col sticky -top-36 h-fit '>

                <div className='video-player mr-8'>
                    <Youtube
                        videoId={currentVideo}
                        opts={opts}
                    />
                </div>

                <div className="video-player-details p-1 flex flex-col">
                    <div>
                        <h1 className='text-xl font-bold my-2'>{playlistDetails.title}</h1>
                    </div>

                    <div className='flex justify-between'>
                        <div className='channel-detail-section flex items-center'>

                            <div>
                                <img className='rounded-full w-32' src={playlistDetails.author.avatar[playlistDetails.author.avatar.length - 1].url} alt="" />
                            </div>

                            <div className='ml-3'>
                                <h1 className='text-2xl font-bold'>{playlistDetails.author.title}</h1>
                            </div>

                        </div>



                    </div>


                    <div className="description bg-gray-200 p-2 rounded-xl mt-5">
                        <div className='flex'>
                            <p className='mr-3 text-sm font-bold'>{viewsCompute} views</p>
                            <p className='mr-3 text-sm font-bold'>{playlistDetails.updatedTimeText}</p>
                        </div>
                        <div className='mt-5'>
                            <pre className='whitespace-pre-wrap'>{playlistDetails.description}</pre>
                        </div>
                    </div>

                    {/* <div className="comment-section mt-5">
                        <p>{`00`} Comments</p>

                        <div className='comments'>

                            {
                                commentData.map((item, i) => {
                                    return (
                                        <CommentCard
                                            key={i}
                                            avatar={item.author.avatar[item.author.avatar.length - 1].url}
                                            title={item.author.title}
                                            publishedAt={item.publishedTimeText}
                                            content={item.content}
                                            votes={item.stats.votes}
                                        />
                                    );
                                })
                            }

                        </div>

                    </div> */}


                </div>



            </div>

            <div className="playlist-all-videos mr-10">
                {
                    playlistVideos.map((item, i) => {
                        return (
                            <PlaylistVideoCard
                                key={i}
                                videoId={item.video.videoId}
                                thumbnail={item.video.thumbnails[item.video.thumbnails.length - 1].url}
                                duration={item.video.lengthSeconds}
                                title={item.video.title}
                                channelName={item.video.author.title}
                                setCurrentVideo={setCurrentVideo}
                                playlistVideos={playlistVideos}
                            />
                        );
                    })
                }
            </div>

        </div>
    )
}

export default PlaylistSection