import JSONTransformInstance, {JS_Transform_Interface} from "./JSONTransform";

type ItemToStringify = Exclude<[] | {} | number | string, string>;
/**
 * to manage local_storage
 * @class ToLocalStorage
 */

class ToLocalStorage {

    private readonly JSONTransform: JS_Transform_Interface;

    /**
	 * Creates an instance of ToLocalStorage.
	 * @memberof ToLocalStorage
	 */
	constructor(JSONTransform: any) {
        this.JSONTransform = JSONTransform;
    }

	/**
	 * Transform & set item in localStorage
	 * @memberof ToLocalStorage
	 */
	tranformAndSetItem(item: ItemToStringify, key: string): boolean | null {
		try {
			const parseData = this.JSONTransform.stringyfyOrJSON(item, 'toJS');
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
	tranformAndGetItem(key: string): null | ItemToStringify {
		try {
			const brutItem = window.localStorage.getItem(key);
			return this.JSONTransform.stringyfyOrJSON(brutItem, 'toOBJ');
		} catch (err: any) {
			console.error(err.message);
			return null;
		}
	}
}

const toLocalStorageInst = new ToLocalStorage(JSONTransformInstance);

export default toLocalStorageInst;