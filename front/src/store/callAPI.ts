import toApiInstance from "../class/appCore/ToAPI";
import toLocalStorageInst from "../class/utils/ToLocalStorage";

type R = { type: string; payload?: any };

type CallAction<Action> = (data?: any) => Action;

export const APICall = async (path: string, dispatch: (action: R) => void, arrayBuildAction: CallAction<R>[]) => {
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
	// if typeof res == string, it's an error (look toApiInstance.toApi)
	if (typeof res === 'string') {
        // error
		dispatch(arrayBuildAction[2](res));
	} else {
        // success
		dispatch(arrayBuildAction[1](res.data));
	}			
}