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
                <label className='login_field'>
                    User:&nbsp;
                    <input className='login_input' name='user' value={user} onChange={this.update} />
                </label>
                <label className='login_field'>
                    Password:&nbsp;
                    <input className='login_input' name='password' value={password} type='password' onChange={this.update} />
                </label>
                <input className='login_button' type='submit' disabled={ this.state.busy || !this.state.hasChanges } value='Login'/>
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
        if (user.trim().length === 0 || password.trim().length === 0) {
            this.setState({ error: true, hasChanges: false });
            return false;
        }

        return true;
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
    
