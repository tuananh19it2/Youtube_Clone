import React from 'react';
import {MdSubscriptions, MdExitToApp, MdThumbUp, MdHistory, MdLibraryBooks, MdHome, MdSentimentDissatisfied}
from 'react-icons/md';
import './Sidebar.scss';
import { log_out } from '../../redux/actions/auth.action';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const Sidebar = ({sidebar, handleToggleSideBar}) => {

    const dispatch = useDispatch();
    const logOutHandler = () => {
        dispatch(log_out());
    }
    return (
        <nav className={sidebar ? 'sidebar open' : 'sidebar'}
        onClick={() => handleToggleSideBar(false)}
        >
            <li>
                <MdHome size={23}/>
                <span>Home</span>
            </li>
            <Link to='/feed/subscriptions'> 
               <li>
                   <MdSubscriptions size={23}/>
                   <span>Subscriptions</span>
               </li>
            </Link>
           
            <li>
                <MdThumbUp size={23}/>
                <span>Liked Video</span>
            </li>
            <li>
                <MdHistory size={23}/>
                <span>History</span>
            </li>
            <li>
                <MdLibraryBooks size={23}/>
                <span>Library</span>
            </li>
            <hr />
            <li onClick={logOutHandler}>
                <MdExitToApp size={23}/>
                <span>Log Out</span>
            </li>
            <hr />
        </nav>
    )
}

export default Sidebar;