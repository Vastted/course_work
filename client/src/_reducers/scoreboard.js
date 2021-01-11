import * as constants from './../_constants/index.js';

export function scoreboard(state = {}, action) {
    switch (action.type) {
        case constants.scoreboard.PUSH_REQUEST: {
            const { error, ...copy } = state;
            return { ...copy, pushing: true };
        }
        case constants.scoreboard.PUSH_SUCCESS: {
            const { error, ...copy } = state;
            return { ...copy, trains: [...state.trains, action.train] };
        }
        case constants.scoreboard.PUSH_FAILURE:
            return { ...state, error: action.error };

        case constants.scoreboard.GET_ALL_REQUEST:
            return { ...state, loading: true };
        case constants.scoreboard.GET_ALL_SUCCESS:
            return { ...state, trains: action.trains, loading: false };
        case constants.scoreboard.GET_ALL_FAILURE:
            return { ...state, error: action.error, loading: false };

        case constants.scoreboard.UPDATE_REQUEST:
            return {
                ...state,
                trains: state.trains.map((train) => (train.id === action.id ? { ...train, updating: true } : train)),
            };
        case constants.scoreboard.UPDATE_SUCCESS:
            return {
                ...state,
                trains: state.trains.map((train) => (train.id === action.id ? action.train : train)),
            };
        case constants.scoreboard.UPDATE_FAILURE:
            return {
                ...state,
                trains: state.trains.map((train) => {
                    if (train.id === action.id) {
                        const { updating, ...copy } = train;

                        return { ...copy, updateError: action.error };
                    }

                    return train;
                }),
            };

        case constants.scoreboard.REMOVE_REQUEST:
            return {
                ...state,
                trains: state.trains.map((train) => (train._id === action._id ? { ...train, deleting: true } : train)),
            };
        case constants.scoreboard.REMOVE_SUCCESS:
            return { trains: state.trains.filter((train) => train._id !== action._id) };
        case constants.scoreboard.REMOVE_FAILURE:
            return {
                ...state,
                trains: state.trains.map((train) => {
                    if (train._id === action._id) {
                        const { deleting, ...copy } = train;

                        return { ...copy, deleteError: action.error };
                    }

                    return train;
                }),
            };

        default:
            return state;
    }
}
