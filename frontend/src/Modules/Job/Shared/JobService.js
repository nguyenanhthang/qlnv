import { BASE_URL } from "../../../Constances/const";
import { Http } from "../../../Helper/http";

const API_ENDPOINT = {
  USER_BY_JOB: '/job/user/list',
  JOB_BY_USER: '/job/user/get',
  ADD_USER: '/job/user',
  LIST_JOB: '/job/list',
  CREATE_JOB: '/job/create',
  UPDATE_JOB: '/job/update',
  GET_JOB: '/job/get',
  LIST_MODULE: '/job/module/list',
  CREATE_MODULE: '/job/module/create',
  UPDATE_MODULE: '/job/module/update',
  GET_MODULE: '/job/module/get',
  LIST_MODULE_BY_JOB: '/job/module/list',
  DELETE_MODULE: '/job/module/delete'
}
class JobService {
  constructor() {
    if (JobService._instance) {
      return JobService._instance;
    }
    JobService._instance = this;
  }
  getListJob() {
    return Http.get(API_ENDPOINT.LIST_JOB);
  }
  createJob(payload) {
    return Http.post(API_ENDPOINT.CREATE_JOB, payload);
  }
  updateJob(id, payload) {
    return Http.post(`${API_ENDPOINT.UPDATE_JOB}?id=${id}`, payload)
  }
  getJob(id) {
    return Http.get(`${API_ENDPOINT.GET_JOB}?id=${id}`)
  }
  getListModule() {
    return Http.get(API_ENDPOINT.LIST_MODULE);
  }
  getListModuleByUser(id){
    return Http.get(`${API_ENDPOINT.LIST_MODULE}?user_id=${id}`)
  }
  createModule(payload) {
    return Http.post(API_ENDPOINT.CREATE_MODULE, payload);
  }
  updateModule(id, payload) {
    return Http.post(`${API_ENDPOINT.UPDATE_MODULE}?id=${id}`, payload)
  }
  deleteModule(id) {
    return Http.post(`${API_ENDPOINT.DELETE_MODULE}?id=${id}`)
  }
  getModule(id) {
    return Http.get(`${API_ENDPOINT.GET_MODULE}?id=${id}`)
  }
  getListModuleByJob(id) {
    return Http.get(`${API_ENDPOINT.LIST_MODULE_BY_JOB}?job_id=${id}`)
  }
  getUserByJob(id) {
    return Http.get(`${API_ENDPOINT.USER_BY_JOB}?job_id=${id}`)
  }
  getJobByUser(id) {
    return Http.get(`${API_ENDPOINT.JOB_BY_USER}?id=${id}`)
  }
  addUser(payload) {
    return Http.post(API_ENDPOINT.ADD_USER, payload)
  }
}


const instance = new JobService();

export default instance;