import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { apiCallPosts } from "../../../../store/posts/postActions";
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
	posts: PostState,
	users: UserState,
	categories: CategoryState
}

const HomeContainer: React.FC<Props> = ({changeHeader, postsApi, usersApi, categoriesApi, posts, users, categories }) => {
	useEffect(() => {
		Promise.all([usersApi(), postsApi(), categoriesApi()])
			.then($ => {
				changeHeader();
			})
			.catch((err) => {
			})
	}, [postsApi, usersApi, categoriesApi, changeHeader]);

	return (
		<div>
			<UsersList users={ users }/>
			<PostsList posts={ posts }/>
			<CategoriesList categories={ categories }/>            
		</div>
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
		postsApi: () => dispatch(apiCallPosts()),
		usersApi: () => dispatch(apiCallUsers()),
		categoriesApi: () => dispatch(apiCallCategories()),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);