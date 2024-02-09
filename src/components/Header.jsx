import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../images/logo.png";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";

const Header = () => {
	const [isNavShowing, setIsNavShowing] = useState(window.innerWidth > 800 ? true : false);

	const closeNavbarHandler = () => {
		if (window.innerWidth < 800) {
			setIsNavShowing(false);
		} else {
			setIsNavShowing(true);
		}
	};

	return (
		<nav>
			<div className="container nav__container">
				<Link to="/" className="nav__logo" onClick={closeNavbarHandler}>
					<img src={Logo} alt="logo" />
				</Link>
				{isNavShowing && (
					<ul className="nav__menu">
						<li>
							<Link to="/profile/sdfsdf" onClick={closeNavbarHandler}>
								Profile
							</Link>
						</li>
						<li>
							<Link to="/create" onClick={closeNavbarHandler}>
								Create Post
							</Link>
						</li>
						<li>
							<Link to="/authors" onClick={closeNavbarHandler}>
								Authors
							</Link>
						</li>
						<li>
							<Link to="/logout" onClick={closeNavbarHandler}>
								Logout
							</Link>
						</li>
					</ul>
				)}
				<button className="nav__toggle-btn" onClick={() => setIsNavShowing(!isNavShowing)}>
					{isNavShowing ? <AiOutlineClose /> : <FaBars />}
				</button>
			</div>
		</nav>
	);
};

export default Header;
