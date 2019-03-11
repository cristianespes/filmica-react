import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Showcase from './Showcase';
import Film from './Film';
import Loading from './Loading';
import Error from './Error';
import './FilmList.css';

const URL_DISCOVER = 'https://api.themoviedb.org/3/discover/movie?api_key=e68728e1e31dcda82f7b2b896f0c47be&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1';
const URL_DISCOVER_PAGING = 'https://api.themoviedb.org/3/discover/movie?api_key=e68728e1e31dcda82f7b2b896f0c47be&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=';

class FilmList extends Component {
  state = { films: [], loading: true }

  async componentDidMount() {
    /*try {
      const response = await fetch(URL_DISCOVER);
      const { results } = await response.json();
      this.setState({ films: results });
    } catch(error) {
      this.setState({ error: true });
    } finally {
      this.setState({ loading: false });
    }*/

    /*Array.from({ length: 10 }).map(async (_, index) => {
      const response = await fetch(`${URL_DISCOVER_PAGING}${index + 1}`);
      const { results } = await response.json();
      this.addFilms(results);
    });*/

    /*const results = await Array.from({ length: 5 }).map(async (_, index) => {
      const response = await fetch(`${URL_DISCOVER_PAGING}${index + 1}`);
      const { results } = await response.json();
      return results;
    });

    this.addFilms(results);*/

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
      <Showcase keyFn={item => item.id} items={films} render={film => 
        <Link to={`/detail/${film.id}`}>
          <Film details={film} >
            <button onClick={() => this.addFavourite(film.id)}>Add to favourite</button>
          </ Film>
        </Link>
      }/>
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
    const favourites = JSON.parse(localStorage.getItem('favourites')) || [];

    if (!favourites.includes(filmID)) {
      favourites.push(filmID);
      localStorage.setItem('favourites', JSON.stringify(favourites));
    }
  }
}

export default FilmList;
