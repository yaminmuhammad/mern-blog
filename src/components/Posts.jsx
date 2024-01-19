import React, { useState } from "react";

import Thumbnail1 from "../images/blog1.jpg";
import Thumbnail2 from "../images/blog2.jpg";
import Thumbnail3 from "../images/blog3.jpg";
import Thumbnail4 from "../images/blog4.jpg";
import PostItem from "./PostItem";

const DUMMY_POSTS = [
	{
		id: "1",
		thumbnail: Thumbnail1,
		category: "Agriculture",
		title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
		desc: "lorem ipsum dolorLorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elit",
		authorID: 3,
	},
	{
		id: "2",
		thumbnail: Thumbnail2,
		category: "Agriculture",
		title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
		desc: "lorem ipsum dolor",
		authorID: 4,
	},
	{
		id: "3",
		thumbnail: Thumbnail3,
		category: "Agriculture",
		title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
		desc: "lorem ipsum dolor",
		authorID: 2,
	},
	{
		id: "4",
		thumbnail: Thumbnail4,
		category: "Agriculture",
		title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
		desc: "lorem ipsum dolor",
		authorID: 1,
	},
];
const Posts = () => {
	const [posts, setPosts] = useState(DUMMY_POSTS);

	return (
		<section className="posts">
			<div className="container posts__container">
				{posts.map(({ id, thumbnail, category, title, desc, authorID }) => (
					<PostItem
						key={id}
						postID={id}
						thumbnail={thumbnail}
						category={category}
						title={title}
						desc={desc}
						authorID={authorID}
					/>
				))}
			</div>
		</section>
	);
};

export default Posts;
