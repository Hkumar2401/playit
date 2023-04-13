import React, { useEffect, useState } from 'react'
import './videodetails.css'
import { useParams } from 'react-router-dom'
import Youtube from 'react-youtube'
import RelatedVideosCard from '../RelatedVideosCard/RelatedVideosCard'

import VideoAbout from '../VideoAbout/VideoAbout'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Oval } from 'react-loader-spinner'

const VideoDetails = ({fullSidebar, collapseSidebar}) => {

  const { id } = useParams();

  const [relatedVideoData, setRelatedVideoData] = useState([]);

  const [commentData, setCommentData] = useState([]);

  const [commentCursorNext, setCommentCursorNext] = useState();

  const [commentSpinnerLoading, setCommentSpinnerLoading] = useState(false);

  const [relatedSpinnerLoading, setRelatedSpinnerLoading] = useState(false);

  const [relatedCursorNext, setrelatedCursonNext] = useState();

  const [videoData, setVideoData] = useState({
    title: '',
    author: {
      avatar: [
        {
          url: ''
        }
      ],
      title: '',
      stats: {
        subscribersText: '',
      }
    },
    stats: {
      likes: ''
    },
    publishedDate: '',
    description: '',
    superTitle: {
      items: [
        ''
      ]
    }

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

    // to fetch related videos data
    const fetchRelatedVideos = async () => {

      try {
        const response = await fetch(`${BASE_URL}/video/related-contents/?id=${id}&hl=en&gl=US`, options);
        const data = await response.json();
        // console.log(data.contents);
        setRelatedVideoData(data.contents);
        setrelatedCursonNext(data.cursorNext);
      } catch (error) {
        console.log(error);
      }

    }

    // to fetch video details
    const fetchVideoDetails = async () => {

      try {
        const response = await fetch(`${BASE_URL}/video/details/?id=${id}&hl=en&gl=US`, options);
        const data = await response.json();
        // console.log(data);
        setVideoData(data);
      } catch (error) {
        console.log(error);
      }

    }

    // to fetch video comments
    const fetchVideoComments = async () => {

      try {
        const response = await fetch(`${BASE_URL}/video/comments/?id=${id}&hl=en&gl=US`, options);
        const data = await response.json();
        // console.log(data);
        setCommentData(data.comments);
        setCommentCursorNext(data.cursorNext);
      } catch (error) {
        console.log(error);
      }
    }


    fetchVideoComments();
    fetchVideoDetails();
    fetchRelatedVideos();
  }, [id])

  const opts = {
    height: '750',
    width: '1250',
  };

  const fetchMoreComments = async () => {
    try {
      setCommentSpinnerLoading(true);
      const response = await fetch(`${BASE_URL}/video/comments/?id=${id}&cursor=${commentCursorNext}&hl=en&gl=US`, options);
      const data = await response.json();
      // console.log(data.comments);
      setCommentData([...commentData, ...data.comments]);
      setCommentCursorNext(data.cursorNext);
      setCommentSpinnerLoading(false);
    } catch (error) {
      console.log(error);
    }
  }


  const fetchMoreRelatedVideos = async () =>{
    try {
      setRelatedSpinnerLoading(true);
      const response = await fetch(`${BASE_URL}/video/related-contents/?id=${id}&cursor=${relatedCursorNext}&hl=en&gl=US`, options);
      const data = await response.json();
      setRelatedVideoData([...relatedVideoData, ...data.contents]);
      setrelatedCursonNext(data.cursorNext);
      setRelatedSpinnerLoading(false);
    } catch (error) {
      console.log(error);
    }
  }




  return (


    <div className={`video-details flex mt-10 mx-auto ml-20 ${fullSidebar && 'blur-shade'}`}>

      <div className='video-player-section mr-8'>
        <div className='video-player'>
          <Youtube
            videoId={id}
            opts={opts}
          />
        </div>

        <InfiniteScroll
          dataLength={commentData.length}
          next={fetchMoreComments}
          hasMore={true}
          loader={
            commentSpinnerLoading &&
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
            <p style={{ textAlign: 'center' }}>
              <b>No more videos to show</b>
            </p>
          }
        >
          <div>
            <VideoAbout
              videoData={videoData}
              commentData={commentData}
              setCommentData={setCommentData}
            />
          </div>
        </InfiniteScroll>


      </div>

      <InfiniteScroll
          dataLength={relatedVideoData.length}
          next={fetchMoreRelatedVideos}
          hasMore={true}
          loader={
            relatedSpinnerLoading &&
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
            <p style={{ textAlign: 'center' }}>
              <b>No more videos to show</b>
            </p>
          }
        >
      <div className='related-videos mr-10'>
        {
          relatedVideoData.map((item, i) => {
            return (
              item.type === 'video' &&
              <RelatedVideosCard
                key={i}
                videoId={item.video.videoId}
                thumbnail={item.video.thumbnails[item.video.thumbnails.length - 1].url}
                duration={item.video.lengthSeconds}
                title={item.video.title}
                channelName={item.video.author.title}
                viewCount={item.video.stats.views}
                publishedAt={item.video.publishedTimeText}
              />
            );
          })
        }
      </div>
    </InfiniteScroll>

    </div>
  )
}

export default VideoDetails