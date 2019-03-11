import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Showcase from './Showcase';
import Film from './Film';
import SearchBar from './SearchBar';
import Loading from './Loading';
import Error from './Error';

const URL_TRENDING = 'https://api.themoviedb.org/3/trending/movie/week?api_key=e68728e1e31dcda82f7b2b896f0c47be';
const URL_SEARCH = 'https://api.themoviedb.org/3/search/movie?api_key=e68728e1e31dcda82f7b2b896f0c47be&language=en-US&page=1&include_adult=false&query=';

class Searching extends Component {
  state = { films: [] }

  async componentDidMount() {
    try {
      const response = await fetch(URL_TRENDING);
      const { results } = await response.json();
      this.setState({ films: results });
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
        <React.Fragment>
        <SearchBar render={ query => this.searchFilm(query) }/>
        <Showcase keyFn={item => item.id} items={films} render={film => 
            <Link to={`/detail/${film.id}`}>
                <Film details={film} >
                <button onClick={() => this.addFavourite(film.id)}>Add to favourite</button>
                </ Film>
            </Link>
        }/>
        </React.Fragment>
    );
  }

  addFilms = films => {
    const previousState = this.state
    const nextState = {
      ...previousState,
      films: films
    }

    this.setState(nextState);
  }

  searchFilm = async query => {
    this.setState({ loading: false });
    try {
        const response = await fetch(`${URL_SEARCH}${query}`);
        const { results } = await response.json();
        this.addFilms(results);
    } catch(error) {
      this.setState({ error: true });
    } finally {
      this.setState({ loading: false });
    }
  }

  addFavourite = filmID => {
    const favourites = JSON.parse(localStorage.getItem('favourites')) || [];

    if (!favourites.includes(filmID)) {
      favourites.push(filmID);
      localStorage.setItem('favourites', JSON.stringify(favourites));
    }
  }
}

export default Searching;