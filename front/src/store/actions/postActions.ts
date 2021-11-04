import { postTypes } from "../types/postTypes";

type R = { type: string; payload?: string };

export const postActions = {
    add(): R {
        return {
            type: postTypes.postAdd
        }
    },

    delete(): R {
        return {
            type: postTypes.postDelete
        }
    },

    update(): R {
        return {
            type: postTypes.postUpdate
        }
    },

    getAll(): R {
        return {
            type: postTypes.postGetAll
        }
    }

}