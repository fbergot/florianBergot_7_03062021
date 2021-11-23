import React from "react";
import ProfileInfos from './page/home/components/ProfileInfos';
import logo from "../assets/imagesAndIcones/icon/icon-above-font.svg";
import { Link } from "react-router-dom";
import { BsFillHouseDoorFill, BsFillChatTextFill, BsBoxArrowInRight, BsFillPersonFill } from "react-icons/bs";

type Props = {
    headerProfile?: boolean;
}

const Header: React.FC<Props> = ({ headerProfile }) => {
    return (
		<div>
			<header className="header">
				<img className="headerLogo" src={ logo } alt="logo" />
				<div className='titleContainer'>
					<h1 className="title">
						Le nouveau réseau social de l'entreprise Groupomania !
						<p>Venez découvrir le tout nouveau petit réseau social destiné aux membres de la société</p>			
					</h1>
				</div>

				<div className="container-nav">
					{ headerProfile && <ProfileInfos /> }				
					<nav className="headerNav">
						<Link className="linkNavbar" to="/">
							<BsFillHouseDoorFill />
						</Link>

						<Link className="linkNavbar" to="/createPost">
							<BsFillChatTextFill />
						</Link>

						<Link className="linkNavbar" to="/profile">
							<BsFillPersonFill />
						</Link>

						<Link className="linkNavbar" to="/out">
							<BsBoxArrowInRight />
						</Link>
					</nav>
				</div>
			</header>
		</div>
    );
}

export default Header;