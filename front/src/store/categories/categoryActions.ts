import { CATEGORY_GET_ALL, CATEGORY_GET_ALL_ERROR, CATEGORY_GET_ALL_SUCCESS } from "./categoryTypes";
import { Dispatch } from "redux";
import toLocalStorageInst from "../../class/utils/ToLocalStorage";
import toApiInstance from "../../class/appCore/ToAPI";
import * as dotenv from 'dotenv';

dotenv.config();

type R = { type: string; payload?: any };

type CallAction<Action> = (data?: any) => Action;

const getAll: CallAction<R> = () => {
	return {
		type: CATEGORY_GET_ALL
	}
}
    
const getAllSuccess: CallAction<R> = (categories: []) => {
	return {
		type: CATEGORY_GET_ALL_SUCCESS,
		payload: categories
	}
}

const getAllError: CallAction<R> = (errorMessage: string) => {
	return {
		type: CATEGORY_GET_ALL_ERROR,
		payload: errorMessage
	}
}

export const apiCallCategories = () => {
	const userInfos = toLocalStorageInst.getItemAndTransform('user');
	const uriToApi = process.env.REACT_APP_URI_TO_ALL_CATEGORIES;
	if (!uriToApi) throw Error('URI to API missing in env var');

	let token: undefined | string;

	if (userInfos) {
		token = userInfos.token
	} else {
		console.error('Aucune infos utilisateur (token..)')
	}
	
	return async (dispatch: Dispatch) => {
		dispatch<R>(getAll());
		const res = await toApiInstance.toApi("GET", uriToApi, {},
			{
				headers: {
					'accept': 'application/json',
					'Authorization' : `Bearer ${ token }`
				}
			}
		)

		if (typeof res === 'string') {
			dispatch<R>(getAllError(res));
		} else {
			dispatch<R>(getAllSuccess(res.data))
		}

	}
}