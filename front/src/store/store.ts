import { createStore, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import userReducer from '../store/reducers/userReducer';
import postReducer from '../store/reducers/postReducer';
import commentReducer from '../store/reducers/commentReducer';
import categoryReducer from '../store/reducers/categoryReducer';
import reactionReducer from '../store/reducers/reactionReducer';

const rootReducer = combineReducers({
    user: userReducer,
    post: postReducer,
    comment: commentReducer,
    category: categoryReducer,
    reaction: reactionReducer
})

const store = createStore(rootReducer);

export default store;