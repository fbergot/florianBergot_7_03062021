import { ME_GET_INFOS, ME_GET_INFOS_SUCCESS, ME_GET_INFOS_ERROR } from './profileTypes';
import { Dispatch } from "redux";
import toLocalStorageInst from "../../class/utils/ToLocalStorage";
import toApiInstance from "../../class/appCore/ToAPI";
import * as dotenv from 'dotenv';

dotenv.config();

type R = { type: string; payload?: any };

type CallAction<Action> = (data?: any) => Action;

/**
 * Build a action
 */
const getMeInfos: CallAction<R> = () => {
	return {
			type: ME_GET_INFOS
		}
}

/**
 * Build a action
 */
const getMeInfosSuccess: CallAction<R> = (infos: any) => {
	return {
		type: ME_GET_INFOS_SUCCESS,
		payload: infos
	}
}

/**
 * Build a action
 */
const getMeError: CallAction<R> = (errorMessage: string) => {
	return {
		type: ME_GET_INFOS_ERROR,
		payload: errorMessage
	}
}

/**
 * Call API 
 */
export const apiCallCurrentUserInfos = async (dispatch: Dispatch) => {
	// get path to API (/me)
	const uriToApi = process.env.REACT_APP_URI_TO_ME;
	if (!uriToApi) throw Error('URI to API missing in env var');
	// get token in localStor
	const userInfos = toLocalStorageInst.getItemAndTransform('user');
	let token: undefined | string;

	if (userInfos) {
		token = userInfos.token
	} else {
		console.error('Aucune infos utilisateur (token..)')
	}
	
	dispatch(getMeInfos());
	const res = await toApiInstance.toApi("GET", uriToApi, {},
		{
			headers: {
				'accept': 'application/json',
				'Authorization' : `Bearer ${ token }`
			}
		}
	)

	// if error, typeof res === "string"
	if (typeof res === 'string') {
		dispatch(getMeError(res));
	} else {
		dispatch(getMeInfosSuccess(res.data));
	}	
}