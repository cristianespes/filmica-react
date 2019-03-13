import React from 'react';
import { Redirect } from 'react-router-dom';

import LoginContext from './LoginContext';
import './Login.css';

const USERS_URL = 'https://randomuser.me/api?seed=abc&results=100';

class Login extends React.Component {
    state = {
        hasChanges: false,
        user: '',
        password: '',
        error: false
    }

    componentDidMount() {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) this.setState({name: `${user.name.first} ${user.name.last}`});
    }

    render() {
        const { name, user, password } = this.state;

        if (name) return <p>Hola {name}</p>
        return (
            <form onSubmit={this.login} className='login'>
                <label>
                    User:&nbsp;
                    <input name='user' value={user} onChange={this.update} />
                </label>
                <label>
                    Password:&nbsp;
                    <input name='password' value={password} type='password' onChange={this.update} />
                </label>
                <input type='submit' disabled={ this.state.busy || !this.state.hasChanges } value='Login'/>
                {
                    this.state.error &&
                    <p>User or password are required</p>
                }
                {
                    this.state.loginError &&
                    <p>User or password invalid</p>
                }
            </form>
        )
    }
    update = event => 
        this.setState({
            error: false,
            loginError: false,
            hasChanges: true,
            [event.target.name]: event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value
        });

    login = async event => {
        event.preventDefault();
        const { user, password } = this.state;

        if (!this.checkLogin(user, password)) { return }

        this.setState({ busy: true });

        const foundUser = await this.validUser(user, password);

        this.setState({ busy: false });

        if (!foundUser) {
            return this.setState({ loginError: true })
        }

        this.props.onSuccess(foundUser);

        this.setState({name: `${foundUser.name.first} ${foundUser.name.last}`});
    };

    checkLogin = (user, password) => {
        // TODO: VALIDAR CADA CAMPO POR SEPARADO
        if (user.trim().length === 0 || password.trim().length === 0) {
            this.setState({ error: true, hasChanges: false });
            return false;
        }

        return true;
    }

    validUser = async (user, password) => {
        const response = await fetch(USERS_URL)
        const { results: users } = await response.json()
        return users.find(candidate =>
            candidate.login.username === user &&
            candidate.login.password === password
        )
    }
}

export default props =>
<LoginContext.Consumer>
    {
        ({login, isLogged}) =>
            isLogged ? 
            <Redirect to='/' />
            :
            <Login onSuccess={login} />
    }
</LoginContext.Consumer>
    
