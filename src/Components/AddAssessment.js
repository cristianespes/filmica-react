import React from 'react';


class AddAssessment extends React.Component {
    state = { assessment: '' }
    render() {
        const { assessment } = this.state;
        return (
            <form onSubmit={event => event.preventDefault()}>
                <p><b>Add assessment:</b></p>
                <label>Assessment:
                    <input name='assessment' value={assessment} onChange={this.setAssessment} type="number"/>
                    /100</label>
                <div>
                    <button onClick={this.assesst}>Assess</button>
                    <button onClick={this.props.onCancel}>Cancel</button>
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
        if (value >= 0 && value <= 100) {
            this.setState({ assessment: value })
        }
    }
}

export default AddAssessment;
