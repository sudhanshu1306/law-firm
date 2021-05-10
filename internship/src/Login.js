import React,{useState} from "react";
import "./Login.css";
import { Link,useHistory } from "react-router-dom";
import axios from "axios";


const api=axios.create({
    withCredentials: true,
    baseURL:process.env.REACT_APP_ROUTE+'/login'
  });

function Login() {
  let history=useHistory();
  const [user,changeUser]=useState({});

  function handleChange (event) {
    changeUser ({
        ...user,[event.target.name]: event.target.value
    });
}
  var flag=false;
  async function handleSubmit (event) {
    event.preventDefault();
    await api.post("/", user)
    .then(function (res) {
        console.log(res.data);
        if(res.data.success){
            flag=true;
            var type=res.data.user.type;
           if(flag){
            if(type!==1)
           history.push('/jobs');
           else
           history.push('/employer');
         }
           else
           history.push('/login');
        }
      })
      .catch(function (error) {
         history.push('/login');

      });


}
  return (
    <div className="login">
      <div className="login-left">
        <h3>Internship</h3>
        <div className="login-leftImages"></div>
      </div>
      <div className="login-right">
      <h1>Sign-In</h1>
        <input type="email" placeholder="Your mail" name="email" onChange={handleChange} />
        <input type="password" placeholder="Your password" name="password" onChange={handleChange} />
        <p className="forget">Forgot your password?</p>
        <button type="submit" onClick={handleSubmit}>Sign In</button>
        <p className="account">Don't have an account?</p>
        <Link className="signUp" to="signup">
          <p className="signUp">Register Now!</p>
        </Link>
      </div>
    </div>
  );
}

export default Login;
