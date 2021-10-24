const dotenv = require('dotenv');

dotenv.config();

const port = process.env.DB_PORT;
const user = process.env.DB_USER;
const pass = process.env.DB_PASS;
const host = process.env.DB_HOST;
const sgbd = process.env.DB_DIALECT;

module.exports = {
	"development": {
		"username": user,
		"password": pass,
		"database": process.env.DB_NAME_DEV,
		"host": host,
		"dialect": sgbd,
		"port": port
	},
	"test": {
		"username": user,
		"password": pass,
		"database": process.env.DB_NAME_TEST,
		"host": host,
		"dialect": sgbd,
		"port": port
	},
	"production": {
		"username": user,
		"password": pass,
		"database": process.env.DB_NAME_PROD,
		"host": host,
		"dialect": sgbd,
		"port": port
	}
}
