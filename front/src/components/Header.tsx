import React from "react";
import ProfileInfos from './page/home/components/ProfileInfos';
import logo from "../assets/imagesAndIcones/icon/icon-above-font.svg";
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
				<div className='titleContainer'>
					<h1 className="title">
						Le nouveau réseau social de l'entreprise Groupomania !
						<p>Venez découvrir notre tout nouveau réseau social destiné aux membres de la société</p>			
					</h1>
				</div>

				<div className="container-nav">
					{ headerProfile && <ProfileInfos /> }				
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
				</div>
			</header>
		</div>
    );
}

export default Header;