import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080";
// const API_URL = "https://0b02-171-76-85-220.ngrok-free.app";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL+'/token', {
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
    .post(API_URL+'/savecustomerdetails', 
     customerDetails
    )
    .then(response => {
      return response;
    });
  }

  getGstCodeDetails(){
    return axios
    .get(API_URL+'/getgstcodedetails',{headers :authHeader})
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
