import { categoryTypes } from "../types/categoryTypes";

type R = { type: string; payload?: string };

export const categoryActions = {
    add(): R {
        return {
            type: categoryTypes.categoryAdd
        }
    },

    getAll(): R {
        return {
            type: categoryTypes.categoryGetAll
        }
    },

    allPosts(): R {
        return {
            type: categoryTypes.categoryAllPosts
        }
    }
}