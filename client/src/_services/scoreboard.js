import config from 'config';
import * as helpers from './../_helpers/index.js';

function push(values) {
    const options = {
        method: 'POST',
        headers: { ...helpers.authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
    };

    return fetch(`${config.apiUrl}/api/scoreboard/`, options).then(helpers.handleResponse);
}

function get() {
    const options = { method: 'GET', headers: helpers.authHeader() };

    return fetch(`${config.apiUrl}/api/scoreboard/`, options).then(helpers.handleResponse);
}

function update(id, values) {
    const options = {
        method: 'PATCH',
        headers: { ...helpers.authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
    };

    return fetch(`${config.apiUrl}/api/scoreboard/${id}/`, options).then(helpers.handleResponse);
}

function _delete(id) {
    const options = { method: 'DELETE', headers: helpers.authHeader() };

    return fetch(`${config.apiUrl}/api/scoreboard/${id}/`, options).then(helpers.handleResponse);
}

export const scoreboard = { push, get, update, delete: _delete };
