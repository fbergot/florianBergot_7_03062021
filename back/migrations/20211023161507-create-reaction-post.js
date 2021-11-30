'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('ReactionPosts', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			postId: {
				type: Sequelize.INTEGER,
				onDelete: "CASCADE",
				references: {
					model: "Posts",
					key: "id",
					as: "postId"
				},
			},
			reactionId: {
				type: Sequelize.INTEGER,
				onDelete: "CASCADE",
				references: {
					model: "Reactions",
					key: "id",
					as: "reactionId"
				},
				
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			}
		});
  	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('ReactionPosts');
	}
};