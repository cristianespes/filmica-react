import React from 'react';

import './SearchBar.css';

class SearchBar extends React.Component {
    state = {
        hasChanges: false,
        query: '',
        error: false
    }
    render() {
        const { query} = this.state;
        return (
            <form className='search' onSubmit={this.search}>
                <label className='search__label'>
                    Search movie:&nbsp;
                    <input className='search__query' name='query' value={query} onChange={this.update} />
                </label>
                <input className='search__button' type='submit' disabled={ !this.state.hasChanges } value='Search'/>
                {
                    this.state.error &&
                    <p>Search must contain 3 or more characters.</p>
                }
            </form>
        )
    }
    update = event => 
        this.setState({
            error: false,
            hasChanges: true,
            [event.target.name]: event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value
        });

    checkQuery = (query) => {
        if (query.trim().length < 3) {
            this.setState({ error: true, hasChanges: false });
            return false;
        }

        return true;
    }

    search = async event => {
        event.preventDefault();
        const { query } = this.state;

        if (!this.checkQuery(query)) { return }

        this.props.render(query);
    };
}

export default SearchBar;