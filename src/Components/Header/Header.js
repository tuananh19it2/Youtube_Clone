import React, { useState } from 'react';
import './Header.scss';
import {FaBars} from 'react-icons/fa';
import {AiOutlineSearch} from 'react-icons/ai';
import {MdNotifications, MdApps} from 'react-icons/md';
import {useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux';


const Header = ({handleToggleSideBar}) => {

    const [input, setInput] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(`/search/${input}`);
    }

    const {photoUrl} = useSelector(state => state.auth?.user)
    return (
        <div className='border border-dark header'>
            <FaBars 
               className='header_menu' size={26}
               onClick={() => handleToggleSideBar()}
            />
            <img 
            src='https://pngimg.com/uploads/youtube/youtube_PNG2.png'
            alt=''
            className='header_logo'
            />
            <form onSubmit={handleSubmit}>
               <input type='text' placeholder='Search' value={input} onChange={e => setInput(e.target.value)} />
               <button type='submit'>
                  <AiOutlineSearch size={22} />    
               </button>
            </form>
            <div className='header_icons'>
                <MdNotifications size={28}/>
                <MdApps size={28} />
                <img src={photoUrl}
                alt='avatar'
                />
            </div>
        </div>
    )
}

export default Header;