namespace UtilsNamespace {
    // JSONTransform
    export interface JS_Transform_Interface {
        stringyfyOrParse: (data: any, swt: string) => (string | Object) | null;
    }

    export type Data = Exclude<[] | {} | number | string, string> | string;

    // ToLocalStorage
    export type ItemToStringify = Exclude<[] | {} | number | string, string>;
}

export default UtilsNamespace;