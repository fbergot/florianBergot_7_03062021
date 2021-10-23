'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

	class User extends Model {
		static associate({Post, Reaction, Comment}) {
			this.hasMany(Post);
			this.hasMany(Comment);
			this.hasMany(Reaction);
		}
	};
	User.init({
		uuid: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4
		},
		username: DataTypes.STRING,
		email: DataTypes.STRING,
		password: DataTypes.STRING,
		isAdmin: DataTypes.BOOLEAN,
		businessRole: DataTypes.STRING,
		urlAvatar: DataTypes.STRING
	}, {
		sequelize,
		modelName: 'User',
	});
	return User;
};