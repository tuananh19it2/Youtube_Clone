import React, { useEffect, useState } from 'react';
import './VideoHorizontal.scss';
import { AiFillEye } from 'react-icons/ai';
import request from '../../api';
import moment from 'moment';
import numeral from 'numeral';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import {Col, Container, Row} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';

const VideoHorizontal = ({video, searchScreen, subScreen }) => {

  const {id,
         snippet: {
          channelId,
          channelTitle,
          description,
          title,
          publishedAt,
          thumbnails:{medium},
          resourceId
         },
  } = video;

  const isVideo = !(id.kind === 'youtube#channel' || subScreen);

  const [views, setViews] = useState(null);
  const [duration, setDuration] = useState(null);
  const [channelIcon, setChannelIcon] = useState(null);
  
  const seconds = moment.duration(duration).asSeconds();
  const durations = moment.utc(seconds * 1000).format("mm:ss");

  const navigate = useNavigate();
  const _channelId = resourceId?.channelId || channelId;

  useEffect(() => {
    const get_video_details = async() => {
        const {data:{items}} = await request('/videos', {
            params: {
                part: 'contentDetails,statistics',
                id: id.videoId
            }
        })
        setDuration(items[0].contentDetails.duration);
        setViews(items[0].statistics.viewCount)
    }
    if(isVideo)
    get_video_details()
}, [id, isVideo])

useEffect(() => {
  const get_channel_icon = async() => {
      const {data:{items}} = await request('/channels', {
          params: {
              part: 'snippet',
              id: channelId
          }
      })
      setChannelIcon(items[0].snippet.thumbnails.default);
  }
  get_channel_icon()
}, [channelId])

const handleClick = () => {
  isVideo?
  navigate(`/watch/${id.videoId}`)
  :
  navigate(`/channel/${_channelId}`)
}

const thumbnail = !isVideo && 'videoHorizontal_thumbnail-channel' 

  return (
    <Row className='videoHorizontal m-1 py-2 align-items-center' onClick={handleClick}>
      <Col xs={6} md={searchScreen || subScreen ?4:6}className='videoHorizontal_left'>
        <LazyLoadImage 
           src={medium.url}
           effect='blur'
           className={`videoHorizontal_thumbnail ${thumbnail}`}
           wrapperClassName='videoHorizontal_thumbnail-wrapper'
        />
        {isVideo && (
           <span className='videoHorizontal_duration'>{durations}</span>
        )}
      </Col>
      
      <Col xs={6} md={searchScreen || subScreen ?8:6} className='videoHorizontal-right p-0'>
        <p className='videoHorizontal_title mb-1'>
          {title}
        </p>
        {isVideo && (
           <div className='videoHorizontal_details'>
           <span>
               <AiFillEye />  {numeral(views).format("0.a")} Views •
           </span>
           <span>{moment(publishedAt).fromNow()}</span>
           </div>
        )}
        {(searchScreen || subScreen) && 
          <p className='mt-1 videoHorizontal_desc'>
             {description}
          </p>
        }
        <div className='videoHorizontal_channel d-flex align-items-center my-1'>
          {isVideo && (
               <LazyLoadImage 
                  src={channelIcon?.url}
                  effect='blur'
               />
           )}
        <p>{channelTitle}</p>
        </div>
        {
          subScreen && (
          <p className='mt-2'>
            {
              video.contentDetails.totalItemCount
            }{''}Videos
          </p>
        )}
      </Col>
    </Row>
  )
}

export default VideoHorizontal