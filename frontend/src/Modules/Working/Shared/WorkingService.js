import { BASE_URL } from "../../../Constances/const";
import { Http } from "../../../Helper/http";

const API_ENDPOINT = {
   JOB_BY_USER:'/job/user/list',
  }
  class WorkingService {
    constructor() {
      if (WorkingService._instance) {
        return WorkingService._instance;
      }
      WorkingService._instance = this;
    }
    getJobByUser(id) {
      return Http.get(`${API_ENDPOINT.JOB_BY_USER}?user_id=${id}`)
    }
    }

  
  const instance = new WorkingService();
  
  export default instance;