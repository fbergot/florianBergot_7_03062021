import { reactionTypes } from "../types/reactionTypes";

type R = { type: string, payload?: string };

export const reactionActions = {
    add(): R {
        return {
            type: reactionTypes.reactionAdd
        }
    },

}