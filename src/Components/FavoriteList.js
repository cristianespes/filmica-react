import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Showcase from './Showcase';
import Film from './Film';
import Loading from './Loading';
import Error from './Error';
import LoggedError from './LoggedError';
import withFavorites from './withFavorites';
import LoginContext from './LoginContext';
import './FavoriteList.css';

class FavoriteList extends Component {
  state = { films: [], loading: true, hasFavorites: true };

  async componentDidMount() {
    const loggedUser = this.props.user;

    if (!loggedUser) return this.setState({isNotLogged: true});
    
    const favorites = this.props.favorites;

    if (!favorites) {
        return this.setState({ hasFavorites: false });
    }

    try {
        favorites.map(async id => {
            const film = await this.props.getFilmById(id);
            this.addFilms(film);
        });
      } catch(error) {
        this.setState({ error: true });
      } finally {
        this.setState({ loading: false, user: loggedUser });
      }
  }

  render() {
    const { isNotLogged, films, loading, error, hasFavorites } = this.state;

    if (isNotLogged) return <LoggedError />
    if (!hasFavorites) return <p className='favoriteListError'>No favorite movies yet</p>
    if (error) return <Error />
    if (loading) return <Loading />

    return (
      <LoginContext.Consumer>
        {
          ({ unfollow }) =>
          <Showcase keyFn={item => item.id} items={films} render={film => 
            <Link to={`/detail/${film.id}`}>
            <Film details={film} >
                <button className='favoriteList__unfollowBtn' onClick={event =>{
                  event.preventDefault()
                  unfollow(film.id)
                }}>Unfollow</button>
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
}

export default withFavorites(FavoriteList);
