import { CATEGORY_GET_ALL, CATEGORY_GET_ALL_ERROR, CATEGORY_GET_ALL_SUCCESS } from "./categoryTypes";
import toLocalStorageInst from "../../class/utils/ToLocalStorage";
import toApiInstance from "../../class/appCore/ToAPI";

type R = { type: string; payload?: any };



const getAll = (): R => {
        return {
            type: CATEGORY_GET_ALL
        }
}
    
const getAllSuccess = (categories: []): R => {
        return {
            type: CATEGORY_GET_ALL_SUCCESS,
            payload: categories
        }
}

const getAllError = (errorMessage: string): R => {
        return {
            type: CATEGORY_GET_ALL_ERROR,
            payload: errorMessage
        }
    }

export const apiCallCategories = () => {
    const userInfos = toLocalStorageInst.getItemAndTransform('user');
    let token: any;

    if (userInfos) {
        token = userInfos.token
    } else {
        console.error('Aucune infos utilisateur (token..)')
    }
    
    return async (dispatch: any) => {
        dispatch(getAll());
        const res = await toApiInstance.toApi("GET", "categories/all", {},
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