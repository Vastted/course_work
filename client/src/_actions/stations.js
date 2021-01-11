import * as constants from './../_constants/index.js';
import * as services from './../_services/index.js';

function get() {
    const request = () => ({ type: constants.stations.GET_ID_REQUEST });
    const success = (station) => ({ type: constants.stations.GET_ID_SUCCESS, station });
    const failure = (error) => ({ type: constants.stations.GET_ID_FAILURE, error });

    return (dispatch) => {
        dispatch(request());

        services.stations.get().then(
            (station) => dispatch(success(station)),
            (error) => dispatch(failure(error.toString())),
        );
    };
}

export const stations = { get };
