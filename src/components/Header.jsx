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
					<img src={Logo} alt="logo" width={60} />
				</Link>
				<ul>
					<li>
						<Link to="/profile"></Link>
					</li>
					<li>
						<Link to="/create"></Link>
					</li>
					<li>
						<Link to="/authors"></Link>
					</li>
					<li>
						<Link to="/logout"></Link>
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
