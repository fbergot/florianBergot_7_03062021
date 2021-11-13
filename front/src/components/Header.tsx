import React from "react";
import ProfileInfos from './page/home/components/ProfileInfos';
import logo from "../assets/imagesAndIcones/icon/icon-above-font.png";

type Props = {
    headerProfile?: boolean;
}

const Header: React.FC<Props> = ({ headerProfile }) => {
    return (
        <div>
            <header className="header">
                <img className="headerLogo" src={ logo } alt="logo" />
                { headerProfile && <ProfileInfos/> }
            </header>
        </div>
    )
}

export default Header;