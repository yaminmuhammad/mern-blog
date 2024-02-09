import React, { useContext, useEffect, useState } from "react";
import PostAuthor from "../components/PostAuthor";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../context/userContext";
import Loader from "../components/Loader";
import Thumbnail from "../images/blog22.jpg";
import DeletePost from "./DeletePost";
import axios from "axios";

const PostDetail = () => {
	const { id } = useParams();
	const [post, setPost] = useState(null);
	const [creatorID, setCreatorID] = useState(null);
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const { currentUser } = useContext(UserContext);

	useEffect(() => {
		const getPost = async () => {
			setIsLoading(true);
			try {
				const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/${id}`);
				setPost(response?.data);
			} catch (error) {
				setError(error);
			}
		};
	}, []);

	if (isLoading) {
		return <Loader />;
	}

	return (
		<section className="post-detail">
			{error && <p className="form__error-message">{error}</p>}
			{post && (
				<div className="container post-detail__container">
					<div className="post-detail__header">
						{/* <PostAuthor /> */}
						{currentUser?.id == post?.creator && (
							<div className="post-detail__buttons">
								<Link to={"/posts/werwer/edit"} className="btn sm primary">
									Edit
								</Link>
								<DeletePost />
							</div>
						)}
					</div>
					<h1>This is the post title!</h1>
					<div className="post-detail__thumbnail">
						<img src={Thumbnail} alt="thumbnail" />
					</div>
					{/* <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam</p> */}
				</div>
			)}
		</section>
	);
};

export default PostDetail;
