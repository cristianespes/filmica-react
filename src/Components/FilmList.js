import React, { Component } from 'react';
import Showcase from './Showcase';
import Film from './Film';
import Loading from './Loading';
import Error from './Error';
import './FilmList.css';

/*const FILMS = Array.from({ length: 100 }).map((_, index) => ({
  id: index,
  title: 'Película',
  poster_path: 'http://placehold.it/125x200'
}));*/

const URL_DISCOVER = 'https://api.themoviedb.org/3/discover/movie?api_key=e68728e1e31dcda82f7b2b896f0c47be&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1';
const URL_DISCOVER_PAGING = 'https://api.themoviedb.org/3/discover/movie?api_key=e68728e1e31dcda82f7b2b896f0c47be&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=';

class App extends Component {
  state = { films: [], loading: true }

  async componentDidMount() {
    try {
      const response = await fetch(URL_DISCOVER);
      const { results } = await response.json();
      this.setState({ films: results });
    } catch(error) {
      this.setState({ error: true });
    } finally {
      this.setState({ loading: false });
    }

    /*Array.from({ length: 10 }).map(async (_, index) => {
      const response = await fetch(`${URL_DISCOVER_PAGING}${index + 1}`);
      const { results } = await response.json();
      this.addFilms(results);
    });*/

    /*const results = await Array.from({ length: 5 }).map(async (_, index) => {
      const response = await fetch(`${URL_DISCOVER_PAGING}${index + 1}`);
      const { results } = await response.json();
      return results;
    });*/
  }

  render() {
    const { films, loading, error } = this.state;

    if (error) return <Error />
    if (loading) return <Loading />

    return (
      <Showcase keyFn={item => item.id} items={films} render={film => 
        <Film details={film} />
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
}

export default App;
