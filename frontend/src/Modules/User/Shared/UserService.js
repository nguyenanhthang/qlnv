import { BASE_URL } from "../../../Constances/const";
import { Http } from "../../../Helper/http";

const API_ENDPOINT = {
    LIST_USER: '/user/list',
    CREATE_USER:'/user/create',
    UPDATE_USER:'/user/update',
    GET_USER:'/user/get',
    ME:'/auth/me',
    SET_PASSWORD:'/auth/user/set_password'
  }
  class UserService {
    constructor() {
      if (UserService._instance) {
        return UserService._instance;
      }
      UserService._instance = this;
    }
      getListUser() {
        return Http.get(API_ENDPOINT.LIST_USER);
      }
      createUser(payload) {
          return Http.post(API_ENDPOINT.CREATE_USER, payload);
      }
      updateUser(id,payload){
          return Http.post(`${API_ENDPOINT.UPDATE_USER}?id=${id}`, payload)
      }
      getUser(id){
          return Http.get(`${API_ENDPOINT.GET_USER}?id=${id}`)
      }
      getInfo(){
        return Http.get(API_ENDPOINT.ME);
      }
      postUpdatePassword(payload){
        return Http.post(API_ENDPOINT.SET_PASSWORD, payload);
      }
    }

  
  const instance = new UserService();
  
  export default instance;