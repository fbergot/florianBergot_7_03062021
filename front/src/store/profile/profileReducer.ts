import { ME_GET_INFOS, ME_GET_INFOS_SUCCESS, ME_GET_INFOS_ERROR } from "./profileTypes";

type R = { type: string; payload?: any };

const initialStateProfile = {
	isLoading: false,
	infos: [],
	error: ""
}


const profileReducer = (state = initialStateProfile, action: R) => {
	switch (action.type) {
		case ME_GET_INFOS:
			return { ...state, isLoading: true };
		case ME_GET_INFOS_SUCCESS:
			return { ...state, isLoading: false, infos: action.payload, error: ""  };
		case ME_GET_INFOS_ERROR:
			return { ...state, isLoading: false, infos: [], error: action.payload  };
		default: return state;
	}
}

export default profileReducer;