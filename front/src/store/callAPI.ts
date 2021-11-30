import toApiInstance from "../class/appCore/ToAPI";
import toLocalStorageInst from "../class/utils/ToLocalStorage";
import { Dispatch } from "redux";

type R = { type: string; payload?: any };

type CallAction<Action> = (data?: any) => Action;

export const APICall = async (path: string, dispatch: any, arrayBuildAction: CallAction<R>[]) => {
	const userInfos = toLocalStorageInst.getItemAndTransform('user');

	let token: undefined | string;

	if (userInfos) {
		token = userInfos.token
	} else {
		console.error('Aucune infos utilisateur (token..)')
	}
	
	
	dispatch(arrayBuildAction[0]());
	const res = await toApiInstance.toApi("GET", path, {},
	{
		headers: {
			'accept': 'application/json',
			'Authorization' : `Bearer ${ token }`
		}
	}
	)
	
	if (typeof res === 'string') {
		dispatch(arrayBuildAction[2](res));
	} else {
		dispatch(arrayBuildAction[1](res.data));
	}			
}