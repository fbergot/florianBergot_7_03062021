import React, { useEffect, useRef } from "react";
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
		
	const error = useRef(undefined);
	useEffect(() => {
			Promise.all([usersApi(), postsApi(), categoriesApi()])
				.then($ => {
					changeHeader();
				})
				.catch((err) => {
					error.current = err.message
				})
			
	}, [postsApi, usersApi, categoriesApi, changeHeader]);

	const postsPerCategoryCall = (idCategory: string) => {
		postsPerCategory(idCategory);
	}
	// traiter la variable d'erreur en affichant une erreur
	return (
		<main className="mainContainer">
			<UsersList users={ users }/>
			<PostsList posts={ posts }/>
			<CategoriesList categories={categories} callPostPerCategory={ postsPerCategoryCall }/>            
		</main>
	)
}

type States = {
	post: PostState,
	user: UserState,
	category: CategoryState
}

const mapStateToProps = (state: States) => {
	return {
		posts: state.post,
		users: state.user,
		categories: state.category
	}
}

const mapDispatchToProps = (dispatch: (dispatch: any) => Promise<void> ) => {
	return {
		postsPerCategory: (idCategory: string) => dispatch(apiCallPostsPerCategory(idCategory)),
		postsApi: () => dispatch(apiCallPosts()),
		usersApi: () => dispatch(apiCallUsers()),
		categoriesApi: () => dispatch(apiCallCategories()),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);