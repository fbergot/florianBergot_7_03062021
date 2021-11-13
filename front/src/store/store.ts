import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import userReducer from './users/userReducer';
import postReducer from './posts/postReducer';
import categoryReducer from './categories/categoryReducer';
import profileReducer from './profile/profileReducer';

const rootReducer = combineReducers({
	post: postReducer,
	user: userReducer,
	category: categoryReducer,
	profileInfos: profileReducer
})

// ** for redux devtools **

// const composeEnhancers =
//     typeof window === 'object' &&
//     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
//       window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
// Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
// }) : "compose";

// const enhancer = composeEnhancers(
//   applyMiddleware(thunk),
// )
 
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;