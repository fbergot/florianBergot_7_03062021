export interface JS_Transform_Interface {
	stringyfyOrJSON: (data: any, swt: string)=> (string | Object) | null;	
}

type Data = Exclude<[] | {} | number | string, string> | string;

/**
 * to manage local_storage
 * @class ToLocalStorage
 */
class JSONTransform implements JS_Transform_Interface {

    private readonly messagesError: {
        badValue: string;
        badTypeData: string;
    };

    constructor() {
        this.messagesError = {
            badValue: "swt is incorrect, accepted: ('toJS'|'toOBJ)",
            badTypeData: "Type of data is incorrect",

        }
    }

    /**
	 * Stringify or parse data
	 * 
	 * @throw error if bad key or bad type of parameters
	 * @memberof JSONTransform
	 */
	stringyfyOrJSON(data: Data, swt: string): (string | Object) | null {
		switch (swt) {
			case 'toJS':
				if (typeof data !== "string") {
					return JSON.stringify(data);	
				}
				throw Error(this.messagesError.badTypeData);
			case 'toObj':
				if (typeof data === 'string') {
					return JSON.parse(data);
				}
				throw Error(this.messagesError.badTypeData);
			default:
				throw Error(this.messagesError.badValue);
		}                   
    }
}

const JSONTransformInstance = new JSONTransform();

export default JSONTransformInstance;