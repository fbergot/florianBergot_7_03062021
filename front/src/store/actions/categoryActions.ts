import { categoryTypes } from "../types/categoryTypes";

export const categoryActions = {
    categoryAdd() {
        return {
            type: categoryTypes.categoryAdd
        }
    },

    categoryGetAll() {
        return {
            type: categoryTypes.categoryGetAll
        }
    },

    categoryAllPosts() {
        return {
            type: categoryTypes.categoryAllPosts
        }
    }
}