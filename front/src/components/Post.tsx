import React from "react";
import cardImg from '../assets/imagesAndIcones/icon/icon.png';
import moment from 'moment';
import { momentLoc } from '../class/appCore/momentLoc';

type Props = {
	postData: any
}

const Post: React.FC<Props> = ({ postData }) => {
	// update moment locale
	momentLoc();
	const timeAgo = moment(postData.createdAt).fromNow(true);
	const img = postData.attachment ? <img className="card-img" src={ postData.attachment } alt="Pièce jointe du post" /> : null;
	return (
		<article className="card">
			<div className="card-body">
				<div className="card-user-identifierCont">
					<img className="card-identifier" src={ cardImg } alt="post identifier" />
					<h3 className="card-title">{postData.User.username},<span className='card-timeAgo'>il y a { timeAgo }</span></h3>
				</div>
				<p className="card-text">{postData.content}</p>
				
				<p className="card-category">Categorie <span className="category-name">{ postData.category_name }</span></p>
			</div>
			{ img }
		</article>
	)
}

export default Post;