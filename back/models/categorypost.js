'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class CategoryPost extends Model {
		static associate(models) {}
	};
	CategoryPost.init({
		postId: DataTypes.INTEGER,
		categoryId: DataTypes.INTEGER
	}, {
		sequelize,
		modelName: 'CategoryPost',
	});
	return CategoryPost;
};