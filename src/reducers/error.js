import {
	ERROR,
	CLEAR_ERROR
} from '../constants';

export default (errorMessage = null, action) => {
	const { type, error } = action;

	switch (type) {
	case ERROR:
		return error.message;
	case CLEAR_ERROR:
		return null;
	default:
		return errorMessage;
	}
};