import React from "react";
import Loader from "../../../generic/Loader";
import UserDataInfos from "./UserDataInfos";
import { FiUsers } from "react-icons/fi";

type Props = {
    data: {
        isLoading: boolean;
        infos: any;
    };
}

const UserData: React.FC<Props> = ({ data }) => {
    return (
        <div className="userData-container">
            <div className="container-header-userData-profile">
                <div className="header-userData-profile">
                    <FiUsers className="icon-header-cate-area" />
                    <h2 className="title-area-profile">Informations du profil</h2>
                </div>
            </div>
            { data.isLoading ? <Loader className={"lds-ring-color"} /> :
                <UserDataInfos data={ data.infos }/> }			
		</div>
    );
}

export default UserData;