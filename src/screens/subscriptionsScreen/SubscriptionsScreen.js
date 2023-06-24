import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './subscriptionsScreen.scss';
import { getSubscribedChannels } from '../../redux/actions/videos.action';
import { Container } from 'react-bootstrap';
import VideoHorizontal from '../../Components/VideoHorizontal/VideoHorizontal';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const SubscriptionsScreen = () => {

    const {query} = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getSubscribedChannels())
    }, [dispatch])

    const {loading, videos} = useSelector(state => state.subscriptionsChannel)
  return (
    <Container fluid>
        {
            !loading ? (
                videos?.map(video => (<VideoHorizontal video={video} key={video.id} subScreen />))
            )
            :
            <SkeletonTheme baseColor="#202020" highlightColor="#444">
                    <Skeleton width='100%' height={160} count={20}/>
            </SkeletonTheme>
        }
    </Container>
  )
}

export default SubscriptionsScreen