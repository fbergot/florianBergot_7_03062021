import { POST_GET_ALL, POST_GET_ALL_ERROR, POST_GET_ALL_SUCCESS } from "./postTypes";
import toLocalStorageInst from "../../class/utils/ToLocalStorage";
import toApiInstance from "../../class/appCore/ToAPI";

type R = { type: string; payload?: any };



const getAll = (): R => {
        return {
            type: POST_GET_ALL
        }
}
    
const getAllSuccess = (posts: []): R => {
        return {
            type: POST_GET_ALL_SUCCESS,
            payload: posts
        }
}

const getAllError = (errorMessage: string): R => {
        return {
            type: POST_GET_ALL_ERROR,
            payload: errorMessage
        }
    }

export const apiCallPosts = () => {
    const userInfos = toLocalStorageInst.getItemAndTransform('user');
    let token: any;

    if (userInfos) {
        token = userInfos.token
    } else {
        console.error('Aucune infos utilisateur (token..)')
    }

    return async (dispatch: any) => {
        dispatch(getAll());
        const res = await toApiInstance.toApi("GET", "posts/all", {},
            {
                headers: {
                    'accept': 'application/json',
                    'Authorization' : `Bearer ${token}`
                }
            }
        )

        if (typeof res === 'string') {
            dispatch(getAllError(res));
        } else {
            dispatch(getAllSuccess(res.data))
        }

    }
}