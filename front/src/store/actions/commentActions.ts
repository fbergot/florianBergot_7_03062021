import { commentTypes } from "../types/commentTypes";

type R = { type: string, payload?: string };

export const commentActions = {
    add(): R {
        return {
            type: commentTypes.commentAdd
        }
    },

    delete(): R {
        return {
            type: commentTypes.commentDelete
        }
    }
}