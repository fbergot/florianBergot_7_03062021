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
const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : "compose";

const enhancer = composeEnhancers(
  applyMiddleware(thunk),
)
 
const store = createStore(rootReducer, enhancer);

export default store;