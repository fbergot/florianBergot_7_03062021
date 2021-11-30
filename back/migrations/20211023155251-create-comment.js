'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("Comments", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			content: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			userId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: "Users",
					key: "id",
					as: "userId"
				},
			},
			postId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				onDelete: 'CASCADE',
				references: {
					model: "Posts",
					key: "id",
					as: "postId"
				},
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('Comments');
	}
};