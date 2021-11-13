import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import toLocalStorageInst from "../../../../class/utils/ToLocalStorage";

type StorageObject = {
    username: string;
}

type User = {
    username: string;
}

const ProfileInfos: React.FC = () => {
    // get user state in store
    const usersInfos = useSelector(states => states.user);
    // get current user infos in localStor
    const userCurrentUsername = useRef<StorageObject | undefined>(undefined);

    useEffect(() => {
        userCurrentUsername.current = toLocalStorageInst.getItemAndTransform('user');
    }, []);

    const username = userCurrentUsername.current ? userCurrentUsername.current.username : null;
    const infosCurrentUser = usersInfos.users.find((user: User) => {
        return user.username === username;
    })
    console.log(infosCurrentUser);
    return (
        <div>
            <Link to="/profile">
                <p>ProfileInfos</p>
                <p>{infosCurrentUser && infosCurrentUser.username}</p>
                { infosCurrentUser && <img src={infosCurrentUser.urlAvatar} alt="avatar" /> }
            </Link>
        </div>
    )
}

export default ProfileInfos;