import axios from 'axios'

class RestService {
    makeRequest(url, data, header) {
        return axios.get(url, data, header).then(
            response => { return response; },
            error => { return Promise.reject(error); }
        )
    }

    downloadFile(urlToDL, displayedFilename, fileExtension, h) {
        axios({ //requète axios
            url: urlToDL,
            method: 'POST',
            responseType: 'blob',
            headers: h.headers
        }).then((response) => {
            var fileURL = window.URL.createObjectURL(new Blob([response.data]));
            var fileLink = document.createElement('a');
            fileLink.href = fileURL;
            fileLink.setAttribute('download', displayedFilename + "." + fileExtension); //ici on applique le renommage du fichier à télécharger et on spécifie le format
            document.body.appendChild(fileLink);
            fileLink.click();
        });
    }
}

export default new RestService;