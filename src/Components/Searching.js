import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Showcase from './Showcase';
import Film from './Film';
import SearchBar from './SearchBar';
import Loading from './Loading';
import Error from './Error';
import LoginContext from './LoginContext';
import './Searching.css';

class Searching extends Component {
  state = { films: [], loading: true }

  async componentDidMount() {
    try {
      const films = await this.props.getTrending();
      this.setState({ films: films });
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
          ({ isLogged, user, addFavorite }) =>
          <React.Fragment>
          <SearchBar render={ query => this.searchFilm(query) }/>
          <Showcase keyFn={item => item.id} items={films} render={film => 
              <Link to={`/detail/${film.id}`}>
                  <Film details={film} >
                  {
                    isLogged &&
                    <button className='favoriteList__addBtn' onClick={event => {
                      event.preventDefault()
                      addFavorite(film.id, user.login.uuid)
                    }}>Add to favorite</button>
                  }
                  </ Film>
              </Link>
          }/>
        </React.Fragment>
        }
      </LoginContext.Consumer> 
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
        const films = await this.props.getSearch(query);
        this.addFilms(films);
    } catch(error) {
      this.setState({ error: true });
    } finally {
      this.setState({ loading: false });
    }
  }
}

export default props =>
<LoginContext.Consumer>
    {
        ({ getTrending, getSearch }) =>
            <Searching getTrending={ getTrending } getSearch={ getSearch } />
    }
</LoginContext.Consumer>