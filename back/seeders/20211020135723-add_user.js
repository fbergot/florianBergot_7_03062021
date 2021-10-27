'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert('User',
			[
				{
					email: "florian.bergot564@gmail.com",
					password: "testflo",
					username: "Florian",
					isAdmin: "true",
                    businessRole: "PDG"
				},
				{
					email: "florian.bergot564@gmail",
					password: "testflo",
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
