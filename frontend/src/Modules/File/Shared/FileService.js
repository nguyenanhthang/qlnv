import { BASE_URL } from "../../../Constances/const";
import { Http } from "../../../Helper/http";

const API_ENDPOINT = {
    LIST_FILE: '/job/upload/list',
    DOWNLOAD_FILE: '/job/download?file=',
    UPLOAD: '/job/upload',
    LIST_JOB: '/job/list',
    LIST_MODULE: '/job/module/list?job_id='
}
class FileService {
    constructor() {
        if (FileService._instance) {
            return FileService._instance;
        }
        FileService._instance = this;
    }
    getListFile(filter) {
        let url = ""
        if(filter.user_id) url += "?user_id=" + filter.user_id
        return Http.get(`${API_ENDPOINT.LIST_FILE}` + url)
    }

    getDownloadFile(file_name) {
        return BASE_URL + API_ENDPOINT.DOWNLOAD_FILE + file_name;
    }
    postUpload(data) {
        return Http.post(API_ENDPOINT.UPLOAD, data)
    }

    getListJob() {
        return Http.get(API_ENDPOINT.LIST_JOB)
    }
    getListModule(job_id) {
        return Http.get(API_ENDPOINT.LIST_MODULE + job_id)
    }
}


const instance = new FileService();

export default instance;