import React from 'react'
import LoginContext from './LoginContext'

export default Component => props =>
  <LoginContext.Consumer>
    {
      ({ user, favourites }) =>
        <Component {...props} user={user} favourites={favourites} />
    }
  </LoginContext.Consumer>