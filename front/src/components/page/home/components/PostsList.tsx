import React from "react";
import Post from "../../../Post";

type PostAction = {
    isLoading: boolean,
    posts: any[],
    error: string
}

type PropsType = {
    posts: PostAction,
}

const PostsList: React.FC<PropsType> = ({ posts }) => {
    const stateOrData = posts.isLoading ? "Chargement..." : posts.posts && posts.posts.map((elem, index) => {
        return <Post key={index} postData={elem}/>
    })
    return (
        <div>
            { stateOrData }
        </div>
    )
}

export default PostsList;