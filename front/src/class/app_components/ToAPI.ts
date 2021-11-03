import axios, {Axios} from 'axios';

/**
 * For all interactions with back API
 * @class ToAPI
 */
class ToAPI {

    axiosModule: Axios;
    baseUrlAPI: string;

    constructor(axiosModule: Axios, baseUrlAPI: string) {
        this.axiosModule = axiosModule;
        this.baseUrlAPI = baseUrlAPI;
    }

    toApi() {

    }


}

const toApiInstance = new ToAPI(axios, 'http://localhost:3000');

export default toApiInstance;