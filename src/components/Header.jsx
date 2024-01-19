import React from "react";
import { Link } from "react-router-dom";
import Logo from "../images/logo.png";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";

const Header = () => {
	return (
		<nav>
			<div className="container nav__container">
				<Link to="/" className="nav__logo">
					<img src={Logo} alt="logo" />
				</Link>
				<ul className="nav__menu">
					<li>
						<Link to="/profile">Makan</Link>
					</li>
					<li>
						<Link to="/create">Minum</Link>
					</li>
					<li>
						<Link to="/authors">About</Link>
					</li>
					<li>
						<Link to="/logout">Career</Link>
					</li>
				</ul>
				<button className="nav__toggle-btn">
					<AiOutlineClose />
				</button>
			</div>
		</nav>
	);
};

export default Header;
