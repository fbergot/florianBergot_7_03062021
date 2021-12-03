import UtilsNamespace from "../../typescript/namespaces/utils";
import JSONTransformInstance from "./JSONTransform";

type J = UtilsNamespace.JS_Transform_Interface;
type I = UtilsNamespace.ItemToStringify;

interface BasicLocalStorageWrapper {
	getJSONTransform: () => J;
	tranformAndSetItem: (item: I, key: string) => boolean | null;
	getItemAndTransform: (key: string) => null | I;
}
/**
 * to manage local_storage
 * @class ToLocalStorage
 */
class ToLocalStorage implements BasicLocalStorageWrapper {

    private readonly JSONTransform: J;
    public readonly getJSONTransform: () => UtilsNamespace.JS_Transform_Interface;

    /**
	 * Creates an instance of ToLocalStorage.
	 * @memberof ToLocalStorage
	 */
	constructor(JSONTransform: J) {
		this.JSONTransform = JSONTransform;// injection dependency
		this.getJSONTransform = () => {
			return this.JSONTransform;
		};
    }

	/**
	 * Transform & set item in localStorage
	 * @memberof ToLocalStorage
	 */
	public tranformAndSetItem(item: I, key: string): boolean | null {
		try {
			const parsedData = this.getJSONTransform().stringyfyOrParse(item, 'toJS');
			if (typeof parsedData === 'string') {
				window.localStorage.setItem(key, parsedData);
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
			const result = this.getJSONTransform().stringyfyOrParse(brutItem, "toOBJ");
			return result;
		} catch (err: any) {
			console.error(err.message);
			return null;
		}
	}
}

const toLocalStorageInst = new ToLocalStorage(JSONTransformInstance);

export default toLocalStorageInst;