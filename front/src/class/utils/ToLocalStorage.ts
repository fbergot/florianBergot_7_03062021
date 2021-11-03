import JSONTransformInstance from "./JSONTransform";

/**
 * to manage local_storage
 * @class ToLocalStorage
 */
class ToLocalStorage {

    JSONTransform: any;

    constructor(JSONTransform: any) {
        this.JSONTransform = JSONTransform;
    }

    tranformAndSetItem(item) {
        const parseData = this.JSONTransform.stringyfyOrJSON(item))
    }
}

const toLocalStorageInst = new ToLocalStorage(JSONTransformInstance);

export default toLocalStorageInst;