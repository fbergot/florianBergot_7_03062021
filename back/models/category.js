'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

	class Category extends Model {
		static associate({Post, CategoryPost}) {
			this.belongsToMany(Post, {
				through: CategoryPost
			});
		}
	};
	Category.init({
		name: DataTypes.STRING
	}, {
		sequelize,
		modelName: 'Category',
	});
	return Category;
};