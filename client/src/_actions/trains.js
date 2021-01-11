import * as constants from './../_constants/index.js';
import * as services from './../_services/index.js';

function get() {
    const request = () => ({ type: constants.trains.GET_ALL_REQUEST });
    const success = (trains) => ({ type: constants.trains.GET_ALL_SUCCESS, trains });
    const failure = (error) => ({ type: constants.trains.GET_ALL_FAILURE, error });

    return (dispatch) => {
        dispatch(request());

        services.trains.get().then(
            (trains) => dispatch(success(trains)),
            (error) => dispatch(failure(error.toString())),
        );
    };
}

export const trains = { get };
