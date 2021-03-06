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
				foreignKey: "PostId",
				as: "postId",
				onDelete: "cascade"
			});
		}
	};
	
    Comment.init({
		content: DataTypes.STRING,
    }, {
		sequelize,
		modelName: 'Comment',
    });
	return Comment;
};