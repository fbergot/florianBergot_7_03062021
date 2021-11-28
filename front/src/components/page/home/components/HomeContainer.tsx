import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { apiCallPosts, apiCallPostsPerCategory } from "../../../../store/posts/postActions";
import { apiCallCategories } from "../../../../store/categories/categoryActions";
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

type CategoryState = {
	isLoading: boolean,
	categories: any[],
	error: string
}

type Props = {
	changeHeader: () => void,
	postsApi: () => Promise<void>,
	usersApi: () => Promise<void>,
	categoriesApi: () => Promise<void>,
	postsPerCategory: (idCategory: string) => void;
	posts: PostState,
	users: UserState,
	categories: CategoryState
}

const HomeContainer: React.FC<Props> = ({ changeHeader, postsApi, postsPerCategory,
		usersApi, categoriesApi, posts, users, categories }) => {
		
	const [error, setError] = useState(null);

	useEffect(() => {
		Promise.all([usersApi(), postsApi(), categoriesApi()])
			.then($ => {
				changeHeader();
			})
			.catch((err) => {
				setError(err.message);
			})			
	}, [postsApi, usersApi, categoriesApi, changeHeader]);

	const postsPerCategoryCall = (idCategory: string) => {
		postsPerCategory(idCategory);
	}

	// update after add post (dispatch actions)
	const update = () => {
		postsApi();
		categoriesApi();
	}

	return (
		<main className="mainContainer">
			{ error && <p>{ error }</p> }
			<UsersList users={ users }/>
			<PostsList posts={ posts } update={ update }/>
			<CategoriesList categories={ categories } callPostPerCategory={ postsPerCategoryCall }/>            
		</main>
	)
}

type States = {
	post: PostState,
	user: UserState,
	category: CategoryState
}

// connection React/Redux (map state in component props)
const mapStateToProps = (state: States) => {
	return {
		posts: state.post,
		users: state.user,
		categories: state.category
	}
}

// connection React/Redux (map dispatch in component props)
const mapDispatchToProps = (dispatch: (dispatch: any) => Promise<void> ) => {
	return {
		postsPerCategory: (idCategory: string) => dispatch(apiCallPostsPerCategory(idCategory)),
		postsApi: () => dispatch(apiCallPosts()),
		usersApi: () => dispatch(apiCallUsers()),
		categoriesApi: () => dispatch(apiCallCategories()),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);