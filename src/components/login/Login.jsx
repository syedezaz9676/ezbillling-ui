// LoginForm.js
import React, { useState } from "react";
import { toast,ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { login } from "../service/services";
import { doLogin } from "../auth";
import './Login.css';
import { actions } from "../redux/AuthActions";

// toast.configure();
const Login = (props) => {

  console.log('props',props)
  //   toast.configure();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loginDetails, setLoginDetails] = useState({
    username: "",
    password: "",
  });


  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const onReset=()=>{
    setUsername('');
    setPassword('');
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username);
    if (username.trim() == "" || password.trim() == "") {
      toast.error("username or password not entered ", {
        position: toast.POSITION.TOP_CENTER
      });
      return;
    }

    actions.getTokenAndUserDetails(username,password);

    login(username, password).then((response)=>{
      console.log("jwttoken ",response);
      doLogin(response,()=>{
        console.log('login details saved to local storage')
      });
      toast.success('login sucess', {
        position: toast.POSITION.TOP_CENTER
      });
    }).catch(response=>{
      console.log('response.status',response.status)
      if(response.status === 401){
        console.log();
        toast.error('user not authorized', {
          position: toast.POSITION.TOP_CENTER
        });
      }else{
        toast.error(response.data.message, {
          position: toast.POSITION.TOP_CENTER
        });
      }
      
    })

  };

  return (
    <div className="form-box">
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username:</label>
        <input type="text" value={username} onChange={handleUsernameChange} />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <button type="submit">Login</button>
      <br></br>
      <br></br>
      <ToastContainer
       />

    </form>
 <button onClick={onReset}>Reset</button>
      </div>
  );
};

export default Login;
