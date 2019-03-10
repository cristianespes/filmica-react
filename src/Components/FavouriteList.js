import React, { Component } from 'react';
import Showcase from './Showcase';
import Film from './Film';
import Loading from './Loading';
import Error from './Error';

const FAVOURITES = [299537, 399579, 297802];

const URL_DISCOVER = 'https://api.themoviedb.org/3/discover/movie?api_key=e68728e1e31dcda82f7b2b896f0c47be&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1';
const URL_DISCOVER_PAGING = 'https://api.themoviedb.org/3/discover/movie?api_key=e68728e1e31dcda82f7b2b896f0c47be&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=';
const URL_SEARCH_ID = 'https://api.themoviedb.org/3/movie/movie_id?api_key=e68728e1e31dcda82f7b2b896f0c47be';

class FavouriteList extends Component {
  state = { films: [], loading: true, hasFavourites: true };

  async componentDidMount() {
      if (FAVOURITES.length === 0) {
          return this.setState({ hasFavourites: false });
      } 

    try {
        FAVOURITES.map(async id => {
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
        <Film details={film} >
            <button onClick={() => this.unfollow(film.id)}>Unfollow</button>
        </ Film>
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
    const updatedFilms = this.state.films.filter(film => film.id !== filmID);
    this.setState({films: updatedFilms});
  }
}

export default FavouriteList;
