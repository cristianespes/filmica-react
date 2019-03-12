import React from 'react'
import { Redirect } from 'react-router-dom'

import LoginContext from './LoginContext'

const requiresLogin = loginUrl =>
  Component => props =>
    <LoginContext.Consumer>
      {
        ({ isLogged }) =>
          isLogged
            ? <Component {...props} />
            : <Redirect to={loginUrl} />
      }
    </LoginContext.Consumer>

export default requiresLogin