import UtilsNamespace from "../../typescript/namespaces/utils";
import JSONTransformInstance from "./JSONTransform";

type J = UtilsNamespace.JS_Transform_Interface;
type I = UtilsNamespace.ItemToStringify;

/**
 * to manage local_storage
 * @class ToLocalStorage
 */
class ToLocalStorage {

    private readonly JSONTransform: J;

    /**
	 * Creates an instance of ToLocalStorage.
	 * @memberof ToLocalStorage
	 */
	constructor(JSONTransform: J) {
        this.JSONTransform = JSONTransform;
    }

	/**
	 * Transform & set item in localStorage
	 * @memberof ToLocalStorage
	 */
	public tranformAndSetItem(item: I, key: string): boolean | null {
		try {
			const parseData = this.JSONTransform.stringyfyOrParse(item, 'toJS');
			if (typeof parseData === 'string') {
				window.localStorage.setItem(key, parseData);
				return true;
			}
			return null;
		} catch (err: any) {
			console.error(err.message);
			return null;
		}
	}

	/**
	*  get item in localStorage & Transform in js object
	* @memberof ToLocalStorage
	*/
	public getItemAndTransform(key: string): null | I {
		try {
			const brutItem = window.localStorage.getItem(key);
			const result = this.JSONTransform.stringyfyOrParse(brutItem, "toOBJ");
			return result;
		} catch (err: any) {
			console.error(err.message);
			return null;
		}
	}
}

const toLocalStorageInst = new ToLocalStorage(JSONTransformInstance);

export default toLocalStorageInst;