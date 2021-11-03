import axios, {Axios, AxiosRequestConfig} from 'axios';
import JSONTransformInstance, { JS_Transform_Interface } from '../utils/JSONTransform';

type Methods = readonly ['GET', 'POST', 'DELETE', 'PUT'];
/**
 * For all interactions with back API
 * @class ToAPI
 */
class ToAPI {

	private readonly axiosModule: Axios;
	private readonly baseUrlAPI: string;
	private readonly JSONTransformInstance: JS_Transform_Interface;

	/**
	 * Creates an instance of ToAPI.
	 * @memberof ToAPI
	 */
	constructor(axiosModule: Axios, JSONTransformInstance: JS_Transform_Interface, baseUrlAPI: string) {
		this.axiosModule = axiosModule;
		this.baseUrlAPI = baseUrlAPI;
		this.JSONTransformInstance = JSONTransformInstance;
	}

	/**
	 * For operation to API
	 * @memberof ToAPI
	 */
	async toApi(method: {} & keyof Methods, url: string, body: {}, configOptions: AxiosRequestConfig): Promise<any> {
		try {
			let returnAPI;
			switch (method) {
				case 'GET':
					returnAPI = await this.axiosModule.get(url, { ...configOptions, data: {...body} });
					const parsedData = this.JSONTransformInstance.stringyfyOrJSON(returnAPI, 'toOBJ');
					return parsedData;
				
				case 'POST':
					returnAPI = await this.axiosModule.post(url, { ...body }, { ...configOptions });
					return returnAPI;
				
				case 'DELETE':
					returnAPI = await this.axiosModule.delete(url, { ...configOptions });
					return returnAPI;
				
				case 'PUT':
					returnAPI = await this.axiosModule.put(url, { ...body }, { ...configOptions });
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