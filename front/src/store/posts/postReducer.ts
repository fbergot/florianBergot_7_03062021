import { POST_GET_ALL, POST_GET_ALL_SUCCESS, POST_GET_ALL_ERROR } from "./postTypes";

type R = { type: string; payload?: any };

const initialStatePost = {
	isLoading: false,
	posts: [],
	error: ""
}


const postReducer = (state = initialStatePost, action: R) => {
	switch (action.type) {
		case POST_GET_ALL:
			return { ...state, isLoading: true };
		case POST_GET_ALL_SUCCESS:
			return { ...state, isLoading: false, posts: action.payload, error: ""  };
		case POST_GET_ALL_ERROR:
			return { ...state, isLoading: false, posts: [], error: action.payload  };
		default: return state;
	}
}

export default postReducer;