import * as constants from './../_constants/index.js';

export function alert(state = {}, action) {
    switch (action.type) {
        case constants.alert.SUCCESS:
            return { type: 'alert-success', message: action.message };
        case constants.alert.ERROR:
            return { type: 'alert-danger', message: action.message };
        case constants.alert.CLEAR:
            return {};
        default:
            return state;
    }
}
