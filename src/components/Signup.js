import React,{useState} from 'react';
import axios from 'axios';
import { Link,useHistory } from 'react-router-dom';
import NavigationBar from './NavigationBar';
import "../index.css";


function Signup(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState("");
  let history = useHistory();

  
  
  async function formSubmit(e)  {
    e.preventDefault();
    const config = {
      header: {
        "Content-Type": "application/json",

      }
    }

    if (password !== password2) {
      setPassword("");
      setPassword2("");
      setTimeout(() => {
        setError("");
      }, 5000);
      return setError("Passwords do not match");
    }

    if (password.length <= 6) {
      setPassword("");
      setPassword2("");
      setTimeout(() => {
        setError("");
      }, 5000);
      return setError("Password length must be at least 6 characters"); 
    }


    try {
      const { data } = await axios.post("https://calm-eyrie-07624.herokuapp.com/api/user/create-account", { name, email, password, password2 }, config);
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
    <div className="container reg-form">
    
      <form onSubmit={formSubmit}>
          <br />
          {error && (
            <div className="alert alert-danger" role="alert">
  {error}
</div>
          )}
        <h1 className="register-text"> Register With Us!</h1>
     <div className="form-group">
    <label htmlFor="NameInput">Name</label>
    <input type="text" className="form-control" id="exampleNameInput" aria-describedby="nameHelp" placeholder="Enter name" name="name" value={name} onChange={(e)=>{setName(e.target.value)}} required />    
    </div>
  <div className="form-group">
    <label htmlFor="EmailInput">Email</label>
          <input type="email" className="form-control" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Enter email" name="email" required value={email} onChange={(e)=>{setEmail(e.target.value)}}
          />
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
    
  </div>
  <div className="form-group">
    <label htmlFor="exampleInputPassword1">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" name="password" required value={password} onChange={(e)=>{setPassword(e.target.value)}}  />
        </div>
        <div className="form-group">
    <label htmlFor="exampleInputPassword1">Confirm Password</label>
          <input type="password" className="form-control" id="exampleInputPassword2" placeholder="Confirm Password" name="password2" required
           value={password2} onChange={(e)=>{setPassword2(e.target.value)}}      />
  </div>
 
  <button type="submit" className="btn btn-primary signup-submit">Create Account</button>
  <small className="login-suggestion"> Already have an account? <Link to="/login"> Login </Link>  </small>
</form>
    </div>
  </React.Fragment>
  )
}

export default Signup
