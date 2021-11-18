import React from "react";
import Comment from './Comment';

type PropsType = {
    allComments: any[];
}

const CommentsList: React.FC<PropsType> = ({ allComments }) => {
    return (
        <div className="global-comments-container">
            <div className='comment-container'>
                {
                    allComments.map((comment, index) => {
                        return <Comment key={ index } commentData={ comment }/>
                    })
                }
            </div>
        </div>
    )
}

export default CommentsList;