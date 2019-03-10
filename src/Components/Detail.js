import React from 'react';

import Film from './Film';
import Data from './Data';
import AddAssessment from './AddAssessment';
import AddFavourite from './AddFavourite';
import Loading from './Loading';
import Error from './Error';

import './Detail.css';

const URL_SEARCH_ID = 'https://api.themoviedb.org/3/movie/movie_id?api_key=e68728e1e31dcda82f7b2b896f0c47be';

class Detail extends React.Component{
    state = { loading: true, showingForm: false, movieId: this.props.match.params.movieId };

    async componentDidMount() {
        const assessments = JSON.parse(localStorage.getItem('assessments')) || {};
        this.setState({ assessment: assessments[this.state.movieId] || ''});

        const favourites = JSON.parse(localStorage.getItem('favourites')) || [];
        if (favourites.filter(id => id === this.state.movieId)) {
            this.setState({isFavourite: true});
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
        const { error, loading, film, assessment } = this.state;

        if (error) return <Error />
        if (loading) return <Loading />

        return (
            <div className='detail'>
                <Film details={film} />
                {
                    !this.state.isFavourite &&
                    <AddFavourite />
                }
                
                <button onClick={this.showForm}>Add assessment</button>
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
                        (parseInt(assessment) >= 0 && parseInt(assessment) <= 100) &&
                        <li key='assessment' className='dataList__data'>
                            <Data title='Assessment' content={`${parseInt(assessment)/10}/10`}/>
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
        this.setState( previousState => ({
            ...previousState,
            assessment: newAssessment
        }));
        this.hideForm();

        const assessments = JSON.parse(localStorage.getItem('assessments')) || {};
        assessments[this.state.movieId] = newAssessment;
        localStorage.setItem('assessments', JSON.stringify(assessments));
    }
}

export default Detail;
