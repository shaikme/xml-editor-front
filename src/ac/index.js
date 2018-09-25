import {
	LOAD_FILE_LIST,
	LOAD_XML,
	UPLOAD_XML,
	EDIT_XML,
	TOGGLE_TAG,
	CLEAR_ERROR
} from '../constants';

export const toggleTag = (fileId, tagId) => ({
	type: TOGGLE_TAG,
	playload: { fileId, tagId }
});

export const getFileList = () => ({
	type: LOAD_FILE_LIST,
	callAPI: {
		url: '/xml',
		options: {
			method: 'GET'
		}
	}
});

export const getXml = (id) => ({
	type: LOAD_XML,
	playload: { id },
	callAPI: {
		url: `/xml/${id}`,
		options: {
			method: 'GET'
		}
	}
});

export const uploadXml = (file) => ({
	type: UPLOAD_XML,
	callAPI: {
		url: '/xml',
		options: {
			method: 'POST',
			body: file
		}
	}
});

export const editXml = (id, data) => ({
	type: EDIT_XML,
	playload: { id, data },
	callAPI: {
		headers: {
			'Content-Type': 'application/json'
		},
		url: `/xml/${id}`,
		options: {
			method: 'PATCH',
			body: JSON.stringify(data)
		}
	}
});

export const clearError = () => ({
	type: CLEAR_ERROR
});