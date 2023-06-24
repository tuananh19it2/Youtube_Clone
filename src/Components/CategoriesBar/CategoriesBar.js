import React, { useState } from 'react';
import './CategoriesBar.scss';
import { useDispatch } from 'react-redux';
import { getPopularVideos, getVideosByCategory } from '../../redux/actions/videos.action';

const keywords = [
    'All',
    'React js',
    'Angular js',
    'React Native',
    'use of API',
    'Redux',
    'Music',
    'Algorithm Art',
    'Guitar',
    'Bengali Songs',
    'Coding',
    'Cricket',
    'Football',
    'Manchester United',
    'Gatsby',
    'Poor Coder',
    'Den vau'
]

const CategoriesBar = () => {
    const [activeElement, setActiveElement] = useState('ALL');
    const dispatch = useDispatch();

    const handleClick = (value) => {
        setActiveElement(value)
        if(value === 'ALL') {
            dispatch(getPopularVideos())
        }else {
            dispatch(getVideosByCategory(value))
        }  
    }
    return (
        <div className='CategoriesBar'>
            {keywords.map((value, i) => (
                <span
                className={activeElement === value ? 'active' : ''}
                onClick={() => handleClick(value)}
                key={i}> {value}
                </span>
            ))   
            }
        </div>
    )
}

export default CategoriesBar;