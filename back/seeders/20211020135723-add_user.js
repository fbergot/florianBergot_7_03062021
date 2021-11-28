'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert('Users',
			[
				{
					email: "florian.bergot564@gmail.com",
					password: "testflo",
					username: "Florian",
					isAdmin: "true",
                    businessRole: "PDG"
				},
				{
					email: "florian.bergot5640@gmail",
					password: "testflo",
					username: "Florence",
					isAdmin: "false",
                    businessRole: "Dev WEB"
				},
			], {});  
  	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('Users', null, {});
	}
};
