import * as actions from './index.js';
import * as constants from './../_constants/index.js';
import * as services from './../_services/index.js';
import * as helpers from './../_helpers/index.js';

function login(username, password) {
    const request = (user) => ({ type: constants.user.LOGIN_REQUEST, user });
    const success = (user) => ({ type: constants.user.LOGIN_SUCCESS, user });
    const failure = (error) => ({ type: constants.user.LOGIN_FAILURE, error });

    return (dispatch) => {
        dispatch(request({ username }));

        services.user.login(username, password).then(
            (user) => {
                dispatch(success(user));
                helpers.history.push('/admin');
            },
            (error) => {
                dispatch(failure(error.toString()));
                dispatch(actions.alert.error(error.toString()));
            },
        );
    };
}

function logout() {
    services.user.logout();
    return { type: constants.user.LOGOUT };
}

export const user = { login, logout };
