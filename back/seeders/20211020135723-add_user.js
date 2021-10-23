'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert('User',
			[
				{
					email: "flor@test.com",
					password: "password1654684",
					username: "Florian",
					isAdmin: "true",
                    businessRole: "PDG"
				},
				{
					email: "flor@testing22.com",
					password: "pas54684",
					username: "Florence",
					isAdmin: "false",
                    businessRole: "PDG"
				},
			], {});  
  	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('User', null, {});
	}
};
