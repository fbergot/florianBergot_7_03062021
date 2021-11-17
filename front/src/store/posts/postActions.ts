import {
	POST_GET_ALL,
	POST_GET_ALL_ERROR,
	POST_GET_ALL_SUCCESS,
	POST_GET_ALL_PER_CATEGORY,
	POST_GET_ALL_PER_CATEGORY_SUCCESS,
	POST_GET_ALL_PER_CATEGORY_ERROR
} from "./postTypes";
import toLocalStorageInst from "../../class/utils/ToLocalStorage";
import toApiInstance from "../../class/appCore/ToAPI";
import { Dispatch } from "redux";
import * as dotenv from 'dotenv';

dotenv.config();

type R = { type: string; payload?: any };

type CallAction<Action> = (data?: any) => Action;

const getAll: CallAction<R> = () => {
	return {
		type: POST_GET_ALL
	}
}
	
const getAllSuccess: CallAction<R> = (posts: []) => {
	return {
		type: POST_GET_ALL_SUCCESS,
		payload: posts
	}
}

const getAllError: CallAction<R> = (errorMessage: string) => {
	return {
		type: POST_GET_ALL_ERROR,
		payload: errorMessage
	}
}


export const apiCallPosts = () => {
	const userInfos = toLocalStorageInst.getItemAndTransform('user');
	const uriToApi = process.env.REACT_APP_URI_TO_All_POSTS;
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

// --------- per category
const getAllPostPerCategory: CallAction<R> = () => {
	return {
		type: POST_GET_ALL_PER_CATEGORY
	}
}

const getAllPostPerCategorySuccess: CallAction<R> = (posts: []) => {
	return {
		type: POST_GET_ALL_PER_CATEGORY_SUCCESS,
		payload: posts
	}
}

const getAllPostPerCategoryError: CallAction<R> = (errorMessage: string) => {
	return {
		type: POST_GET_ALL_PER_CATEGORY_ERROR,
		payload: errorMessage
	}
}

// per category
export const apiCallPostsPerCategory = (category: string) => {
	const userInfos = toLocalStorageInst.getItemAndTransform('user');
	const uriToApi = `posts/${category}/all`;

	let token: undefined | string;

	if (userInfos) {
		token = userInfos.token
	} else {
		console.error('Aucune infos utilisateur (token..)')
	}

	return async (dispatch: Dispatch) => {
		dispatch<R>(getAllPostPerCategory());
		const res = await toApiInstance.toApi("GET", uriToApi, {},
			{
				headers: {
					'accept': 'application/json',
					'Authorization' : `Bearer ${ token }`
				}
			}
		)

		if (typeof res === 'string') {
			dispatch<R>(getAllPostPerCategoryError(res));
		} else {
			dispatch<R>(getAllPostPerCategorySuccess(res.data));
		}

	}
}