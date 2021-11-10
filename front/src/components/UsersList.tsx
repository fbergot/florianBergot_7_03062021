import React from "react";


type UserAction = {
    isLoading: boolean,
    users: any[],
    error: string
}

type PropsType = {
    users: UserAction
}

const UsersList: React.FC<PropsType> = () => {
    return (
        <div>
        </div>
    )
}

export default UsersList;