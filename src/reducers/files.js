import {
	LOAD_FILE_LIST,
	UPLOAD_XML,
	START,
	FAIL,
	SUCCESS,
	LOAD_XML,
	EDIT_XML,
	TOGGLE_TAG
} from '../constants';
import { fileRecord } from '../store/records';
import { arrToMap, updateDocument } from '../store/utils';
import { Map } from 'immutable';

export default (files = new Map(), action) => {
	const { type, playload, response } = action;

	switch (type) {
	case LOAD_FILE_LIST + SUCCESS:
		return files.merge(arrToMap(response, fileRecord));
	case UPLOAD_XML + SUCCESS:
		return files.set(response.id, fileRecord(response));
	case LOAD_XML + START:
		return files.setIn([playload.id, 'loading'], true);
	case LOAD_XML + FAIL:
		return files
			.setIn([playload.id, 'loading'], false)
			.setIn([playload.id, 'error'], true);
	case LOAD_XML + SUCCESS:
		return files
			.setIn([playload.id, 'loading'], false)
			.setIn([playload.id, 'loaded'], true)
			.setIn([playload.id, 'body'], response.xml);
	case TOGGLE_TAG:
		let closedTags = files.get(playload.fileId).closedTags
		const isTagClosed = closedTags.includes(playload.tagId);

		if (isTagClosed) {
			closedTags = closedTags.filterNot(item => item === playload.tagId);
		} else {
			closedTags = closedTags.push(playload.tagId);
		}

		return files.setIn([playload.fileId, 'closedTags'], closedTags);
	case EDIT_XML + START:
		return files
			.setIn([playload.id, 'uploading'], true);
	case EDIT_XML + FAIL:
		return files
			.setIn([playload.id, 'uploading'], false);
	case EDIT_XML + SUCCESS:
		const newBody = updateDocument(
			files.getIn([playload.id, 'body']),
			playload.data
		);

		return files
			.setIn([playload.id, 'uploading'], false)
			.setIn([playload.id, 'uploaded'], true)
			.setIn([playload.id, 'body'], newBody);
	default:
		return files;
	}
};