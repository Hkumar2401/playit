import React from 'react'
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOffAltOutlinedIcon from '@mui/icons-material/ThumbDownOffAltOutlined';
import './commentcard.css'

const CommentCard = (props) => {
  return (
    <div className="comment-display flex mt-10">

            <div className='comment-display-avatar'>
              <img className='rounded-3xl avatar' src={props.avatar} alt="" />
            </div>

            <div className="comment-display-contents ml-4 flex flex-col">
              <div className='flex'>
                <p className='text-sm font-bold'>{props.title}</p>
                <p className='text-sm ml-2'>{props.publishedAt}</p>
              </div>

              <p className='mt-1 comment-content'>{props.content}</p>

              <div className='comment-buttons flex'>
                <div className='flex items-center mr-2'>
                  <button className='comment-button rounded-3xl p-1.5'><ThumbUpOutlinedIcon /> </button>
                  <p>{props.votes}</p>
                </div>
                <button className='comment-button rounded-3xl p-1.5'><ThumbDownOffAltOutlinedIcon /> </button>
              </div>

            </div>

          </div>
  )
}

export default CommentCard