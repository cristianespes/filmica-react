import React from 'react'
import './Film.css'

const BASE_URL_IMAGE = 'https://image.tmdb.org/t/p/w185';

export default props => 
    <div className='film'>
        <img className='film__poster' src={`${BASE_URL_IMAGE}${props.details.poster_path}`} alt={props.details.title} />
        <h1 className='film__title' >{props.details.title}</h1>
    </div>
