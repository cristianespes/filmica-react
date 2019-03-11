import React from 'react';

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
        if (user) this.setState({isLogged: true});
    }

    render() {
        const { isLogged, user, password } = this.state;

        if (isLogged) return <div />
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

        this.props.onSuccess(foundUser);

        this.setState({isLogged: true});
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
    <Login onSuccess={storeLogin} />;

const storeLogin = user =>
    localStorage.setItem('user', JSON.stringify(user));
