import React from 'react';

import Data from './Data';
import AddAssessment from './AddAssessment';
import AddFavorite from './AddFavorite';
import Loading from './Loading';
import Error from './Error';
import DetailFilm from './DetailFilm';

import './Detail.css';

const URL_SEARCH_ID = 'https://api.themoviedb.org/3/movie/movie_id?api_key=e68728e1e31dcda82f7b2b896f0c47be';

class Detail extends React.Component{
    state = { loading: true, showingForm: false, movieId: this.props.match.params.movieId };

    async componentDidMount() {
        const user = JSON.parse(localStorage.getItem('user'));

        if (user) {
            this.setState({user: user});

            const assessments = JSON.parse(localStorage.getItem('assessments')) || {};
            const film = assessments[`${this.state.movieId}`] || {};
            const count = film['count'];
            const total = film['total'];
            const average = total / count;
            console.log('average:' + average)
            this.setState({ assessment: average || ''});

            const favorites = JSON.parse(localStorage.getItem('favorites')) || {};
            const favoritesUser = favorites[user.login.uuid] || [];

            if (favoritesUser.filter(id => id === this.state.movieId)) {
                this.setState({isFavorite: true});
            }
        }
        
        try {
            const response = await fetch(URL_SEARCH_ID.replace('movie_id', this.state.movieId));
            const results = await response.json();
            this.setState({ film: results });
          } catch(error) {
            this.setState({ error: true });
          } finally {
            this.setState({ loading: false });
          }
    }

    render() {
        const { user, error, loading, film, assessment } = this.state;

        if (error) return <Error />
        if (loading) return <Loading />

        return (
            <div className='detail'>
                <DetailFilm details={film} />
                {
                    !this.state.isFavorite && user &&
                    <AddFavorite />
                }
                {
                    user && !this.state.showingForm &&
                    <button className='detail__addAssessmentBtn' onClick={this.showForm}>Add assessment</button>
                }
                {
                    this.state.showingForm &&
                    <AddAssessment onSubmit={this.addAssessment} onCancel={this.hideForm} />
                }
                
                <ul className='dataList'>
                    <li key='overview' className='dataList__data' >
                        <Data title='Overview' content={film.overview}/>
                    </li>
                    <li key='release' className='dataList__data'>
                        <Data title='Release date' content={film.release_date}/>
                    </li>
                    {
                        (parseFloat(assessment) >= 0.0 && parseFloat(assessment) <= 10.0) &&
                        <li key='assessment' className='dataList__data'>
                            <Data title='Assessment' content={`${parseFloat(assessment).toFixed(0)}/10`}/>
                        </li>
                    }
                    
                </ul>
            </div>
        ) 
    }

    showForm = () => {
        this.setState({showingForm: true});
    }

    hideForm = () => {
        this.setState({showingForm: false});
    }
    addAssessment = (newAssessment) => {
        const assessments = JSON.parse(localStorage.getItem('assessments')) || {};
        const film = assessments[this.state.movieId] || {};
        const count = film['count'] || 0;
        const total = film['total'] || 0;
        film['count'] = count + 1;
        film['total'] = total + parseFloat(newAssessment);
        assessments[this.state.movieId] = film;
        localStorage.setItem('assessments', JSON.stringify(assessments));

        this.setState( previousState => ({
            ...previousState,
            assessment: (film['total'] / film['count'])
        }));
        this.hideForm();
    }
}

export default Detail;
