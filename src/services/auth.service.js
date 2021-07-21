import axios from "axios";


const API_URL = "https://backend.hitcklife.com/api/v1/auth/";

class AuthService {
  login(email, password) {
    return axios
      .post(API_URL + "login", {
        email,
        password
      })
      .then(response => {
        if (response.data.access_token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(name, lname, email, password, password_confirmation, type) {
    return axios.post(API_URL + "register", {
      name,
      lname,
      email,
      type,
      password,
      password_confirmation
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();