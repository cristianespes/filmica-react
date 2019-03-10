import React from 'react';
import { Link } from 'react-router-dom';
import Routes from './Routes';
import Nav from './Nav';

export default props =>
    <React.Fragment key='filmica'>
        <Nav />
        <Routes />
    </React.Fragment>
    