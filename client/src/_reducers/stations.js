import * as constants from './../_constants/index.js';

export function stations(state = {}, action) {
    switch (action.type) {
        case constants.stations.GET_ID_REQUEST:
            return { ...state, loading: true };
        case constants.stations.GET_ID_SUCCESS:
            return { ...state, details: action.station, loading: false };
        case constants.stations.GET_ID_FAILURE:
            return { ...state, error: action.error, loading: false };

        default:
            return state;
    }
}
