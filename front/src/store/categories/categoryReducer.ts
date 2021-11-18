import { CATEGORY_GET_ALL, CATEGORY_GET_ALL_SUCCESS, CATEGORY_GET_ALL_ERROR } from "./categoryTypes";

type R = { type: string; payload?: any };

const initialStateCategory = {
    isLoading: false,
    categories: [],
    error: ""
}


const categoryReducer = (state = initialStateCategory, action: R) => {
    switch (action.type) {
        case CATEGORY_GET_ALL:
            return { ...state, isLoading: true };
        case CATEGORY_GET_ALL_SUCCESS:
            return { ...state, isLoading: false, categories: action.payload, error: ""  };
        case CATEGORY_GET_ALL_ERROR:
            return { ...state, isLoading: false, categories: [], error: action.payload  };
        default: return state;
    }
}

export default categoryReducer;