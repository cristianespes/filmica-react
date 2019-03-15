import React from 'react'
import LoginContext from './LoginContext'

export default Component => props =>
  <LoginContext.Consumer>
    {
      ({ user, favourites, getFavourite }) =>
        <Component {...props} user={user} favourites={favourites} getFilm={getFavourite} />
    }
  </LoginContext.Consumer>