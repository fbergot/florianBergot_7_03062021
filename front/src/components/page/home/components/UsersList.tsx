import React from "react";
import Loader from "../../../generic/Loader";
import User from "./User";
import { FiUsers } from 'react-icons/fi';


type UserState = {
    isLoading: boolean,
    users: any[],
    error: string
}

type PropsType = {
    users: UserState
}

const UsersList: React.FC<PropsType> = ({ users }) => {
    console.log(users);
    const stateOrData = users.isLoading ? <Loader/> : users.users.map((user, index) => {
        return <User key={ index } userData={ user }/>
    })
    return (
        <div className="usersListContainer">
            <div className="header-cate-container">
                <FiUsers className="icon-header-cate-area" />
                <h2 className="title-area">Tous nos utilisateurs</h2>
            </div>
            <div className="list-users">{stateOrData}</div>
        </div>
    );
}

export default UsersList;