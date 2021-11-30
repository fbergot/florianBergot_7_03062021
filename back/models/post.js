'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

	class Post extends Model {
		static associate({User, Category, Comment, CategoryPost, ReactionPost, Reaction}) {
			this.belongsTo(User, {
				foreignKey: {
					allowNull: false,
				}
			});
			this.belongsToMany(Category, {
				through: "CategoryPost"
			});
			this.hasMany(Comment, {
				onDelete: "cascade"
			});
			this.belongsToMany(Reaction, {
				through: ReactionPost
			});
		}
	};
	
	Post.init({
		content: DataTypes.STRING,
		attachment: DataTypes.STRING
	}, {
		sequelize,
		modelName: 'Post',
	});
	return Post;
};