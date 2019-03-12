import React from 'react';
import { NavLink } from 'react-router-dom';

import './Nav.css';
import LoginContext from './LoginContext';

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
                <NavLink className='menu__link' to='/search'>Searching</NavLink>
            </li>
            <li className='menu__option'>
                <NavLink className='menu__link' to='/login'>Login</NavLink>
            </li>
            <LoginContext.Consumer>
                {
                    ({ isLogged, logout }) =>
                        isLogged &&
                        <li className='menu__option' onClick={logout}>
                            Logout
                        </li>
                }
            </LoginContext.Consumer>
        </ul>
    </nav>
