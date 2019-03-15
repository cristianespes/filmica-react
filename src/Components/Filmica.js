import React from 'react';
import Routes from './Routes';
import Nav from './Nav';
import LoginContext from './LoginContext';

const USERS_URL = 'https://randomuser.me/api?seed=abc&results=100';
const URL_DISCOVER_PAGING = 'https://api.themoviedb.org/3/discover/movie?api_key=e68728e1e31dcda82f7b2b896f0c47be&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=';
const URL_SEARCH_ID = 'https://api.themoviedb.org/3/movie/movie_id?api_key=e68728e1e31dcda82f7b2b896f0c47be';
const URL_TRENDING = 'https://api.themoviedb.org/3/trending/movie/week?api_key=e68728e1e31dcda82f7b2b896f0c47be';
const URL_SEARCH = 'https://api.themoviedb.org/3/search/movie?api_key=e68728e1e31dcda82f7b2b896f0c47be&language=en-US&page=1&include_adult=false&query=';

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
                getDiscover: this.getDiscover,
                favourites: this.state.favourites,
                hasFavourites: Boolean(this.state.favourites),
                getFavourite: this.getFavourite,
                getTrending: this.getTrending,
                getSearch: this.getSearch,
                login: this.login,
                logout: this.logout,
                addFavourite: this.addFavourite,
                unfollow: this.unfollow
              }}>
                <Nav />
                <Routes />
            </LoginContext.Provider>
        )
    }
    getDiscover = async () => {
        var films = []

        for (var i = 0; i < 15; i++) {
            const response = await fetch(`${URL_DISCOVER_PAGING}${i + 1}`);
            const { results } = await response.json();
            films = films.concat(results);
        }

        return films;
    }
    getTrending = async () => {
        const response = await fetch(URL_TRENDING);
        const { results } = await response.json();
        return results;
    }
    getSearch = async query => {
        const response = await fetch(`${URL_SEARCH}${query}`);
        const { results } = await response.json();
        return results;
    }
    getFavourite = async id => {
        const response = await fetch(URL_SEARCH_ID.replace('movie_id', id));
        const results = await response.json();
        return results;
    }
    _attemptLogin = async ({ user, password }) => {
        const users = await this._findUsers();
        return users.find(candidate =>
            candidate.login.username === user &&
            candidate.login.password === password
        );
    }
    _findUsers = async () => {
        /*try {
            const response = await fetch(USERS_URL)
            const { results: users } = await response.json()
            return users
        } catch (error) {

        }*/
        const response = await fetch(USERS_URL)
        const { results: users } = await response.json()
        return users
    }
    login = async credentials => {
        const user = await this._attemptLogin(credentials);
        if (!user) {
            throw new Error('No user found');
        }
        localStorage.setItem('user', JSON.stringify(user));
        this.setState({ user });
        return user;
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
        this.setState({favourites: favouritesUser});
    }
    unfollow = filmID => {
        const favourites = JSON.parse(localStorage.getItem('favourites')) || {};
        const favouritesUser = favourites[this.state.user.login.uuid] || [];
        const updatedFavourites = favouritesUser.filter(id => id !== filmID);
        favourites[this.state.user.login.uuid] = updatedFavourites;
        localStorage.setItem('favourites', JSON.stringify(favourites));
        this.setState({favourites: updatedFavourites});
    }
}
    