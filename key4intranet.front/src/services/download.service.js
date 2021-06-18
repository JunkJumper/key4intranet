import RestService from './restService';
import authHeader from './auth-header';

const API_URL = process.env.VUE_APP_API_URL_BASE + 'api/download';

class DownloadService {
    getLibrary() {
        var url = API_URL + '/getLibrary/';
        return RestService.makeRequest(url, { headers: authHeader() });
    }

    getLibraryFromSpecificGroup(g) {
        var url = API_URL + '/getLibrary/' + g + '/';
        return RestService.makeRequest(url, { headers: authHeader() });
    }

    downloadFile(doc) {
        var url = API_URL + '/id/' + doc.id + '/'; //on récupère seulement le nom pour l'url
        return RestService.downloadFile(url, doc.fileName, doc.extension, { headers: authHeader() }); //on rajoute le nom du fichier à télécharger
    }
}
export default new DownloadService;