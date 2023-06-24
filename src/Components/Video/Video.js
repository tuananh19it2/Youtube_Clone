import React, { useEffect, useState } from 'react';
import './Video.scss';
import { AiFillEye } from 'react-icons/ai';
import request from '../../api';
import moment from 'moment';
import numeral from 'numeral';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import {useNavigate} from 'react-router-dom';

const Video = ({video, ChannelScreen}) => {
    const {id, snippet:{channelId, channelTitle, title, publishedAt, thumbnails:{medium}},contentDetails} = video;
    const [views, setViews] = useState(null);
    const [duration, setDuration] = useState(null);
    const [channelIcon, setChannelIcon] = useState(null);

    const seconds = moment.duration(duration).asSeconds();
    const durations = moment.utc(seconds * 1000).format("mm:ss");

    const videoId = id ?.videoId || contentDetails?.videoId || id;
    const navigate = useNavigate();

    useEffect(() => {
        const get_video_details = async() => {
            const {data:{items}} = await request('/videos', {
                params: {
                    part: 'contentDetails,statistics',
                    id: videoId
                }
            })
            setDuration(items[0].contentDetails.duration);
            setViews(items[0].statistics.viewCount)
        }
        get_video_details()
    }, [videoId])

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

    const handleVideoClick = () => {
        navigate(`/watch/${videoId}`)
    }

    return (
        <div className='video' onClick={handleVideoClick}>
            <div className='video_top'>
                {/* <img src={medium.url} alt=''/> */}
                <LazyLoadImage src={medium.url} effect='blur'/>
                <span className='video_duration'>{durations}</span>
            </div>
            <div className='video_title'>
                {title}
            </div>
            <div className='video_details'>
                <span>
                    <AiFillEye />  {numeral(views).format("0.a")} Views •
                </span>
                <span>{moment(publishedAt).fromNow()}</span>
            </div>
            {!ChannelScreen && (
                 <div className='video_channel'>
                 <img src={channelIcon?.url} alt='' />
                 <LazyLoadImage src={channelIcon?.url} effect='blur'/>
                 <p>{channelTitle}</p>
             </div>
            )}          
        </div>
    )
}

export default Video;

