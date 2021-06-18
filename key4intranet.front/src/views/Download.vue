<template>
    <div class="documentList">
    
        <div class="list-group">
            <div class="buttonSelector">
                <button v-on:click.prevent="getFileToDownload()" type="button" class="btnSelector btn btn-outline-primary btn-sm">Tous documents</button>
                <button v-on:click.prevent="getFileToDownloadFromGroup('COM')" type="button" class="btnSelector btn btn-outline-primary btn-sm">Documents commerciaux</button>
                <button v-on:click.prevent="getFileToDownloadFromGroup('OPE')" type="button" class="btnSelector btn btn-outline-primary btn-sm">Documents operationnels</button>
                <button v-on:click.prevent="getFileToDownloadFromGroup('DEV')" type="button" class="btnSelector btn btn-outline-primary btn-sm">Documents de developpement</button>
                <button v-on:click.prevent="getFileToDownloadFromGroup('ADM')" type="button" class="btnSelector btn btn-outline-primary btn-sm">Documents administratifs</button>
                <button v-on:click.prevent="getFileToDownloadFromGroup('DIR')" type="button" class="btnSelector btn btn-outline-primary btn-sm">Documents de la direction</button>
                <button v-on:click.prevent="logout()" type="button" class="btn btn-danger">Déconnexion</button>
            </div>
            <div class="list-group-item" v-for="doc in docList" v-bind:key="doc.id">
                <div class="row">
                    <div class="col-4 imgLogo">
                        <img v-bind:src="getMyIcon(doc.extension)" class="documentIcon"/>
                    </div>
                    <div class="col-7 documentName">
                        {{doc.fileName}}
                    </div>
                    <div class="col-4"><button v-on:click.prevent="buttonDownloadOnClick(doc)" type="button" class="btn-download btn btn-info">Télécharger</button></div>
                </div>
            </div>
        </div>
        <footer>
        <div class="row">
            <div class>
                <span class="copy">
					<svg class="logo white float-left float-xxl-none" viewBox="0 0 42 50"><use xlink:href="../../public/assets/images/sprites.svg#logo-key4" xmlns:xlink="http://www.w3.org/1999/xlink"></use></svg>
					<span class="d-inline-block mt-1"><strong>©2021 key4events.</strong> Tous droits réservés.</span>
                </span>
            </div>
        </div>
    </footer>
    </div>
</template>

<script>
import DownloadService from '../services/download.service';
import ToolsMixin from '../mixins/tools.mixins';
import AuthService from '../services/auth.service';

export default {
    name:'Download',
    mixins:[ToolsMixin],
    mounted:function() {
        this.getFileToDownload();
    },
    data:function() {
        return {
            docList:[],
        }
    },
    methods: {
        getFileToDownload() { //on veut récupérer tous les documents
            DownloadService.getLibrary().then( //appel de notre service
                resp => {
                    var response = resp.status ? resp : resp.response; 
                    if(response && response.status == 200){
                        this.docList = response.data;
                        this.showToast('La liste de tous les fichiers a été chargée !', 'Total de ' + this.docList.length + ' documents chargés.', "success");
                    }
                    else{
                        this.showToast("Erreur ! ", resp.message, "danger");
                        this.docList = [];
                    }
                }
            ).catch(err => {
                this.showToast("error", err, "danger");
            });
        },

        getFileToDownloadFromGroup(g) { //on veut récupérer tous les documents appartenant au groupe spécifié
            DownloadService.getLibraryFromSpecificGroup(g).then( //appel de notre service
                resp => {
                    var response = resp.status ? resp : resp.response; 
                    if(response && response.status == 200){
                        this.docList = response.data;
                        this.showToast('La liste de tous les fichiers ' + this.getGroupNameToDisplay(g) + ' a été chargée !', 'Total de ' + this.docList.length + ' documents chargés.', "success");
                    }
                    else{
                        this.showToast("Erreur ! ", resp.message, "danger");
                        this.docList = [];
                    }
                }
            ).catch(err => {
                this.showToast("error", err, "danger");
            });
        },

        getMyIcon(ext){
            return '../assets/icons/' + ext + '.ico';
        },

        buttonDownloadOnClick(doc){ // on passe l'objet complet pour pouvoir récupérer son nom lors du traitement
            DownloadService.downloadFile(doc);
        },

        getGroupNameToDisplay(g) {
            switch (g) {
                case "OPE":
                    return "operationnels";
                case "COM":
                    return "commerciaux";
                case "ADM":
                    return "administratifs";
                case "DEV":
                    return "de developpement";
                case "DIR":
                    return "de la direction";
                default:
                    return "ERR";
            }
        },

        logout() {
            AuthService.logout();
            this.$router.replace({ name : 'Login'});
        },

    }
}

</script>

<style scoped>

    button.btnSelector {
        margin : 10px 2.5px 10px 2.5px;
    }

    button.btn-download {
        margin : 5px 0px 0px 0px
    }

    div.documentList {
        display: grid;
        place-content: center;
    }

    div.imgLogo {
        display: grid;
        place-content: center;
    }

    div.documentName {
        margin-top: 25px;
        text-align: center;
    }

    img.documentIcon {
        width: 50px;
    }
</style>
