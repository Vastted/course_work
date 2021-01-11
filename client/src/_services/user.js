import config from 'config';
import * as helpers from './../_helpers/index.js';

function login(username, password) {
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    };

    return fetch(`${config.apiUrl}/api/users/authenticate/`, options)
        .then(helpers.handleResponse)
        .then((user) => {
            localStorage.setItem('user', JSON.stringify(user));

            return user;
        });
}

function logout() {
    localStorage.removeItem('user');
}

export const user = { login, logout };
