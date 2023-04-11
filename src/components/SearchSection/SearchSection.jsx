import React from 'react'
import './searchsection.css'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import SearchVideoCard from '../SearchVideoCard/SearchVideoCard'
import SearchChannelCard from '../SearchChannelCard/SearchChannelCard'
import SearchPlaylistCard from '../SearchPlaylistCard/SearchPlaylistCard'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Oval } from 'react-loader-spinner'

const SearchSection = ({fullSidebar}) => {



    const { query } = useParams();

    const [searchData, setSearchData] = useState([]);

    const [spinnerLoading, setSpinnerLoading] = useState(false);

    const [cursorNext, setCursorNext] = useState();

    const BASE_URL = 'https://youtube138.p.rapidapi.com';

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
            'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
        }
    };

    useEffect(() => {

        const fetchSearchData = async () => {
            try {

                const res = await fetch(`${BASE_URL}/search/?q=${query}&hl=en&gl=US`, options);
                const data = await res.json();
                setSearchData(data.contents);
                setCursorNext(data.cursorNext);
            } catch (err) {
                console.log(err);
            }


        }

        fetchSearchData();
    }, [query]);


    const fetchNext = async () => {
        setSpinnerLoading(true);
        const response = await fetch(`${BASE_URL}/search/?q=${query}&cursor=${cursorNext}&hl=en&gl=US`, options);
        const data = await response.json();
        setSearchData([...searchData, ...data.contents]);
        setSpinnerLoading(false);
    }


    return (
        <InfiniteScroll 
            dataLength={searchData.length}
            next={fetchNext}
            hasMore={true}
            loader={
                spinnerLoading &&
                <div className='flex justify-center'>
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
                <p style={{ textAlign: 'center' }}>
                    <b>No more videos to show</b>
                </p>
            }
        >

            <div className={`flex flex-col mt-20 ${fullSidebar ? 'ml-40' : 'ml-64'}`}>
                {
                    searchData.map((item, i) => {
                        return (
                            <div key={i}>
                                {
                                    item.type === "video" ?
                                        <SearchVideoCard
                                            key={i}
                                            videoId={item.video.videoId}
                                            thumbnail={item.video.thumbnails[item.video.thumbnails.length - 1].url}
                                            movingThumbnail={item.video.movingThumbnails === null ? null : item.video.movingThumbnails[item.video.movingThumbnails.length - 1].url}
                                            duration={item.video.lengthSeconds}
                                            title={item.video.title}
                                            viewCount={item.video.stats.views}
                                            publishedAt={item.video.publishedTimeText}
                                            channelIcon={item.video.author.avatar[item.video.author.avatar.length - 1].url}
                                            channelTitle={item.video.author.title}
                                            description={item.video.descriptionSnippet}
                                        />
                                        :
                                        item.type === "channel" ?
                                            <SearchChannelCard
                                                key={i}
                                                channelId={item.channel.channelId !== null && item.channel.channelId}
                                                channelIcon={item.channel.avatar[item.channel.avatar.length - 1].url}
                                                channelTitle={item.channel.title}
                                                channelUsername={item.channel.username}
                                                subscribersCount={item.channel.stats.subscribersText}
                                                channelDescription={item.channel.descriptionSnippet}
                                            />
                                            :
                                            <SearchPlaylistCard
                                                key={i}
                                                playlistId={item.playlist.playlistId}
                                                thumbnail={item.playlist.thumbnails[item.playlist.thumbnails.length - 1].url}
                                                playlistTitle={item.playlist.title}
                                                channelTitle={item.playlist.author.title}
                                            />


                                }
                            </div>
                        );
                    })
                }
            </div>
        </InfiniteScroll>
    )
}

export default SearchSection