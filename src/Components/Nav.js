import React from 'react';
import { NavLink } from 'react-router-dom';

import './Nav.css';

export default props =>
    <nav className='menu'>
        <ul className='menu__options'>
            <li className='menu__option'>
                <NavLink exact className='menu__link' to='/'>Film list</NavLink>
            </li>
            <li className='menu__option'>
                <NavLink className='menu__link' to='/favourites'>Favourites list</NavLink>
            </li>
            <li className='menu__option'>
                <NavLink className='menu__link' to='/login'>Login</NavLink>
            </li>
        </ul>
    </nav>