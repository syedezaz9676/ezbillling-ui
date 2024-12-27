import axios from "axios";
import authHeader from "./auth-header";
import urlData from "../common/ngrok_url.json"


// Define the base API URL
const BASE_API_URL = "http://localhost:8080"; 

// Check if the current URL contains "ngrok"
const isNgrokUrl = window.location.href.includes("ngrok");

// Determine the API URL based on the presence of "ngrok"
const API_URL = isNgrokUrl 
    ? urlData.url
    : BASE_API_URL;

    

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
