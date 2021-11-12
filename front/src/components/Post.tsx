import React from "react";

type Props = {
	postData: any
}

const Post: React.FC<Props> = ({ postData }) => {
	console.log(postData);
	const img = postData.attachment ? <img className="card-img-top" src={postData.attachment} alt="Pièce jointe du post" /> : null;
	return (
		<div className="card">
			<div className="card-body">
				<h5 className="card-title">{postData.User.username }</h5>
				<p className="card-text">{ postData.content}</p>
				<p><strong>Categorie : </strong>{ postData.Categories[0].name}</p>
			</div>
			{img}
		</div>
	)
}

export default Post;