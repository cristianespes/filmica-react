import React from 'react';
import Film from './Film';
import Data from './Data';
import AddAssessment from './AddAssessment';
import AddFavourite from './AddFavourite';

import './Detail.css';

const SAMPLE_FILM = ({
    id: 299537,
    title: 'Captain Marvel',
    poster_path: '/AtsgWhDnHTq68L0lLsUrCnM7TjG.jpg',
    backdrop_path: '/w2PMyoyLU22YvrGK3smVM9fW1jj.jpg',
    overview: 'The story follows Carol Danvers as she becomes one of the universe’s most powerful heroes when Earth is caught in the middle of a galactic war between two alien races. Set in the 1990s, Captain Marvel is an all-new adventure from a previously unseen period in the history of the Marvel Cinematic Universe.',
    release_date: '2019-03-06'
  });

class Detail extends React.Component{

    state = { showingForm: false, isFavourite: false, assessment: '' };

    render() {
        const { assessment } = this.state;
        return (
            <div className='detail'>
                <Film details={SAMPLE_FILM} />
                
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
                        <Data title='Overview' content={SAMPLE_FILM.overview}/>
                    </li>
                    <li key='release' className='dataList__data'>
                        <Data title='Release date' content={SAMPLE_FILM.release_date}/>
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
    }
}

export default Detail;
