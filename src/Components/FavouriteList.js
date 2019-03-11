import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Showcase from './Showcase';
import Film from './Film';
import Loading from './Loading';
import Error from './Error';

const URL_SEARCH_ID = 'https://api.themoviedb.org/3/movie/movie_id?api_key=e68728e1e31dcda82f7b2b896f0c47be';

class FavouriteList extends Component {
  state = { films: [], loading: true, hasFavourites: true };

  async componentDidMount() {
    const favourites = JSON.parse(localStorage.getItem('favourites')) || [];

    if (favourites.length === 0) {
        return this.setState({ hasFavourites: false });
    } 

    try {
        favourites.map(async id => {
            const response = await fetch(URL_SEARCH_ID.replace('movie_id', id));
            const results = await response.json();
            this.addFilms(results);
        });
      } catch(error) {
        this.setState({ error: true });
      } finally {
        this.setState({ loading: false });
      }
  }

  render() {
    const { films, loading, error, hasFavourites } = this.state;

    if (!hasFavourites) return <p>No favourite movies yet</p>
    if (error) return <Error />
    if (loading) return <Loading />

    return (
      <Showcase keyFn={item => item.id} items={films} render={film => 
        <Link to={`/detail/${film.id}`}>
        <Film details={film} >
            <button onClick={() => this.unfollow(film.id)}>Unfollow</button>
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

  unfollow = filmID => {
    const favourites = JSON.parse(localStorage.getItem('favourites')) || [];
    const updatedFavourites = favourites.filter(id => id !== filmID);
    localStorage.setItem('favourites', JSON.stringify(updatedFavourites));

    const updatedFilms = this.state.films.filter(film => film.id !== filmID);
    this.setState({films: updatedFilms});
  }
}

export default FavouriteList;
