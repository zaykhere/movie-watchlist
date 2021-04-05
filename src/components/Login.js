import React, { useState } from 'react';
import axios from 'axios';
import { Link,useHistory } from 'react-router-dom';
import NavigationBar from './NavigationBar'; 

function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(undefined);
  let history = useHistory();

  

  const formSubmit = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",

      }
    }
    try {
      const { data } = await axios.post("https://calm-eyrie-07624.herokuapp.com/api/user/sign-in", { email, password, }, config);
      if (data.errorMsg) {
        setError(data.errorMsg)
        return setTimeout(() => {
          setError(undefined)
        }, 5*1000);
      }
      localStorage.setItem("authToken", data.token);
      history.push("/");
    } catch (error) {
      setError("Error: Something went wrong");
      setTimeout(() => {
        setError(undefined);
      }, 5*1000);
    }
  }

  return (
    <React.Fragment>
      <NavigationBar />
     <div className="container login-form">
    
      <form onSubmit={formSubmit}>
          <br />
          {error && (
            <div className="alert alert-danger" role="alert">
  {error}
</div>
          )}
        <h1 className="register-text"> Sign-In </h1>
   
  <div className="form-group">
    <label htmlFor="EmailInput">Email</label>
          <input type="email" className="form-control" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Enter email" name="email" required value={email} onChange={(e)=>{setEmail(e.target.value)}}
          />
  </div>
  <div className="form-group">
    <label htmlFor="exampleInputPassword1">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" name="password" required value={password} onChange={(e)=>{setPassword(e.target.value)}}  />
        </div>
       
          <button type="submit" className="btn btn-primary login-submit">Login</button>
           <small className="login-suggestion"> Don't have an account? <Link to="/signup"> Sign Up </Link>  </small>
</form>
    </div>
  </React.Fragment>
  )
}

export default Login
