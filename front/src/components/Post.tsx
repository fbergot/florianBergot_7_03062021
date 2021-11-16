import React from "react";
import cardImg from '../assets/imagesAndIcones/icon/icon.png';

type Props = {
	postData: any
}

const Post: React.FC<Props> = ({ postData }) => {
	const img = postData.attachment ? <img className="card-img" src={ postData.attachment } alt="Pièce jointe du post" /> : null;
	return (
		<article className="card">
			<div className="card-body">
				<div className="card-user-identifierCont">
					<img className="card-identifier" src={ cardImg } alt="post identifier" />
					<h3 className="card-title">{postData.User.username}</h3>
				</div>
				<p className="card-text">{postData.content}</p>
				<p>{ postData.createdAt }</p>
				<p className="card-category">Categorie <span className="category-name">{ postData.Categories[0].name }</span></p>
			</div>
			{ img }
		</article>
	)
}

export default Post;