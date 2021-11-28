import * as http from 'http';
import { NextFunction, Request, Response } from 'express';

class Utils {

    /**
     * Normalize port on a number >= 0 from number or string of number
     * @throw if val < 0 or if parseInt(val) === NaN
     * @memberof Utils
     */
    public normalizePort(val: string | number): number {
        let port: undefined | number;
        if (typeof val === 'string') {
            if (isNaN(parseInt(val, 10))) {
                throw Error(`Invalid port: ${val}`);
            } else {
                port = parseInt(val, 10);
            }           
        } else {
            port = val;
        }
        if (port >= 0) {
          return port;
        }
        throw Error(`Invalid port: ${port}`);
    }

    /**
     * Log message in console when event listening is emit
     * @memberof Utils
     */
    public logHandler(port: number, server: http.Server): void {
        const address = server.address();
        const bind = typeof address === "string" ? `pipe: ${address}` : `port: ${port}`;
        console.log("listening on " + bind);
    }

    /**
     * Middleware for add headers CORS
     * @memberof Utils
     */
    public setHeadersCORS(req: Request, res: Response, next: NextFunction): void {
        res.setHeader('Access-Control-Allow-Origin', "*");
        res.setHeader('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
        next();
    }

}

const utils = new Utils;

export default utils;