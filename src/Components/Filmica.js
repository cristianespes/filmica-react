import React from 'react';
import Routes from './Routes';
import Nav from './Nav';
import LoginContext from './LoginContext';

export default class extends React.Component {
    state = {
        user: JSON.parse(localStorage.getItem('user'))
    }

    render() {
        return (
            <LoginContext.Provider value={{
                isLogged: Boolean(this.state.user),
                user: this.state.user,
                posts: this.state.posts,
                login: this.login,
                logout: this.logout,
                addPost: this.addPost
              }}>
                <Nav />
                <Routes />
            </LoginContext.Provider>
        )
    }
    login = user => {
        localStorage.setItem('user', JSON.stringify(user))
        this.setState({ user })
    }
    logout = () => {
        this.setState({ user: null });
        localStorage.removeItem('user');
    }
}
    