import React from "react";
import "./Signup.css";
import { Link } from "react-router-dom";

function Signup() {
  return (
    <div className="signup">
      <div className="signup-left">
        <h3>QWE</h3>
        <div className="signup-leftImages"></div>
      </div>
      <div className="signup-right">
        <h1>Sign-Up</h1>
        <input type="text" placeholder="Your username" />
        <input type="email" placeholder="Your mail" />
        <select id="accountType" name="accountType">
          <option value="type1">Student</option>
          <option value="type2">Employee</option>
          <option value="type3">tutor</option>
        </select>
        <input type="password" placeholder="Your password" />
        <input type="password" placeholder="Confirm password" />
        <p className="forget">Forgot your password?</p>
        <button type="submit">Sign In</button>
        <p className="account">Already have an account?</p>
        <Link className="signIn" to="login">
          <p className="sigIn">Login Now!</p>
        </Link>
      </div>
    </div>
  );
}

export default Signup;
