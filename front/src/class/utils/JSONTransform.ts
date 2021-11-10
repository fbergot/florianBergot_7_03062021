import UtilsNamespace from "../../typescript/namespaces/utils";

type D = UtilsNamespace.Data;
type R = (string | Object) | null;
type T = UtilsNamespace.JS_Transform_Interface;

class JSONTransform implements T {

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
	public stringyfyOrParse(data: D, swt: string): R {
		switch (swt) {
			case 'toJS':
				if (typeof data !== "string") {
					return JSON.stringify(data);	
				}
				throw Error(this.messagesError.badTypeData);
			case 'toOBJ':
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