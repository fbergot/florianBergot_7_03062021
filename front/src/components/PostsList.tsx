import React from "react";

type PostAction = {
    isLoading: boolean,
    posts: any[],
    error: string
}

type PropsType = {
    posts: PostAction,
}

const PostsList: React.FC<PropsType> = () => {
    return (
        <div>
        </div>
    )
}

export default PostsList;