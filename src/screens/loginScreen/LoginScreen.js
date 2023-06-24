import React, { useEffect } from 'react';
import './loginScreen.scss';
import {useDispatch, useSelector} from 'react-redux';
import {login} from '../../redux/actions/auth.action';
import { useNavigate } from 'react-router-dom';

const LoginScreen = () => {
  const dispatch = useDispatch();

  const accessToken = useSelector(state => state.auth.accessToken);

  const handleLogin = () => {
    dispatch(login())
  }

  const navigate = useNavigate();

  useEffect(()=> {
    if(accessToken) {
      navigate('/')
    }
  }, [accessToken, navigate])
  return (
    <div className='login'>
        <div className='login_container'>
            <img 
              src='https://pngimg.com/uploads/youtube/youtube_PNG2.png'
              alt=''
            />
            <button onClick={handleLogin}>Login with google</button>
            <p>This project is made using YOUTUBE DATA API</p>
        </div>
    </div>
  )
}

export default LoginScreen;