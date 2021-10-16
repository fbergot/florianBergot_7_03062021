import * as http from 'http';
import app from './app';
import * as dotenv from 'dotenv';
import Utils from './class/Utils';

dotenv.config();

const utils = new Utils;
const server = http.createServer(app);
const port = utils.normalizePort(process.env.PORT || 3000);


server.on("listening", () => utils.logHandler(port, server));
server.listen(port);