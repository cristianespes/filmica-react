import React from 'react';

import './AddAssessment.css';

class AddAssessment extends React.Component {
    state = { assessment: '' }
    render() {
        const { assessment } = this.state;
        return (
            <form className='form' onSubmit={event => event.preventDefault()}>
                <p className='form__title'><b>Add assessment:</b></p>
                <label className='form__label'>Assessment:
                    <input className='form__input' name='assessment' value={assessment} onChange={this.setAssessment} type="number"/>
                    /10</label>
                <div>
                    <button className='form__btn' onClick={this.assesst}>Assess</button>
                    <button className='form__btn' onClick={this.props.onCancel}>Cancel</button>
                </div>
            </form>
        )
    }
    assesst = () => {
        const { assessment } = this.state;
        this.props.onSubmit(assessment);
    }
    setAssessment = event => {
        const value = event.target.value
        if (value >= 0 && value <= 10) {
            this.setState({ assessment: value })
        }
    }
}

export default AddAssessment;
