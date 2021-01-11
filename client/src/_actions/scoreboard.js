import * as constants from './../_constants/index.js';
import * as services from './../_services/index.js';

function push(values) {
    const request = () => ({ type: constants.scoreboard.PUSH_REQUEST });
    const success = (train) => ({ type: constants.scoreboard.PUSH_SUCCESS, train });
    const failure = (error) => ({ type: constants.scoreboard.PUSH_FAILURE, error });

    return (dispatch) => {
        dispatch(request());

        services.scoreboard.push(values).then(
            (train) => dispatch(success(train)),
            (error) => dispatch(failure(error.toString())),
        );
    };
}

function get() {
    const request = () => ({ type: constants.scoreboard.GET_ALL_REQUEST });
    const success = (trains) => ({ type: constants.scoreboard.GET_ALL_SUCCESS, trains });
    const failure = (error) => ({ type: constants.scoreboard.GET_ALL_FAILURE, error });

    return (dispatch) => {
        dispatch(request());

        services.scoreboard.get().then(
            (trains) => dispatch(success(trains)),
            (error) => dispatch(failure(error.toString())),
        );
    };
}

function update(id, values) {
    const request = (id) => ({ type: constants.scoreboard.UPDATE_REQUEST, id });
    const success = (id, train) => ({ type: constants.scoreboard.UPDATE_SUCCESS, id, train });
    const failure = (id, error) => ({ type: constants.scoreboard.UPDATE_FAILURE, id, error });

    return (dispatch) => {
        dispatch(request(id));

        services.scoreboard.update(id, values).then(
            (train) => dispatch(success(id, train)),
            (error) => dispatch(failure(id, error.toString())),
        );
    };
}

function _delete(_id) {
    const request = (_id) => ({ type: constants.scoreboard.REMOVE_REQUEST, _id });
    const success = (_id) => ({ type: constants.scoreboard.REMOVE_SUCCESS, _id });
    const failure = (_id, error) => ({ type: constants.scoreboard.REMOVE_FAILURE, _id, error });

    return (dispatch) => {
        dispatch(request(_id));

        services.scoreboard.delete(_id).then(
            (train) => dispatch(success(_id)),
            (error) => dispatch(failure(_id, error.toString())),
        );
    };
}

export const scoreboard = { push, get, update, delete: _delete };
