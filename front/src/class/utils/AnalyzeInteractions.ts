import toLocalStorageInst from "./ToLocalStorage";
import UtilsNamespace from "../../typescript/namespaces/utils";

type I = UtilsNamespace.ItemToStringify;
type J = UtilsNamespace.JS_Transform_Interface;
type BLSW = BasicLocalStorageWrapper;

interface BasicLocalStorageWrapper {
	getJSONTransform: () => J;
	tranformAndSetItem: (item: I, key: string) => boolean | null;
	getItemAndTransform: (key: string) => null | I;
}

/**
 * Analyze the interaction of the users in app
 * @class AnalyseInteractions
 */
class AnalyseInteractions {

    private readonly ToLocalStorage: BLSW;
    private readonly timer: {
        interval: (time: number, callback: () => any) => undefined;
        timeout: (time: number, callback: () => any) => undefined;
    }

    /**
     * Creates an instance of AnalyseInteractions.
     * @memberof AnalyseInteractions
     */
    constructor(ToLocalStorageInst: BLSW) {
        this.ToLocalStorage = ToLocalStorageInst;
        this.timer = {
            interval: (time, callback) => void window.setInterval(() => callback(), time),
            timeout: (time, callback) => void window.setTimeout(() => callback(), time)
        }
    }
        
    /**
     * For analyze likes interactions
     * @memberof AnalyseInteractions
     */
    private analyzeLikes() { };

    /**
     * For analyze posts creation
     * @memberof AnalyseInteractions
     */
    private analyzeCreationPosts() { };
    
    /**
     * For dispach analyzes in app
     * @memberof AnalyseInteractions
     */
    public dispatchAnalyzes() {}
}

export default new AnalyseInteractions(toLocalStorageInst);