import React from 'react';
import { Redirect } from 'react-router-dom';

import LoginContext from './LoginContext';
import './Login.css';

class Login extends React.Component {
    state = {
        hasChanges: false,
        user: '',
        password: '',
        error: false
    }

    render() {
        const { user, password } = this.state;

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

        try {
            void await this.props.onLogin({user, password});
        } catch (loginError) {
            return this.setState({ loginError: true, busy: false })
        } finally {
            //this.setState({ busy: false });
        }
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
        const users = await this.props.findUsers();
        return users.find(candidate =>
            candidate.login.username === user &&
            candidate.login.password === password
        );
    }
}

export default props =>
<LoginContext.Consumer>
    {
        ({ login, isLogged }) =>
            isLogged ? 
            <Redirect to='/' />
            :
            <Login onLogin={login} />
    }
</LoginContext.Consumer>
    
