import React, { useEffect, useState } from 'react';
import {Container} from 'react-bootstrap';
import Header from './Components/Header/Header';
import Sidebar from './Components/Sidebar/Sidebar';
import HomeScreen from './screens/homeScreens/HomeScreen';
import LoginScreen from './screens/loginScreen/LoginScreen';
import WatchScreen from './screens/watchScreen/WatchScreen';
import SearchScreen from './screens/SearchScreen';
import SubscriptionsScreen from './screens/subscriptionsScreen/SubscriptionsScreen';
import ChannelScreen from './screens/channelScreen/ChannelScreen';
import './app.scss';
import {BrowserRouter as Router, Route, Switch, Routes, Navigate, useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux';

const Layout = ({children}) => {
    const [sidebar, toggleSidebar] = useState(false);
    const handleToggleSideBar = () => toggleSidebar(value => !value)
    return (
        <>
           <Header handleToggleSideBar = {handleToggleSideBar}/>
           <div className='app_container'>
               <Sidebar sidebar = {sidebar}
               handleToggleSideBar = {handleToggleSideBar}
               />
               <Container fluid className='app_main'>
                   {children}
               </Container>
           </div>   
        </>
    )
}

const App = () => {

    const {accessToken, loading} = useSelector(state=>state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if(!loading && !accessToken) {
            navigate('/auth');      
        }
    }, [accessToken, loading, navigate])
    
    return (
    <Routes>
        <Route path='/' element={<Layout><HomeScreen /></Layout>}></Route>
        <Route path='/auth' element={<LoginScreen />}></Route>
        <Route path='/search/:query' element={<Layout><SearchScreen /></Layout>}></Route>
        <Route path='/watch/:id' element={<Layout><WatchScreen /></Layout>}></Route>
        <Route path='/feed/subscriptions' element={<Layout><SubscriptionsScreen /></Layout>}></Route>
        <Route path='/channel/:channelId' element={<Layout><ChannelScreen /></Layout>}></Route>
        <Route path='*' element={<Navigate to="/" replace />}  />  
    </Routes>
    )   
}

export default App;