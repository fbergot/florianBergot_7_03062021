'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

	class ReactionPost extends Model {
		static associate(models) {}
	};
	
	ReactionPost.init({
		postId: DataTypes.INTEGER,
		reactionId: DataTypes.INTEGER
	}, {
		sequelize,
		modelName: 'ReactionPost',
	});
	return ReactionPost;
};