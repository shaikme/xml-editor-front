import { Record, List } from 'immutable';

export const fileRecord = Record({
	loading: false,
	loaded: false,
	error: false,
	uploading: false,
	uploaded: false,
	id: null,
	name: null,
	body: null,
	closedTags: List()
});

export const fileListRecord = Record({
	uploading: false,
	uploaded: false,
	error: false,
	loaded: false,
	loading: false,
	items: List()
});
