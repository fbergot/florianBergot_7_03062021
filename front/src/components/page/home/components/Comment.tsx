import React from "react";
import moment from 'moment';
import Moment from '../../../../class/appCore/Moment';

type PropsType = {
    commentData: {
        content: string;
        createdAt: string;
        User: {
            username: string;
        }
    }
}

const Comment: React.FC<PropsType> = ({ commentData }) => {
    // time ago & update moment locale
	Moment.momentLoc();
	const timeAgo = moment(commentData.createdAt).fromNow(true);
    return (
        <div className='card-comment'>
            <div className="nameAndTimeAgo-container">
                <p>Par {commentData.User.username}, il y a { timeAgo }</p>                
            </div>
            <p className="comment-content">
                { commentData.content }
            </p>
            
        </div>
    )
}

export default Comment;