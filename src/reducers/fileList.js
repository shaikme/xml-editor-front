import {
	START,
	FAIL,
	SUCCESS,
	LOAD_FILE_LIST,
	UPLOAD_XML
} from '../constants';
import { fileListRecord } from '../store/records';
import { List } from 'immutable';

export default (fileList = fileListRecord(), action) => {
	const { type, response } = action;

	switch (type) {
	case LOAD_FILE_LIST + START:
		return fileList.set('loading', true);
	case LOAD_FILE_LIST + FAIL:
		return fileList
			.set('loading', false)
			.set('error', true);
	case LOAD_FILE_LIST + SUCCESS:
		return fileList
			.set('loading', false)
			.set('loaded', true)
			.set('items', new List(response));
	case UPLOAD_XML + START:
		return fileList.set('uploading', true);
	case UPLOAD_XML + FAIL:
		return fileList.set('uploading', false);
	case UPLOAD_XML + SUCCESS:
		return fileList
			.set('uploading', false)
			.set('uploaded', true)
			.update('items', (items) => items.push(response));
	default:
		return fileList;
	}
};