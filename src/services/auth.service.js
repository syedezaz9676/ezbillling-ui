import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/auth/";

class AuthService {
  login(username, password) {
    return axios
      .post('http://localhost:8080/token', {
        username,
        password
      })
      .then(response => {
        // if (response.data.accessToken) {
          // localStorage.setItem("user", JSON.stringify(response.data));
        // }

        return response;
      });
  }

  customerRegistration(customerDetails){
    return axios
    .post('http://localhost:8080/savecustomerdetails', 
     customerDetails
    )
    .then(response => {
      return response;
    });
  }

  getGstCodeDetails(){
    return axios
    .get('http://localhost:8080/getgstcodedetails',{headers :authHeader})
    .then(response => {
      return response;
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
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();
