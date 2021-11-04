import { userTypes } from "../types/userTypes";

export const userActions = {
    userSignin() {
        return {
            type: userTypes.userSignin
        }
    },

    userSignup() {
        return {
            type: userTypes.userSignup
        }
    },

    userGetAll() {
        return {
            type: userTypes.userGetAll
        }
    },

    userDelete() {
        return {
            type: userTypes.userDelete
        }
    }
}