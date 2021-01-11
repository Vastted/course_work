import * as constants from '../_constants/index.js';

const success = (message) => ({ type: constants.alert.SUCCESS, message });
const error = (message) => ({ type: constants.alert.ERROR, message });
const clear = () => ({ type: constants.alert.CLEAR });

export const alert = { success, error, clear };
