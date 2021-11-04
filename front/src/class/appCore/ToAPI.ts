import axios, { Axios, AxiosRequestConfig } from 'axios';
import UtilsNamespace from '../../typescript/namespaces/utils';
import JSONTransformInstance from '../utils/JSONTransform';

type J = UtilsNamespace.JS_Transform_Interface;
type Methods = readonly ['GET', 'POST', 'DELETE', 'PUT'];
type M = {} & keyof Methods;

/**
 * For all interactions with back (API)
 * @class ToAPI
 */
class ToAPI {

	private readonly axiosModule: Axios;
	private readonly baseUrlAPI: string;
	private readonly JSONTransformInstance: J;
	private readonly messages: {
		badHTTPMethod: string;
	}

	/**
	 * Creates an instance of ToAPI.
	 * @memberof ToAPI
	 */
	constructor(axiosModule: Axios, JSONTransformInstance: J, baseUrlAPI: string) {
		this.axiosModule = axiosModule;
		this.baseUrlAPI = baseUrlAPI;
		this.JSONTransformInstance = JSONTransformInstance;
		this.messages = {
			badHTTPMethod: "Method is invalid"
		}
	}

	/**
	 * For operation to API
	 * @memberof ToAPI
	 */
	public async toApi(method: M, url: string, body: {}, configOptions: AxiosRequestConfig): Promise<any>  {
		try {
			let returnAPI;
			switch (method) {
				case 'GET':
					returnAPI = await this.axiosModule.get(url, { ...configOptions, data: { ...body } });
					return this.JSONTransformInstance.stringyfyOrParse(returnAPI, 'toOBJ');
				
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
					throw Error(this.messages.badHTTPMethod);
			}
		} catch (err: any) {
			console.error(err.message);
			return false;
		}
	}
}

const toApiInstance = new ToAPI(axios, JSONTransformInstance, 'http://localhost:3000/api/');

export default toApiInstance;