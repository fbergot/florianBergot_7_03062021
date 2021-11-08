import React from "react";
import logo from "../assets/imagesAndIcones/icon/icon-above-font.png";


const Header: React.FC = (props) => {
    return (
        <div>
            <header className="header">
                <img className="headerLogo" src={logo} alt="logo"/>
            </header>
        </div>
    )
}

export default Header;