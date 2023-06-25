import React, { useEffect } from 'react';
import './WatchScreen.scss';
import {Col, Container, Row} from 'react-bootstrap';
import VideoMetaData from '../../Components/VideoMetaData/VideoMetaData';
import VideoHorizontal from '../../Components/VideoHorizontal/VideoHorizontal';
import Comments from '../../Components/Comments/Comments';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getRelatedVideos, getVideoById } from '../../redux/actions/videos.action';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const WatchScreen = () => {
    const {id} = useParams();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getVideoById(id));
        dispatch(getRelatedVideos(id));
    }, [dispatch, id])

    const {video, loading} = useSelector(state => state.selectedVideo);
    const {videos, loading: relatedToVideosLoading} = useSelector(state => state.relatedVideos);
  return (
    <Row>
        
        <Col lg={8}>
            <div className='watchScreen_player'>
                <iframe src={`https://www.youtube.com/embed/${id}`}
                frameBorder='0'
                title={video?.snippet?.title}
                allowFullScreen
                width='100%'
                height='100%'></iframe>
            </div>
            {!loading ? <VideoMetaData video={video} videoId={id} />
            :
            <h6>Loading...</h6>
            }
            <Comments 
               videoId={id}
               totalComments={video?.statistics?.commentCount}
               />
        </Col>
        <Col lg={4}>
            {
                !loading ? videos?.filter(video => video.snippet)
                .map(video => (
                <VideoHorizontal video={video} key={video.id.videoId} />
                ))
                :
                <SkeletonTheme baseColor="#202020" highlightColor="#444">
                    <Skeleton width='100%' height={130} count={15}/>
                </SkeletonTheme>
                
            }
        </Col>

    </Row>
  )
}

export default WatchScreen;