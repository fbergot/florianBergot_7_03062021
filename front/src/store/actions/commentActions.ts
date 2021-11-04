import { commentTypes } from "../types/commentTypes";

export const commentActions = {
    commentAdd() {
        return {
            type: commentTypes.commentAdd
        }
    },

    commentDelete() {
        return {
            type: commentTypes.commentDelete
        }
    }
}