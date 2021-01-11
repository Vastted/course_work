import config from 'config';
import * as helpers from './../_helpers/index.js';

const STATION_UUID = '8008f01b-3a81-4fd1-88d4-ae832e84eb53';

function get() {
    const options = { method: 'GET', headers: helpers.authHeader() };

    return fetch(`${config.apiUrl}/api/station/${STATION_UUID}/`, options).then(helpers.handleResponse);
}

export const stations = { get };
