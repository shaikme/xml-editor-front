import { combineReducers } from 'redux';
import fileListReducer from './fileList';
import filesReduces from './files';
import errorReduces from './error';

export default combineReducers({
	fileList: fileListReducer,
	files: filesReduces,
	error: errorReduces
})