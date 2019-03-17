import React from 'react';

import Data from './Data';
import AddAssessment from './AddAssessment';
import Loading from './Loading';
import Error from './Error';
import DetailFilm from './DetailFilm';
import LoginContext from './LoginContext';

import './Detail.css';

class Detail extends React.Component{
    state = { loading: true, showingForm: false, movieId: this.props.match.params.movieId };

    async componentDidMount() {
        const assessments = JSON.parse(localStorage.getItem('assessments')) || {};
            const film = assessments[`${this.state.movieId}`] || {};
            const count = film['count'];
            const total = film['total'];
            const average = total / count;
            console.log('average:' + average)
            this.setState({ assessment: average || ''});
        
        try {
            const results = await this.props.getFilmById(this.state.movieId);
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
                <DetailFilm details={film} />
                {
                    this.props.isLogged && !this.state.showingForm &&
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

export default props =>
<LoginContext.Consumer>
    {
        ({ isLogged, getFilmById }) =>
            <Detail {...props} isLogged={ isLogged } getFilmById={getFilmById} />
    }
</LoginContext.Consumer>
