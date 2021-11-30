import {
	POST_GET_ALL,
	POST_GET_ALL_ERROR,
	POST_GET_ALL_SUCCESS,
	POST_GET_ALL_PER_CATEGORY,
	POST_GET_ALL_PER_CATEGORY_SUCCESS,
	POST_GET_ALL_PER_CATEGORY_ERROR
} from "./postTypes";
import { Dispatch } from "redux";
import * as dotenv from 'dotenv';
import { APICall } from '../callAPI';

dotenv.config();

type R = { type: string; payload?: any };

type CallAction<Action> = (data?: any) => Action;


/**
 * Build a action
 */
const getAll: CallAction<R> = () => {
	return {
		type: POST_GET_ALL
	}
}

/**
 * Build a action
 */
const getAllSuccess: CallAction<R> = (posts: []) => {
	return {
		type: POST_GET_ALL_SUCCESS,
		payload: posts
	}
}

/**
 * Build a action
 */
const getAllError: CallAction<R> = (errorMessage: string) => {
	return {
		type: POST_GET_ALL_ERROR,
		payload: errorMessage
	}
}

/**
 * Call API for posts
 */
export const apiCallPosts = async (dispatch: Dispatch) => {
	await APICall(process.env.REACT_APP_URI_TO_All_POSTS || "", dispatch, [
    getAll,
    getAllSuccess,
    getAllError,
  ]);			
}

// --------- posts per category

/**
 * Build a action
 */
const getAllPostPerCategory: CallAction<R> = () => {
	return {
		type: POST_GET_ALL_PER_CATEGORY
	}
}

/**
 * Build a action
 */
const getAllPostPerCategorySuccess: CallAction<R> = (posts: []) => {
	return {
		type: POST_GET_ALL_PER_CATEGORY_SUCCESS,
		payload: posts
	}
}

/**
 * Build a action
 */
const getAllPostPerCategoryError: CallAction<R> = (errorMessage: string) => {
	return {
		type: POST_GET_ALL_PER_CATEGORY_ERROR,
		payload: errorMessage
	}
}

/**
 * Call API for posts per category
 */
export const apiCallPostsPerCategory = async (id_category: string, dispatch: Dispatch) => {
	await APICall(`categories/${id_category}/posts` || "", dispatch, [
		getAllPostPerCategory,
		getAllPostPerCategorySuccess,
		getAllPostPerCategoryError,
	]);
}