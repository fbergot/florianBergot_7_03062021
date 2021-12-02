import React, { useState } from "react";
import Moment from '../../../../class/appCore/Moment';
import moment from 'moment';
import toLocalStorageInst from '../../../../class/utils/ToLocalStorage';
import toApiInstance from '../../../../class/appCore/ToAPI';
import { useHistory } from 'react-router-dom';

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
    const [error, setError] = useState<string>('');
    const history = useHistory();

    let token: string = '';
    const userInfos: { token: string, id: number } = toLocalStorageInst.getItemAndTransform("user");
    
    if (userInfos) {
        token = userInfos.token
    } else {
        setError("Aucune infos de session");
    }
    // time ago & update moment locale
    Moment.momentLoc();
    const timeAgo = moment(data.createdAt).fromNow(true);
    const imgAvatar = data.urlAvatar ? <img className="img-user-profile" src={data.urlAvatar} alt="avatar" /> : null;

    /**
     * for delete user account
     */
    const deleteHandleClick = async () => {
        // call API for delete account
        const responseApi = await toApiInstance.callApiRefact('DELETE', `users/delete/${data.email}`, {}, {}, token);
        if (typeof responseApi === 'string') {
            setError(responseApi);
            return;
        }
        
        // remove user data in localstor & redirect
        window.localStorage.removeItem('user');
        history.push('/');
    }

    return (
        <section className="section-user-infos">
            {error ? <p>{error}</p> :
                <>
                    <div className="container-profile-userDataHeader">
                        {imgAvatar}
                        <h3>{data.username}</h3>
                    </div>
                    <div className="container-profile-userData">
                        <p>Role dans l'entreprise: <span>{data.businessRole}</span> </p>
                        <p>Email: <span>{data.email}</span></p>
                        <p>Compte crée il y a <span>{timeAgo}</span></p>
                        <p>
                            <button onClick={() => deleteHandleClick()} type="button">Supprimer mon compte</button>
                        </p>
                    </div>
                </>}
        </section>
    );
}

export default UserDataInfos;

