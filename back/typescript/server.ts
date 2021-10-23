import * as http from 'http';
import * as dotenv from 'dotenv';
import app from './app';
import utils from './class/Utils';
import { sequelize } from '../models';

dotenv.config();

const server = http.createServer(app);
const port = utils.normalizePort(process.env.PORT || 3000);

server.on("listening", async () => {
    const mLog = {
        ok: "Database connected",
        notOk: "Database connection failed",
    };
    try {
        utils.logHandler(port, server);
        await sequelize.authenticate();
        console.log(mLog.ok);
    } catch (err) {
        console.log(mLog.notOk);
    }
});

server.listen(port);