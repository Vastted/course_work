import * as constants from './../_constants/index.js';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : {};

export function authentication(state = initialState, action) {
    switch (action.type) {
        case constants.user.LOGIN_REQUEST:
            return { loggingIn: true, user: action.user };
        case constants.user.LOGIN_SUCCESS:
            return { loggedIn: true, user: action.user };
        case constants.user.LOGIN_FAILURE:
            return {};

        case constants.user.LOGOUT:
            return {};

        default:
            return state;
    }
}
