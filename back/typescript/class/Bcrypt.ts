import * as bcrypt from "bcrypt";

type ModBcrypt = typeof bcrypt;

/**
 * For all bcrypt operation
 * @export
 * @class Bcrypt
 */
export class Bcrypt {

    private bcryptModule:  ModBcrypt;

    /**
     *Creates an instance of Bcrypt.
     * @memberof Bcrypt
     */
    constructor(module: ModBcrypt ) {
        this.bcryptModule = module;
    }

    /**
     * Hash data
     * @memberof Bcrypt
     */
    public async bcryptHash(data: string | Buffer, salt: number): Promise<string> {
        return await this.bcryptModule.hash(data, salt);      
    } 

    /**
     * Compare data with hash 
     * @memberof Bcrypt
     */
    public async bcryptCompare(plaintextData: string, hash: string): Promise<boolean> {
            return await this.bcryptModule.compare(plaintextData, hash);       
    }
}

export const bcryptInstance = new Bcrypt(bcrypt);