interface JS_Transform_Interface {
	stringyfyOrJSON: (data: any, swt: string)=> (string | Object) | null;	
}
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
            badValue: "switch is incorrect, accepted: ('toJS'|'toOBJ)",
            badTypeData: "Type of data is incorrect",

        }
    }

    stringyfyOrJSON(data: any, swt: string): (string | Object) | null {
		try {
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
		} catch (err: any) {
			console.error(err.messge);
			return null;
		}
    }
}

const JSONTransformInstance = new JSONTransform();

export default JSONTransformInstance;