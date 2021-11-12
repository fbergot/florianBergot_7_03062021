import React, {useEffect} from "react";
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
	postsApi: () => any,
	usersApi: () => any,
	categoriesApi: () => any,
	posts: PostState,
	users: UserState,
	categories: CategoryState
}

const HomeComponents: React.FC<Props> = ({ postsApi, usersApi, categoriesApi, posts, users, categories }) => {
	useEffect(() => {
		postsApi();
		usersApi();
		categoriesApi();
	}, [postsApi, usersApi, categoriesApi]);

	return (
		<div>
			<UsersList users={ users }/>
			<PostsList posts={ posts }/>
			<CategoriesList categories={ categories }/>            
		</div>
	)
}

type State = {
	post: PostState,
	user: UserState,
	category: CategoryState
}

const mapStateToProps = (state: State) => {
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeComponents);