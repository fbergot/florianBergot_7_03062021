import React from "react";
import ProfileInfos from './page/home/components/ProfileInfos';
import logo from "../assets/imagesAndIcones/icon/icon-left-font-monochrome-white.svg";
import { Link } from "react-router-dom";
import { BsFillHouseDoorFill, BsBoxArrowInRight, BsFillPersonFill } from "react-icons/bs";
import { useHistory } from "react-router-dom";

type Props = {
    headerProfile?: boolean;
}



const Header: React.FC<Props> = ({ headerProfile }) => {
	const history = useHistory();
	const handleDisconnect = () => {
		window.localStorage.removeItem("user");
    	history.push("/");
	}
    return (
		<div>
			<header className="header">
				<img className="headerLogo" src={ logo } alt="logo" />
				<h1 className="title">Groupomania, le réseau social</h1>
				<div className="container-nav">
									
					<nav className="headerNav">
						<Link className="linkNavbar" to="/">
							<BsFillHouseDoorFill />
						</Link>

						<Link className="linkNavbar" to="/profile">
							<BsFillPersonFill />
						</Link>

						<button onClick={() => handleDisconnect()}>
							<BsBoxArrowInRight />
						</button>
					</nav>
					{ headerProfile && <ProfileInfos /> }
				</div>
			</header>
		</div>
    );
}

export default Header;