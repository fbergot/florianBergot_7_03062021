import React from "react";
import Moment from '../../../../class/appCore/Moment';
import moment from 'moment';
import toLocaleStorageInst from '../../../../class/utils/ToLocalStorage';
import toApiInstance from '../../../../class/appCore/ToAPI';

type Props = {
    data: {
        businessRole: string;
        createdAt: string;
        email: string;
        urlAvatar?: string;
        username: string;
    };
}


const UserDataInfos: React.FC<Props> = ({ data }) => {
    let token: string = '';
	const userInfos: { token: string, id: number } = toLocaleStorageInst.getItemAndTransform("user");
    if (userInfos) {
		token = userInfos.token
	} else {
		console.error('Aucune infos utilisateur (token..)')
	}
    // time ago & update moment locale
	Moment.momentLoc();
	const timeAgo = moment(data.createdAt).fromNow(true);
    const imgAvatar = data.urlAvatar ? <img className="img-user-profile" src={data.urlAvatar} alt="avatar" /> : null;

    /**
     * for update profile data
     */
    const updateHandleClick = () => {
        alert("hello")
    }

    /**
     * for delete user account
     */
    const deleteHandleClick = async () => {
        // call API for delete account
        const responseApi = await toApiInstance.callApiRefact('DELETE', `users/delete/${ data.email }`, {}, {}, token);
        window.localStorage.removeItem('user');
        if (typeof responseApi === 'string') {
            console.error("Une erreur s'est produite lors de la suppression du compte");
        }

        window.location.assign('/');
    }

    return (
        <div className="r">
            <div className="container-profile-userDataHeader">
                { imgAvatar }
                <h3>{ data.username }</h3>
            </div>
            <p>Role dans l'entreprise: { data.businessRole }</p>	
            <p>Email: { data.email }</p>
            <p>Compte crée il y a { timeAgo }</p>
            <p>
                <button onClick={() => updateHandleClick()} type="button">Modifier les informations du profile</button>
                <button onClick={() => deleteHandleClick()} type="button">Supprimer mon compte</button>
            </p>
		</div>
    );
}

export default UserDataInfos;

