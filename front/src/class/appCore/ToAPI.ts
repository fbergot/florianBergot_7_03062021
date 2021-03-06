import axios, { Axios, AxiosRequestConfig, AxiosResponse } from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

/**
 * For all interactions with back (API)
 * @class ToAPI
 */
class ToAPI {
	private buildBasicHeaders: (token: string) => { accept: string; Authorization: string };
	private readonly axiosModule: Axios;
	private readonly baseUrlAPI: string;
	private readonly messages: {
		badHTTPMethod: string;
	}

	/**
	 * Creates an instance of ToAPI.
	 * @memberof ToAPI
	 */
	constructor(axiosModule: Axios, baseUrlAPI: string) {
		this.axiosModule = axiosModule;
		this.baseUrlAPI = baseUrlAPI;
		this.messages = {
			badHTTPMethod: "Method is invalid"
		}
		this.buildBasicHeaders = (token: string) => {
			return {
				'accept': 'application/json',
				'Authorization': `Bearer ${token}`
			}
		}
	}
	/**
	 * For operation to API, wrapper of toApi method
	 * @memberof ToAPI
	 */
	public async callApiRefact(method: string, url: string, data: any, options: AxiosRequestConfig,  token?: string): Promise<string | Promise<AxiosResponse<any, any>>> {
		const headers = this.buildBasicHeaders(token ?? "");
		const response = await this.toApi(method, url, data, {...options,  headers: { ...headers } });
		return response;
	}

	/**
	 * For operation to API
	 * @memberof ToAPI
	 */
	public async toApi(method: string, url: string, data: any, configOptions: AxiosRequestConfig): Promise<string | Promise<AxiosResponse<any, any>>> {
		try {
			let returnAPI;
			switch (method) {
				case 'GET':
					returnAPI = await this.axiosModule.get(`${this.baseUrlAPI}${url}`, { ...configOptions, data: { ...data } });
					return returnAPI;
				
				case 'POST':
					returnAPI = await this.axiosModule.post(`${this.baseUrlAPI}${url}`, data, { ...configOptions });
					return returnAPI;
				
				case 'DELETE':
					returnAPI = await this.axiosModule.delete(`${this.baseUrlAPI}${url}`, { ...configOptions });
					return returnAPI;
				
				case 'PUT':
					returnAPI = await this.axiosModule.put(`${this.baseUrlAPI}${url}`, { ...data }, { ...configOptions });
					return returnAPI;

				default:
					throw Error(this.messages.badHTTPMethod);
			}
		} catch (err: any) {
			console.error(err);
			return err.message;
		}
	}
}

// get & check url api
const urlToApi: string | undefined = process.env.REACT_APP_BASE_URL_TO_API;
if (!urlToApi) throw Error("Url to API missing in env var");

const toApiInstance = new ToAPI(axios, urlToApi);

export default toApiInstance;