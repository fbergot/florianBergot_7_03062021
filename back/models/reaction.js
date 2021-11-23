'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

	class Reaction extends Model {
		static associate({Post, User, ReactionPost}) {
			this.belongsTo(User, {
			  foreignKey: {
					allowNull: false,         
				}
		  });
		  this.belongsToMany(Post, {
			  through: ReactionPost,
			  onDelete: 'CASCADE'
		  });
		}
	};
	
	Reaction.init({
		userId: DataTypes.INTEGER,
		likeOrDislike: DataTypes.STRING
	}, {
		sequelize,
		modelName: 'Reaction',
	});
	return Reaction;
};