import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Showcase from './Showcase';
import Film from './Film';
import Loading from './Loading';
import Error from './Error';
import './FilmList.css';
import LoginContext from './LoginContext';

class FilmList extends Component {
  state = { films: [], loading: true }

  async componentDidMount() {
    try {
      const films = await this.props.getDiscover();
      this.addFilms(films);
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
          ({ isLogged, user, addFavourite }) =>
          <Showcase keyFn={item => item.id} items={films} render={film => 
            <Link to={`/detail/${film.id}`}>
              <Film details={film} >
              {
                isLogged &&
                <button className='favouriteList__addBtn' onClick={event => {
                  event.preventDefault()
                  addFavourite(film.id, user.login.uuid)
                }}>Add to favourite</button>
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
}

export default props =>
<LoginContext.Consumer>
    {
        ({ getDiscover }) =>
            <FilmList getDiscover={ getDiscover } />
    }
</LoginContext.Consumer>
