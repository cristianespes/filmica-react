import React from 'react'
import LoginContext from './LoginContext'

export default Component => props =>
  <LoginContext.Consumer>
    {
      ({ user, favorites, getFavorite }) =>
        <Component {...props} user={user} favorites={favorites} getFilm={getFavorite} />
    }
  </LoginContext.Consumer>