import React from 'react';

const USERS_URL = 'https://randomuser.me/api?seed=abc&results=100';
const USER = 'angryostrich988';
const PASSWORD = 'r2d2';

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
            <form onSubmit={this.login}>
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

        this.props.onLogin(foundUser);
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

export default Login;
