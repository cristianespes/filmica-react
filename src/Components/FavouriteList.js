import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Showcase from './Showcase';
import Film from './Film';
import Loading from './Loading';
import Error from './Error';
import LoggedError from './LoggedError';
import withFavourites from './withFavourites';
import LoginContext from './LoginContext';
import './FavouriteList.css';

class FavouriteList extends Component {
  state = { films: [], loading: true, hasFavourites: true };

  async componentDidMount() {
    const loggedUser = this.props.user;

    if (!loggedUser) return this.setState({isNotLogged: true});
    
    const favourites = this.props.favourites;

    if (!favourites) {
        return this.setState({ hasFavourites: false });
    }

    try {
        favourites.map(async id => {
            const film = await this.props.getFilm(id);
            this.addFilms(film);
        });
      } catch(error) {
        this.setState({ error: true });
      } finally {
        this.setState({ loading: false, user: loggedUser });
      }
  }

  render() {
    const { isNotLogged, films, loading, error, hasFavourites } = this.state;

    if (isNotLogged) return <LoggedError />
    if (!hasFavourites) return <p className='favouriteListError'>No favourite movies yet</p>
    if (error) return <Error />
    if (loading) return <Loading />

    return (
      <LoginContext.Consumer>
        {
          ({ unfollow }) =>
          <Showcase keyFn={item => item.id} items={films} render={film => 
            <Link to={`/detail/${film.id}`}>
            <Film details={film} >
                <button className='favouriteList__unfollowBtn' onClick={event =>{
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

export default withFavourites(FavouriteList);
