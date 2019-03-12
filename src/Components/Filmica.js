import React from 'react';
import Routes from './Routes';
import Nav from './Nav';
import LoginContext from './LoginContext';

export default class extends React.Component {
    state = {
        user: JSON.parse(localStorage.getItem('user'))
    }

    componentDidMount() {
        const { user } =  this.state;
        
        if (user) {
            const userFav = (
                JSON.parse(localStorage.getItem('favourites')) || {}
              )[user.login.uuid];
            
            this.setState({ favourites: userFav });
        }
    }

    render() {
        return (
            <LoginContext.Provider value={{
                user: this.state.user,
                isLogged: Boolean(this.state.user),
                favourites: this.state.favourites,
                hasFavourites: Boolean(this.state.favourites),
                login: this.login,
                logout: this.logout,
                addFavourite: this.addFavourite
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
    addFavourite = (filmID, userID) => {
        const favourites = JSON.parse(localStorage.getItem('favourites')) || {};
        const favouritesUser = favourites[userID] || [];
    
        if (!favouritesUser.includes(filmID)) {
          favouritesUser.push(filmID);
          favourites[userID] = favouritesUser;
          localStorage.setItem('favourites', JSON.stringify(favourites));
        }
      }
}
    