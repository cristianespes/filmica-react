import React from 'react';
import { Switch, Route } from 'react-router';

import FilmList from './FilmList';
import Detail from './Detail';
import Login from './Login';
//<Login onLogin={console.table}/>
import FavouriteList from './FavouriteList';

export default props =>
    <Switch>
        <Route exact path='/' component={FilmList} />
        <Route exact path='/favourites' component={FavouriteList} />
        <Route exact path='/detail/:movieId' component={Detail} />
        <Route exact path='/login' component={Login} />
    </Switch>
