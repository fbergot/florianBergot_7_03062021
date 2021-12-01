import { USER_GET_ALL, USER_GET_ALL_ERROR, USER_GET_ALL_SUCCESS } from "./userTypes";
import { Dispatch } from "redux";
import * as dotenv from 'dotenv';
import { APICall } from '../callAPI';

dotenv.config();

type R = { type: string; payload?: any };

type CallAction<Action> = (data?: any) => Action;

/**
 * Build an action
 */
const getAll: CallAction<R> = () => {
	return {
		type: USER_GET_ALL
	}
}
/**
 * Build an action
 */    
const getAllSuccess: CallAction<R> = (posts: []) => {
	return {
		type: USER_GET_ALL_SUCCESS,
		payload: posts
	}
}
/**
 * Build an action
 */
const getAllError: CallAction<R> = (errorMessage: string) => {
	return {
		type: USER_GET_ALL_ERROR,
		payload: errorMessage
	}
}

/**
 * Call API for all users memorized in app
 */
export const apiCallUsers = async (dispatch: Dispatch) => {
	await APICall(process.env.REACT_APP_URI_TO_All_USERS || "", dispatch, [
		getAll,
		getAllSuccess,
		getAllError,
	]);	
}
