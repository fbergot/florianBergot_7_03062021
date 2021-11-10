import React from "react";

type PostAction = {
    isLoading: boolean,
    posts: any[],
    error: string
}

type PropsType = {
    posts: PostAction,
}

const PostsList: React.FC<PropsType> = ({posts}) => {
    return (
        <div>
            {JSON.stringify(posts)}
        </div>
    )
}

export default PostsList;