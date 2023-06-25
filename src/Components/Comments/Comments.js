import React, { useEffect, useState } from 'react';
import './Comments.scss';
import Comment from '../Comment/Comment';
import { useDispatch, useSelector } from 'react-redux';
import { addComment, getCommentsOfVideoById } from '../../redux/actions/comments.action';

const Comments = ({ videoId, totalComments }) => {
   const dispatch = useDispatch()

   useEffect(() => {
      dispatch(getCommentsOfVideoById(videoId))
   }, [videoId, dispatch])

   const comments = useSelector(state => state.commentList.comments)
   const {photoUrl} = useSelector(state => state.auth?.user)

   const [text, setText] = useState('')

   const _comments = comments?.map(
      comment => comment.snippet.topLevelComment.snippet
   )

   const handleComment = e => {
      e.preventDefault()
      if (text.length === 0) return

      dispatch(addComment(videoId, text))

      setText('')
   }
   return (
      <div className='comments'>
         <p>{totalComments} Comments</p>
         <div className='Comments_form d-flex w-100 my-2'>
            <img src={photoUrl} alt='avatar' className='mr-3 rounded-circle' />
            <form onSubmit={handleComment} className='d-flex flex-grow-1'>
               <input
                  type='text'
                  className='flex-grow-1'
                  placeholder='Write a comment...'
                  value={text}
                  onChange={e => setText(e.target.value)}
               />
               <button className='border-0 p-2'>Comment</button>
            </form>
         </div>
         <div className='comments_list'>
            {_comments?.map((comment, i) => (
               <Comment comment={comment} key={i} />
            ))}
         </div>
      </div>
   )
}

export default Comments