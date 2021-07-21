import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'https://backend.hitcklife.com/api/v1/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getUserPayment() {
    return axios.get(API_URL + 'payment/account/merchant/check', { headers: authHeader() });
  }

  update(name, lname, street, apt, city, state, zip){
    return axios.post(API_URL + "auth/update", {
      name,
      lname,
      street,
      apt,
      city,
      state,
      zip
    }, {headers: authHeader()}).then(response => {
      return response.data;
    });;
  }

}

export default new UserService();