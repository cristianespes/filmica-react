import React from 'react';

import './DetailFilm.css';

const BASE_URL_IMAGE = 'https://image.tmdb.org/t/p/w342/'; 
const BASE_URL_BACKDROP = 'https://image.tmdb.org/t/p/w1280/';

export default props => 
    <div className='detailFilm'>
    <img className='detailFilm__backdrop' src={`${BASE_URL_BACKDROP}${props.details.backdrop_path}`} alt={props.details.title} />
        <div className='detailFilm__content'>
            <img className='detailFilm__poster' src={`${BASE_URL_IMAGE}${props.details.poster_path}`} alt={props.details.title} />
            <h1 className='detailFilm__title' >{props.details.title}</h1>
        </div>
        {
            props.children
        }
    </div>
