import { ME_GET_INFOS, ME_GET_INFOS_SUCCESS, ME_GET_INFOS_ERROR } from './profileTypes';
import { Dispatch } from "redux";
import { APICall } from '../callAPI';
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
	await APICall(process.env.REACT_APP_URI_TO_ME || "", dispatch, [
		getMeInfos,
		getMeInfosSuccess,
		getMeError,
	]);	
}