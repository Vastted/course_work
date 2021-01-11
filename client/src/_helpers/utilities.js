import * as services from './../_services/index.js';

export const getTime = (value = '') => new Date(Number(value)).toISOString().match(/\d\d:\d\d/)[0];
export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const handleResponse = (response) =>
    response.text().then((text) =>
        sleep(1).then(() => {
            const data = text && JSON.parse(text);

            if (!response.ok) {
                if (response.status === 401) {
                    services.user.logout();
                    location.reload();
                }

                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }

            return data;
        }),
    );
