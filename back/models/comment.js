'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

    class Comment extends Model {
		static associate({Post, User}) {
			this.belongsTo(User, {
				foreignKey: {
					allowNull: false,
				},
			});
			this.belongsTo(Post, {
				foreignKey: {
					allowNull: false,
				},
			});
		}
	};
	
    Comment.init({
		content: DataTypes.STRING,
		userId: DataTypes.INTEGER,
		postId: DataTypes.INTEGER
    }, {
		sequelize,
		modelName: 'Comment',
    });
	return Comment;
};