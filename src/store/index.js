import { createStore, applyMiddleware } from 'redux';
import reducer from '../reducers';
import api from '../middlewares/api';

const middlewares = applyMiddleware(api);

const store = createStore(reducer, middlewares);

export default store;