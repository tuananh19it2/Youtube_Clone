import React, { useEffect, useState } from 'react';
import './Comments.scss';
import Comment from '../Comment/Comment';
import { useDispatch, useSelector } from 'react-redux';
import { addComment, getCommentsOfVideoById } from '../../redux/actions/comments.action';

const Comments = ({videoId, totalComments}) => {
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCommentsOfVideoById(videoId))
    
  }, [dispatch, videoId])

  const comments = useSelector(state => state.commentList.comments);
  const _comments = comments?.map(comment => comment.snippet.topLevelComment.snippet);
  const [text, setText]= useState('');

  const handleComments = (e) => {
    e.preventDefault();
    if(text.length === 0) return
    dispatch(addComment(videoId, text))
    setText('')
  }
  return (
    <div className='Comments'>
      <p>{totalComments} Comments</p>
      <div className='Comments_form d-flex w-100 my-2'>
        <img 
            src='https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png'
            alt=''
            className='rounded-circle mr-3'
        />
        <form  className='d-flex flex-grow-1' onSubmit={handleComments}>
          <input
          type='text'
          className='flex-grow-1'
          placeholder='Write a Comments...'
          value={text}
          onChange={e => setText(e.target.value)}
          />
          <button className='border-0 p-2'>Comments</button>
        </form>
      </div>

      <div className='Comments_list'>
        {
          _comments?.map((comment, i) => {
            <Comment comment={comment} key={i}/>    
          })
        }
      </div>

    </div>
  )
}

export default Comments