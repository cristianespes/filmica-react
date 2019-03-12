import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Showcase from './Showcase';
import Film from './Film';
import Loading from './Loading';
import Error from './Error';
import './FilmList.css';
import LoginContext from './LoginContext';

const URL_DISCOVER_PAGING = 'https://api.themoviedb.org/3/discover/movie?api_key=e68728e1e31dcda82f7b2b896f0c47be&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=';

class FilmList extends Component {
  state = { films: [], loading: true }

  async componentDidMount() {
    try {
      for (var i = 0; i < 15; i++) {
          const response = await fetch(`${URL_DISCOVER_PAGING}${i + 1}`);
          const { results } = await response.json();
          this.addFilms(results);
       }
    } catch(error) {
      this.setState({ error: true });
    } finally {
      this.setState({ loading: false });
    }
  }

  render() {
    const { films, loading, error } = this.state;

    if (error) return <Error />
    if (loading) return <Loading />

    return (
      <LoginContext.Consumer>
        {
          ({ isLogged }) =>
          <Showcase keyFn={item => item.id} items={films} render={film => 
            <Link to={`/detail/${film.id}`}>
              <Film details={film} >
              {
                isLogged &&
                <button onClick={() => this.addFavourite(film.id)}>Add to favourite</button>
              }
              </ Film>
            </Link>
          }/>
        }
      </LoginContext.Consumer>
    );
  }

  addFilms = films => {
    const previousState = this.state
    const newFilms = previousState.films.concat(films);
    const nextState = {
      ...previousState,
      films: newFilms
    }

    this.setState(nextState);
  }

  addFavourite = filmID => {
    const favourites = JSON.parse(localStorage.getItem('favourites')) || {};
    const favouritesUser = favourites[this.state.user.login.uuid] || [];

    if (!favouritesUser.includes(filmID)) {
      favouritesUser.push(filmID);
      favourites[this.state.user.login.uuid] = favouritesUser;
      localStorage.setItem('favourites', JSON.stringify(favourites));
    }
  }
}

export default FilmList;
