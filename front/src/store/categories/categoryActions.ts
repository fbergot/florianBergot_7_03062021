import { CATEGORY_GET_ALL, CATEGORY_GET_ALL_ERROR, CATEGORY_GET_ALL_SUCCESS } from "./categoryTypes";
import { Dispatch } from "redux";
import { APICall } from "../callAPI";
import * as dotenv from 'dotenv';

dotenv.config();

type R = { type: string; payload?: any };

type CallAction<Action> = (data?: any) => Action;
/**
 * Build an action
 */
const getAll: CallAction<R> = () => {
	return {
		type: CATEGORY_GET_ALL
	}
}
/**
 * Build an action
 */    
const getAllSuccess: CallAction<R> = (categories: []) => {
	return {
		type: CATEGORY_GET_ALL_SUCCESS,
		payload: categories
	}
}
/**
 * Build an action
 */
const getAllError: CallAction<R> = (errorMessage: string) => {
	return {
		type: CATEGORY_GET_ALL_ERROR,
		payload: errorMessage
	}
}

export const apiCallCategories = async (dispatch: Dispatch) => {
	await APICall(process.env.REACT_APP_URI_TO_ALL_CATEGORIES || "", dispatch, [
		getAll,
		getAllSuccess,
		getAllError,
	]);
}