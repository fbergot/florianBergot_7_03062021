import { userTypes } from "../types/userTypes";
import { initialStateUser } from "../initialStates/user";

type R = { type: string; payload?: string };

const userReducer = (state = initialStateUser, action: R) => {
    switch (action.type) {
        // SIGNIN
        case userTypes.signin.SIGNIN:
            break;
        case userTypes.signin.SIGNIN_SUCCESS:
            break;
        case userTypes.signin.SIGNIN_ERROR:
            break;
        
        // SIGNUP
        case userTypes.signup.SIGNUP:
            break;
        case userTypes.signup.SIGNUP_SUCCESS:
            break;
        case userTypes.signup.SIGNUP_ERROR:
            break;
        
        // GET_ALL
        case userTypes.getAll.GET_ALL:
            break;
        case userTypes.getAll.GET_ALL_SUCCESS:
            break;
        case userTypes.getAll.GET_ALL_ERROR:
            break;
        
        // USER_DELETE
        case userTypes.delete.USER_DELETE:
            break;
        case userTypes.delete.USER_SUCCESS:
            break;
        case userTypes.delete.USER_ERROR:
            break;
        
        // ME
        case userTypes.me.ME:
            break;
        case userTypes.me.ME_SUCCESS:
            break;
        case userTypes.me.ME_ERROR:
            break;
    }
}

export default userReducer;