import React, { useState } from 'react';
import'./Company.css';


function Company() {
  const [name, setName] = useState("");
  const [gstpercentage, setGSTPercentage] = useState("");
  const [message, setMessage] = useState("");

  let handleSubmit = async (e) => {
  console.log('clicked');
    e.preventDefault();
    try {
      let res = await fetch("http://localhost:8080/savecompanydetails", {
        method: "POST",
         headers: new Headers({
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJlemF6IiwiZXhwIjoxNjk0NDA0NDM5LCJpYXQiOjE2OTQzNjg0Mzl9.1kQ33hVsk2-YlU3lbK20opiEac3F4PAvohz304stb9s',
                'Accept': 'text/plain;charset=UTF-',
                'Content-Type': 'application/json; charset=utf-8',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
                'Access-Control-Request-Method': 'GET, POST, DELETE, PUT, OPTIONS',
                'Access-Control-Allow-Credentials':'true',
                'withCredentials': 'true',
              }),
        body: JSON.stringify({
          name: name,
          gstpercentage: gstpercentage
        }),
      });
      let resJson = await res.json();
      if (res.status === 200) {
        setName("");
        setGSTPercentage("");
        setMessage("User created successfully");
      } else {
        setMessage("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          value={gstpercentage}
          placeholder="GST Percentage"
          onChange={(e) => setGSTPercentage(e.target.value)}
        />
        <button type="submit">Save Company Details</button>

        <div className="message">{message ? <p>{message}</p> : null}</div>
      </form>
    </div>
  );
}

export default Company;