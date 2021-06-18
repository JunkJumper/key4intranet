import RestService from './restService';
import authHeader from './auth-header';

const API_URL = process.env.VUE_APP_API_URL_BASE + 'api/echo';

class EchoService{
    getEcho(){
        return RestService.makeRequest(API_URL);
    }

    getAutorizedEcho(){
        var url = API_URL + '/authorized';
        return RestService.makeRequest(url,{ headers: authHeader() });
    }

}

export default new EchoService;