import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import FilmList from './FilmList';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<FilmList />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

// HMR: Hot Module Reloading => Recarga solo las partes que cambian
/*if (module.hot) {
    module.hot.accept()
}*/
