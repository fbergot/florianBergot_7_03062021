namespace UtilsNamespace {
    // JSONTransform
    export interface JS_Transform_Interface {
        stringyfyOrParse: (data: any, swt: string) => (string | Object) | null;
    }

    export type Data = string | number | [] | {};

    // ToLocalStorage
    export type ItemToStringify = any;
}

export default UtilsNamespace;