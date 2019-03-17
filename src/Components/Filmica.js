import React from 'react';
import Routes from './Routes';
import Nav from './Nav';
import LoginContext from './LoginContext';

const USERS_URL = 'https://randomuser.me/api?seed=abc&results=100';
const URL_DISCOVER_PAGING = 'https://api.themoviedb.org/3/discover/movie?api_key=e68728e1e31dcda82f7b2b896f0c47be&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=';
const URL_SEARCH_ID = 'https://api.themoviedb.org/3/movie/movie_id?api_key=e68728e1e31dcda82f7b2b896f0c47be';
const URL_TRENDING = 'https://api.themoviedb.org/3/trending/movie/week?api_key=e68728e1e31dcda82f7b2b896f0c47be';
const URL_SEARCH = 'https://api.themoviedb.org/3/search/movie?api_key=e68728e1e31dcda82f7b2b896f0c47be&language=en-US&page=1&include_adult=false&query=';
const URL_GENRES = 'https://api.themoviedb.org/3/genre/movie/list?api_key=e68728e1e31dcda82f7b2b896f0c47be&language=en-US';

export default class extends React.Component {
    state = {
        user: JSON.parse(localStorage.getItem('user'))
    }

    async componentDidMount() {
        const { user } =  this.state;
        
        if (user) {
            this._checkFavorites(user.login.uuid);
        }

        await this._getGenres();
    }

    render() {
        return (
            <LoginContext.Provider value={{
                user: this.state.user,
                isLogged: Boolean(this.state.user),
                genresByFilm: this.genresByFilm,
                getDiscover: this.getDiscover,
                favorites: this.state.favorites,
                hasFavorites: Boolean(this.state.favorites),
                getFilmById: this.getFilmById,
                getTrending: this.getTrending,
                getSearch: this.getSearch,
                login: this.login,
                logout: this.logout,
                addFavorite: this.addFavorite,
                unfollow: this.unfollow
              }}>
                <Nav />
                <Routes />
            </LoginContext.Provider>
        )
    }
    _getGenres = async () => {
        const response = await fetch(URL_GENRES);
        const { genres } = await response.json();
        localStorage.setItem('genres', JSON.stringify(genres));
        this.setState({ genres });
    }
    genresByFilm = async arrId => {
        var results = "";
        const allGenres = JSON.parse(localStorage.getItem('genres')) || [];

        for (var i = 0; i < arrId.length; i++) {
            const objectGenre = await allGenres.find(genreItem => genreItem.id == arrId[i].id);
            if (i == 0) 
                results = `${objectGenre.name}`
             else 
                results = `${results} | ${objectGenre.name}`
        }

        /*arrId.forEach( (id, index) => {
            const objectGenre = allGenres.find(item => item.id === id);
            debugger
            if (index == 0) 
                results = `${objectGenre.name}`
             else 
                results = `${results} | ${objectGenre.name}`
        });*/

        debugger
        return results;
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
    _checkFavorites = userId => {
        const userFav = (
            JSON.parse(localStorage.getItem('favorites')) || {}
          )[userId];
        this.setState({ favorites: userFav });
    }
    getFilmById = async id => {
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
        this._checkFavorites(user.login.uuid);
        this.setState({ user });
        return user;
    }
    logout = () => {
        this.setState({ user: null });
        localStorage.removeItem('user');
    }
    addFavorite = (filmID, userID) => {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || {};
        const favoritesUser = favorites[userID] || [];
    
        if (!favoritesUser.includes(filmID)) {
          favoritesUser.push(filmID);
          favorites[userID] = favoritesUser;
          localStorage.setItem('favorites', JSON.stringify(favorites));
        }
        this.setState({favorites: favoritesUser});
    }
    unfollow = filmID => {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || {};
        const favoritesUser = favorites[this.state.user.login.uuid] || [];
        const updatedFavorites = favoritesUser.filter(id => id !== filmID);
        favorites[this.state.user.login.uuid] = updatedFavorites;
        localStorage.setItem('favorites', JSON.stringify(favorites));
        this.setState({favorites: updatedFavorites});
    }
}
    