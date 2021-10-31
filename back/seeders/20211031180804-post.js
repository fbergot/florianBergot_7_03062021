'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert('Post',
			[
				{
					UserId: 1,
					content: "ceci est mon contenu post 1",
				},
				{
					UserId: 2,
					content: "ceci est mon contenu post 2",
				},
				{
					UserId: 1,
					content: "ceci est mon autre contenu post 3",
				},
				{
					UserId: 2,
					content: "ceci est mon contenu post 4",
				},
			], {});  
  	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('Posts', null, {});
	}
};
