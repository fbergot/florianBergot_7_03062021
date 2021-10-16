import * as http from 'http';

export default class Utils {

    normalizePort(val: string | number): number {
        let port: undefined | number;
        if (typeof val === 'string') {
            if (isNaN(parseInt(val, 10))) {
                throw Error(`Invalid port`);
            } else {
                port = parseInt(val, 10);
            }           
        } else {
            port = val;
        }
        if (port && port >= 0) {
          return port;
        }
        throw Error('Invalid port');
    }

    logHandler(port: number, server: http.Server): void {
        const address = server ? server.address() : undefined;
        const bind = typeof address === "string" ? `pipe: ${address}` : `port: ${port ? port : "invalid"}`;
        console.log("listening on " + bind);
    }
}