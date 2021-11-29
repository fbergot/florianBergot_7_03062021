import React from "react";
import cardImg from "../../../../assets/imagesAndIcones/icon/icon.png";
import moment from 'moment';
import Moment from "../../../../class/appCore/Moment";

type Props = {
	data: {
        createdAt: string;
        username: string;
        Categories: { name: string }[];
        content: string;
        attachment: string;
    };
    creator: string;
}

const SimplePostProfile: React.FC<Props> = ({ data, creator }) => {
    // time ago & update moment locale
	Moment.momentLoc();
    const timeAgo = moment(data.createdAt).fromNow(true);
	const img = data.attachment ? <img className="card-img" src={ data.attachment } alt="Pièce jointe du post" /> : null;
    return (
		<article className="card-profile">
            <div className="card-body">
                <div className="card-user-identifierCont">
					<div className="container-img-title">
						<img className="card-identifier" src={ cardImg } alt="post identifier" />
						<h3 className="card-title">{ creator }, <span className='card-timeAgo'>il y a { timeAgo }</span></h3>
					</div>

					<div className='container-category-delete'>
						<p className="card-category">Categorie <span className="category-name">{ data.Categories[0].name }</span></p>
					</div>
				</div>

				<p className="card-text">{ data.content }</p>
                { img }
            </div>
		</article>
    );
}

export default SimplePostProfile;