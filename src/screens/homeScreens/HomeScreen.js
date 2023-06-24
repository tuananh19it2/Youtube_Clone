import React, { useEffect } from 'react';
import {Col, Container, Row} from 'react-bootstrap';
import CategoriesBar from '../../Components/CategoriesBar/CategoriesBar';
import Video from '../../Components/Video/Video';
import { useDispatch, useSelector } from 'react-redux';
import { getPopularVideos, getVideosByCategory } from '../../redux/actions/videos.action';
import InfiniteScroll from 'react-infinite-scroll-component';
import SkeletonVideo from '../../Components/Skeletons/SkeletonVideo';


const HomeScreen = () => {

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getPopularVideos())
  }, [dispatch])

  const {videos, activeCategory, loading} = useSelector(state => state.homeVideos)

  const fetchData = () => {
    if(activeCategory === 'ALL')
    dispatch(getPopularVideos())
    else {
      dispatch(getVideosByCategory(activeCategory))
    }
  }
  
  return (
    <Container>
        <CategoriesBar />
          <InfiniteScroll
          dataLength={videos.length}
          next={fetchData}
          hasMore={true}
          loader= {
            <div className='spinner-border text-danger d-block mx-auto'></div>
          }
          className='row'
          >
            {!loading 
            ? videos.map((video) => (
            <Col Lg={3} md={4}>
                <Video video={video} key={video.id}/>
            </Col>
            ))
            : 
            [...Array(20)].map(() => (
              <Col Lg={3} md={4}>
                 <SkeletonVideo />
              </Col>
            ))}
          </InfiniteScroll> 
    </Container>
  )
}

export default HomeScreen