import React from "react";
import Loader from "../../../generic/Loader";
import User from "./User";
import { FiUsers } from 'react-icons/fi';


type UserState = {
    isLoading: boolean,
    users: {
        username: string;
        businessRole: string;
        urlAvatar: string;
    }[],
    error: string
}

type PropsType = {
    users: UserState
}

const UsersList: React.FC<PropsType> = ({ users }) => {
    const stateOrData = users.isLoading ? <Loader className={ "lds-ring" }/> : users.users.map((user, index) => {
        return <User key={ index } userData={ user }/>
    })
    return (
        <div className="usersListContainer">
            <div className="header-cate-container">
                <FiUsers className="icon-header-cate-area" />
                <h2 className="title-area">Utilisateurs</h2>
            </div>
            <div className="list-users">{ stateOrData }</div>
        </div>
    );
}

export default UsersList;