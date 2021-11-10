import { USER_GET_ALL, USER_GET_ALL_ERROR, USER_GET_ALL_SUCCESS } from "./userTypes";
import toLocalStorageInst from "../../class/utils/ToLocalStorage";
import toApiInstance from "../../class/appCore/ToAPI";
import { Dispatch } from "redux";

type R = { type: string; payload?: any };

type CallAction<Action> = (data?: any) => Action;

const getAll: CallAction<R> = () => {
        return {
            type: USER_GET_ALL
        }
}
    
const getAllSuccess: CallAction<R> = (posts: []) => {
        return {
            type: USER_GET_ALL_SUCCESS,
            payload: posts
        }
}

const getAllError: CallAction<R> = (errorMessage: string) => {
        return {
            type: USER_GET_ALL_ERROR,
            payload: errorMessage
        }
    }

export const apiCallUsers = () => {
    const userInfos = toLocalStorageInst.getItemAndTransform('user');
    let token: any;

    if (userInfos) {
        token = userInfos.token
    } else {
        console.error('Aucune infos utilisateur (token..)')
    }
    
    return async (dispatch: Dispatch) => {
        dispatch<R>(getAll());
        const res = await toApiInstance.toApi("GET", "users/all", {},
            {
                headers: {
                    'accept': 'application/json',
                    'Authorization' : `Bearer ${token}`
                }
            })
        
        if (typeof res === 'string') {
            dispatch<R>(getAllError(res));
        } else {
            dispatch<R>(getAllSuccess(res.data))
        }

    }
}