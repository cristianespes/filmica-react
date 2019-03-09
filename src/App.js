import React, { Component } from 'react';
import Showcase from './Components/Showcase';
import Film from './Components/Film';
import './App.css';

const FILMS = Array.from({ length: 100 }).map((_, index) => ({
  id: index,
  title: 'Película',
  poster_path: 'http://placehold.it/125x200'
}));

const URL_DISCOVER = 'https://api.themoviedb.org/3/discover/movie?api_key=e68728e1e31dcda82f7b2b896f0c47be&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1';

class App extends Component {
  state = { films: []}

  async componentDidMount() {
    const response = await fetch(URL_DISCOVER);
    const { results } = await response.json();
    this.setState({films: results});
  }

  render() {
    const { films } = this.state;
    return (
      <Showcase keyFn={item => item.id} items={films} render={film => 
        <Film details={film} />
      }/>
    );
  }
}

export default App;
