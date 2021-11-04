import { postTypes } from "../types/postTypes";

export const postActions = {
    postAdd() {
        return {
            type: postTypes.postAdd
        }
    },

    postDelete() {
        return {
            type: postTypes.postDelete
        }
    },

    postUpdate() {
        return {
            type: postTypes.postUpdate
        }
    },

    postGetAll() {
        return {
            type: postTypes.postGetAll
        }
    }

}