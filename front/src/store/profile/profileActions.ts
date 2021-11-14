import { ME_GET_INFOS, ME_GET_INFOS_SUCCESS, ME_GET_INFOS_ERROR } from './profileTypes';
import { Dispatch } from "redux";
import toLocalStorageInst from "../../class/utils/ToLocalStorage";
import toApiInstance from "../../class/appCore/ToAPI";
import * as dotenv from 'dotenv';

dotenv.config();

type R = { type: string; payload?: any };

type CallAction<Action> = (data?: any) => Action;

const getMeInfos: CallAction<R> = () => {
	return {
			type: ME_GET_INFOS
		}
}

const getMeInfosSuccess: CallAction<R> = (infos: any) => {
	return {
		type: ME_GET_INFOS_SUCCESS,
		payload: infos
	}
}

const getMeError: CallAction<R> = (errorMessage: string) => {
		return {
			type: ME_GET_INFOS_ERROR,
			payload: errorMessage
		}
}

export const apiCallCurrentUserInfos = async (dispatch: Dispatch) => {
	const uriToApi = process.env.REACT_APP_URI_TO_ME;
	if (!uriToApi) throw Error('URI to API missing in env var');
	const userInfos = toLocalStorageInst.getItemAndTransform('user');
	let token: any;

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

	if (typeof res === 'string') {
		dispatch(getMeError(res));
	} else {
		dispatch(getMeInfosSuccess(res.data));
	}	
}