import React from "react";
import User from "./User";


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
    const stateOrData = users.isLoading ? "Chargement..." : users.users.map((user, index) => {
        return <User key={ index } userData={ user }/>
    })
    return (
      <div className="usersListContainer">
            <h2 className="title-area">Tous nos utilisateurs</h2>
            <div className="list-users">
                {stateOrData}
            </div>
      </div>
    );
}

export default UsersList;