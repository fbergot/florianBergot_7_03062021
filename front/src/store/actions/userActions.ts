import { userTypes } from "../types/userTypes";

type R = { type: string, payload?: string };

export const userActions = {
    // ----- SIGNIN -----
    signin(): R {
        return {
            type: userTypes.signin.SIGNIN
        }
    },

    signinSuccess(): R {
        return {
            type: userTypes.signin.SIGNIN_SUCCESS
        }
    },

    signinError(): R {
        return {
            type: userTypes.signin.SIGNIN_ERROR
        }
    },

    // ----- SIGNUP -----
    signup(): R {
        return {
            type: userTypes.signup.SIGNUP
        }
    },

    signupSuccess(): R {
        return {
            type: userTypes.signup.SIGNUP_SUCCESS
        }
    },

    signupError(): R {
        return {
            type: userTypes.signup.SIGNUP_ERROR
        }
    },

    // ----- GET_ALL -----
    getAll(): R {
        return {
            type: userTypes.getAll.GET_ALL
        }
    },

    getAllSuccess(): R {
        return {
            type: userTypes.getAll.GET_ALL_SUCCESS
        }
    },

    getAllError(): R {
        return {
            type: userTypes.getAll.GET_ALL_ERROR
        }
    },
    // ----- USER_DELETE -----
    delete(): R {
        return {
            type: userTypes.delete.USER_DELETE
        }
    },

    deleteSuccess(): R {
        return {
            type: userTypes.delete.USER_SUCCESS
        }
    },

    deleteError(): R {
        return {
            type: userTypes.delete.USER_ERROR
        }
    },
    // ----- ME -----
    me(): R {
        return {
            type: userTypes.me.ME
        }
    },

    meSuccess(): R {
        return {
            type: userTypes.me.ME_SUCCESS
        }
    },

    meError(): R {
        return {
            type: userTypes.me.ME_ERROR
        }
    },
}