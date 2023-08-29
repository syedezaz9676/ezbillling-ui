import axios from 'axios'; 
import { toast,ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const login=(loginusername, loginpassowrd)=>{


    console.log('loginusername'+loginusername);
    console.log('loginpassowrd'+loginpassowrd);
    const loginDetails = function(loginusername, loginpassowrd) {
        const username = loginusername;
        const passowrd = loginpassowrd;
        return { username, passowrd };
    };

    const request ={
        username:loginusername,
        password:loginpassowrd
    }

    console.log('logindetails'+request);

    return axios.post('http://localhost:8080/token' , request)
    .then(response => {

         console.log(response.data);
       return response

    })
    .catch(({response}) => {
        throw response;
    });
}