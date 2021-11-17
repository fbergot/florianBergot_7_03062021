'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("Posts", {
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
			category_name: {
				type: Sequelize.STRING,
					allowNull: false,
				},	
			userId: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			attachment: {
				type: Sequelize.STRING,
				allowNull: true,
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
      await queryInterface.dropTable('Posts');
    }
};