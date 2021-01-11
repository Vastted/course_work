import config from 'config';
import * as helpers from './../_helpers/index.js';

function get() {
    const options = { method: 'GET', headers: helpers.authHeader() };

    return fetch(`${config.apiUrl}/api/trains/`, options).then(helpers.handleResponse);
}

export const trains = { get };
