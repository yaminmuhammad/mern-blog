import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";

import { UserContext } from "../context/userContext";
import axios from "axios";

const UserProfile = () => {
	const [avatar, setAvatar] = useState("");
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [currentPassword, setCurrentPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmNewPassword, setConfirmNewPassword] = useState("");

	const [isAvatarClick, setIsAvatarClick] = useState(false);
	const navigate = useNavigate();

	const { currentUser } = useContext(UserContext);
	const token = currentUser?.token;

	useEffect(() => {
		if (!token) {
			navigate("/login");
		}
	}, []);

	useEffect(() => {
		const getUser = async () => {
			const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/users/${currentUser?.id}`, {
				withCredentials: true,
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			const { name, email, avatar } = response?.data;
			setName(name);
			setEmail(email);
			setAvatar(avatar);
		};
		getUser();
	}, []);

	const changeAvatar = async () => {
		setIsAvatarClick(false);
		try {
			const postData = new FormData();
			postData.set("avatar", avatar);
			const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/change-avatar`, postData, {
				withCredentials: true,
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			setAvatar(response.data.avatar);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<section className="profile">
			<div className="container profile__container">
				<Link to={`/myposts/${currentUser?.id}`} className="btn">
					My Posts
				</Link>
				<div className="profile__details">
					<div className="avatar__wrapper">
						<div className="profile__avatar">
							<img src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${avatar}`} alt={""} />
						</div>
						{/* Form Update Avatar */}
						<form className="avatar__form">
							<input
								type="file"
								name="avatar"
								onChange={(e) => setAvatar(e.target.files[0])}
								id="avatar"
								accept="png, jpg, jpeg"
							/>
							<label htmlFor="avatar" onClick={() => setIsAvatarClick(true)}>
								<FaEdit />
							</label>
						</form>
						{isAvatarClick && (
							<button className="profile__avatar-btn" onClick={changeAvatar}>
								<FaCheck />
							</button>
						)}
					</div>
					<h1>{currentUser.name}</h1>
					{/* Form to update user details */}
					<form className="form profile__form">
						<p className="form__error-message">This is an Error Message</p>
						<input
							type="text"
							placeholder="Full Name"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
						<input
							type="email"
							placeholder="Email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<input
							type="password"
							placeholder="Current Password"
							value={currentPassword}
							onChange={(e) => setCurrentPassword(e.target.value)}
						/>
						<input
							type="password"
							placeholder="Cofirm New Password"
							value={confirmNewPassword}
							onChange={(e) => setConfirmNewPassword(e.target.value)}
						/>
						<button type="submit" className="btn primary">
							Update Details
						</button>
					</form>
				</div>
			</div>
		</section>
	);
};

export default UserProfile;
