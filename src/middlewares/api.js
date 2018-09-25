import { START, SUCCESS, FAIL, ERROR } from '../constants';

export default (store) => (next) => (action) => {
	const { callAPI, type, ...rest } = action;

	if (!callAPI) return next(action);

	const { url , options, headers } = callAPI;

	const fetctOptions = {
		headers: new Headers({
			'Accept': 'application/json',
			...headers
		}),
		...options
	};

	next({
	  ...rest,
	  type: type + START
	});

	fetch(`https://xml-server.herokuapp.com${url}`, fetctOptions)
	  	.then((response) => response.json().then((json) => response.ok ? json : Promise.reject(json)))
	  	.then((response) => next({ ...rest, type: type + SUCCESS, response }))
	  	.catch((error) => {
			store.dispatch({ type: ERROR, error })
			next({ ...rest, type: type + FAIL, error})
		})
};
