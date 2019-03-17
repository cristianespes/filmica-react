import React from 'react'
import LoginContext from './LoginContext'

export default Component => props =>
  <LoginContext.Consumer>
    {
      ({ user, favorites, getFilmById }) =>
        <Component {...props} user={user} favorites={favorites} getFilmById={getFilmById} />
    }
  </LoginContext.Consumer>