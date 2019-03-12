import React from 'react';
import { Switch, Route } from 'react-router';

import FilmList from './FilmList';
import Detail from './Detail';
import Login from './Login';
import FavouriteList from './FavouriteList';
import Searching from './Searching';
import requiresLogin from './requiresLogin';

//render={() => <FilmList detail={} />}

const reqLogin = requiresLogin('/login')

export default props =>
    <Switch>
        <Route exact path='/' component={FilmList} />
        <Route exact path='/favourites' component={reqLogin(FavouriteList)} />
        <Route exact path='/detail/:movieId' component={Detail} />
        <Route exact path='/search' component={Searching} />
        <Route exact path='/login' component={Login} />
        <Route component={ () => <p>Error 404, page not found</p> }/>
    </Switch>
