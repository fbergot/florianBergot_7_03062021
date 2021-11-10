import { USER_GET_ALL, USER_GET_ALL_ERROR, USER_GET_ALL_SUCCESS } from "./userTypes";

type R = { type: string; payload?: any };

const initialStateUser = {
    isLoading: false,
    users: [],
    error: ""
}


const userReducer = (state = initialStateUser, action: R) => {
    switch (action.type) {
        case USER_GET_ALL:
            return { ...state, isLoading: true };
        case USER_GET_ALL_SUCCESS:
            return { ...state, isLoading: false, users: action.payload, error: ""  };
        case USER_GET_ALL_ERROR:
            return { ...state, isLoading: false, users: [], error: action.payload  };
        default: return state;
    }
}

export default userReducer;