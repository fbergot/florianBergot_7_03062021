import axios, {Axios, AxiosRequestConfig} from 'axios';
import UtilsNamespace from '../../typescript/namespaces/utils';
import JSONTransformInstance from '../utils/JSONTransform';

type JS_TR = UtilsNamespace.JS_Transform_Interface;
type Methods = readonly ['GET', 'POST', 'DELETE', 'PUT'];
type M = {} & keyof Methods;;

/**
 * For all interactions with back API
 * @class ToAPI
 */
class ToAPI {

	private readonly axiosModule: Axios;
	private readonly baseUrlAPI: string;
	private readonly JSONTransformInstance: JS_TR;
	private readonly messages: {
		badMethod: string;
	}

	/**
	 * Creates an instance of ToAPI.
	 * @memberof ToAPI
	 */
	constructor(axiosModule: Axios, JSONTransformInstance: JS_TR, baseUrlAPI: string) {
		this.axiosModule = axiosModule;
		this.baseUrlAPI = baseUrlAPI;
		this.JSONTransformInstance = JSONTransformInstance;
		this.messages = {
			badMethod: "Method is invalid"
		}
	}

	/**
	 * For operation to API
	 * @memberof ToAPI
	 */
	async toApi(method: M, url: string, body: {}, configOptions: AxiosRequestConfig): Promise<any> {
		try {
			let returnAPI;
			switch (method) {
				case 'GET':
					returnAPI = await this.axiosModule.get(url, { ...configOptions, data: {...body} });
					const parsedData = this.JSONTransformInstance.stringyfyOrParse(returnAPI, 'toOBJ');
					return parsedData;
				
				case 'POST':
					returnAPI = await this.axiosModule.post(`${this.baseUrlAPI}${url}`, { ...body }, { ...configOptions });
					return returnAPI;
				
				case 'DELETE':
					returnAPI = await this.axiosModule.delete(`${this.baseUrlAPI}${url}`, { ...configOptions });
					return returnAPI;
				
				case 'PUT':
					returnAPI = await this.axiosModule.put(`${this.baseUrlAPI}${url}`, { ...body }, { ...configOptions });
					return returnAPI;

				default:
					throw Error('Bad method');
			}
		} catch (err: any) {
			console.error(err.message);
			return false;
		}
	}
}

const toApiInstance = new ToAPI(axios, JSONTransformInstance, 'http://localhost:3000');

export default toApiInstance;