import axios from "axios";
import qs from 'qs';

//const API_URL = "http://localhost:8008/api/auth/";
//const API_URL = 'https://flashcard-io-project.ew.r.appspot.com/api/auth/';
const API_URL = "http://localhost:8084/api/auth/";

class AuthService {
  login(username, password) {

    const data = {
      username,
      password
    };

    return axios
      .post(API_URL + "signin", qs.stringify(data))
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

  register(username, email, password) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password
    },
        );
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
}

export default new AuthService();
