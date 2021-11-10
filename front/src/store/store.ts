import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import userReducer from './users/userReducer';
import postReducer from './posts/postReducer';
import categoryReducer from './categories/categoryReducer';

const rootReducer = combineReducers({
	post: postReducer,
	user: userReducer,
	category: categoryReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;