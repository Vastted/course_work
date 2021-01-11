import * as constants from './../_constants/index.js';

export function trains(state = {}, action) {
    switch (action.type) {
        case constants.trains.GET_ALL_REQUEST:
            return { ...state, loading: true };
        case constants.trains.GET_ALL_SUCCESS:
            return { ...state, items: action.trains, loading: false };
        case constants.trains.GET_ALL_FAILURE:
            return { ...state, error: action.error, loading: false };

        default:
            return state;
    }
}
