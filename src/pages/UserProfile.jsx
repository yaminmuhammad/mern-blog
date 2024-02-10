import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";

import { UserContext } from "../context/userContext";
import axios from "axios";

const UserProfile = () => {
	const [avatar, setAvatar] = useState("");
	const [previewAvatar, setPreviewAvatar] = useState("");
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [currentPassword, setCurrentPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmNewPassword, setConfirmNewPassword] = useState("");
	const [error, setError] = useState("");

	const [isAvatarClick, setIsAvatarClick] = useState(false);
	const navigate = useNavigate();

	const { currentUser } = useContext(UserContext);
	const token = currentUser?.token;

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
		setPreviewAvatar(`${process.env.REACT_APP_ASSETS_URL}/uploads/${avatar}`); // Set preview avatar saat mendapatkan data pengguna
	};

	useEffect(() => {
		if (!token) {
			navigate("/login");
		}
	}, [token, navigate]);

	useEffect(() => {
		getUser();
	}, [token]);

	const handleAvatarChange = (e) => {
		// Update preview avatar saat memilih gambar
		setAvatar(e.target.files[0]);
		setPreviewAvatar(URL.createObjectURL(e.target.files[0]));
	};

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
			getUser();
		} catch (error) {
			console.log(error);
		}
	};

	const updateUserDetails = async (e) => {
		e.preventDefault();

		try {
			const userData = new FormData();
			userData.set("name", name);
			userData.set("email", email);
			userData.set("currentPassword", currentPassword);
			userData.set("newPassword", newPassword);
			userData.set("confirmNewPassword", confirmNewPassword);

			const response = await axios.patch(`${process.env.REACT_APP_BASE_URL}/users/edit-user`, userData, {
				withCredentials: true,
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			if (response.status === 200) {
				navigate("/logout");
			}
		} catch (error) {
			setError(error.response?.data?.message);
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
							<img src={previewAvatar} alt={""} />
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
							{isAvatarClick && (
								<button type="button" className="profile__avatar-btn" onClick={changeAvatar}>
									<FaCheck />
								</button>
							)}
						</form>
					</div>
					<h1>{currentUser.name}</h1>
					{/* Form to update user details */}
					<form className="form profile__form" onSubmit={updateUserDetails}>
						{error && <p className="form__error-message">{error}</p>}
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
							placeholder="New Password"
							value={newPassword}
							onChange={(e) => setNewPassword(e.target.value)}
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
