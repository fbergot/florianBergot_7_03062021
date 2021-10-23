import * as http from 'http';
import app from './app';
import * as dotenv from 'dotenv';
import utils from './class/Utils';
import { sequelize } from '../models';

dotenv.config();

const server = http.createServer(app);
const port = utils.normalizePort(process.env.PORT || 3000);

server.on("listening", async () => {
    try {
        utils.logHandler(port, server);
        await sequelize.authenticate();
        console.log("Database connected");
    } catch (err: any) {
        console.error(err.message);
    }
});

server.listen(port);