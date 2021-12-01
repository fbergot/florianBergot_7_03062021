import React, { useEffect, useState } from "react";
import Loader from "../../../generic/Loader";
import User from "./User";
import { FiUsers } from 'react-icons/fi';
import Jwt from '../../../../class/appCore/Jwt';
import toLocalStorageInst from '../../../../class/utils/ToLocalStorage';
import * as dotenv from "dotenv";
import toApiInstance from '../../../../class/appCore/ToAPI';

dotenv.config();

type UserState = {
    isLoading: boolean,
    users: {
        username: string;
        businessRole: string;
        urlAvatar: string;
        email: string;
    }[],
    error: string
}

type PropsType = {
    users: UserState;
    updateUser: () => void;
}

const UsersList: React.FC<PropsType> = ({ users, updateUser }) => {
    const [isAdmin, setIsAdmin] = useState<undefined | boolean>(undefined);
    
    const deleteUserAndUpdate = async (email: string) => {
        try {
            let token: string = '';
            const userInfos: { token: string, id: number } = toLocalStorageInst.getItemAndTransform("user");
            if (userInfos) {
                token = userInfos.token
            } else {
                console.error('Aucune infos utilisateur (token..)')
            }
            // call API for delete account
            await toApiInstance.callApiRefact('DELETE', `users/delete/${email}`, {}, {}, token);
            updateUser();
        } catch (err) {
            console.error(err);
        }
    }

    const stateOrData = users.isLoading ? <Loader className={ "lds-ring" }/> : users.users.map((user, index) => {
        return <User deleteFunc={ deleteUserAndUpdate } erasable={ isAdmin } key={ index } userData={ user }/>
    })

    useEffect(() => {
        const authorizeErase = async () => {
            try {
                const token = toLocalStorageInst.getItemAndTransform('user').token;
                const payloadToken = await Jwt.verify(token, process.env.REACT_APP_SECRET || '', {});
                if (payloadToken.isAdmin) {
                    setIsAdmin(true);
                    return;
                } 
                setIsAdmin(false);
            } catch (err) {
                console.error(err);
                setIsAdmin(false);
            }
        }
        authorizeErase();
    }, []);
    return (
        <div className="usersListContainer">
            <div className="header-cate-container">
                <FiUsers className="icon-header-cate-area" />
                <h2 className="title-area">Utilisateurs</h2>
            </div>
            <div className="list-users">{ users.error ? <p>{ users.error }</p> : stateOrData }</div>
        </div>
    );
}

export default UsersList;