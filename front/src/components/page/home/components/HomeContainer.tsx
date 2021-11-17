import React, { useEffect, useRef, useState } from "react";
import { connect } from 'react-redux';
import { apiCallPosts, apiCallPostsPerCategory } from "../../../../store/posts/postActions";
import { apiCallUsers } from "../../../../store/users/userActions";
import CategoriesList from './CategoriesList';
import PostsList from "./PostsList";
import UsersList from "./UsersList";

type PostState = {
	isLoading: boolean,
	posts: any[],
	error: string
}

type UserState = {
	isLoading: boolean,
	users: any[],
	error: string
}

type Props = {
	changeHeader: () => void,
	postsApi: () => Promise<void>,
	usersApi: () => Promise<void>,
	postsPerCategory: (idCategory: string) => void;
	posts: PostState,
	users: UserState,
}

const HomeContainer: React.FC<Props> = ({ changeHeader, postsApi, postsPerCategory,
		usersApi, posts, users }) => {
	
	const error = useRef(undefined);
	useEffect(() => {
		Promise.all([usersApi(), postsApi()])
			.then($ => {
				changeHeader();
			})
			.catch((err) => {
				error.current = err.message
			})
	}, [postsApi, usersApi,changeHeader]);

	const postsPerCategoryCall = (category: string) => {
		postsPerCategory(category);
	}
	let categoriesName;
	if (posts.posts) {
		categoriesName = posts.posts.map((post, index) => {
			return post.category_name;
		})	
	}
	
	// traiter la variable d'erreur en affichant une erreur
	return (
		<main className="mainContainer">
			<UsersList users={ users }/>
			<PostsList posts={ posts }/>
			<CategoriesList categories={categoriesName} callPostPerCategory={ postsPerCategoryCall }/>            
		</main>
	)
}

type States = {
	post: PostState,
	user: UserState,
}

const mapStateToProps = (state: States) => {
	return {
		posts: state.post,
		users: state.user,
	}
}

const mapDispatchToProps = (dispatch: (dispatch: any) => Promise<void> ) => {
	return {
		postsPerCategory: (category: string) => dispatch(apiCallPostsPerCategory(category)),
		postsApi: () => dispatch(apiCallPosts()),
		usersApi: () => dispatch(apiCallUsers()),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);