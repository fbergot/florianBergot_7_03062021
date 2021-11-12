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
    const stateOrData = users.isLoading ? "Chargement..." : users.users.map((user, index) => {
        return <User key={index} userData={user}/>
    })
    return (
        <div>
            { stateOrData }
        </div>
    )
}

export default UsersList;