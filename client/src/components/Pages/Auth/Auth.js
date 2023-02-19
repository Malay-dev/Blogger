import React from "react";
import { useState } from "react";
import "./Auth.css";

import { signup, login } from "../../../actions/auth.js";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Auth() {
  const [IsSignUp, setIsSignUp] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState(new Date());
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email && !password) {
      alert("Enter Email and Password");
    }
    if (IsSignUp) {
      if (!name) {
        alert("Enter a name to continue");
      }
      dispatch(signup({ name, email, password, dob }, navigate));
    } else {
      dispatch(login({ email, password }, navigate));
    }
  };

  const handleSwitch = () => {
    setIsSignUp(!IsSignUp);
  };
  return (
    <div>
      <section className="auth-section">
        <div className="auth-container">
          {/* {!IsSignUp && <div className="login-logo">{logo}</div>} */}
          <form onSubmit={handleSubmit}>
            {IsSignUp && (
              <label htmlFor="name">
                <h4>Display Name</h4>
                <input
                  type="text"
                  name="name"
                  id="name"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </label>
            )}
            <label htmlFor="email">
              <h4>Email</h4>
              <input
                type="email"
                name="email"
                id="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </label>
            {IsSignUp && (
              <label htmlFor="date">
                <h4>Date of birth</h4>
                <input
                  type="date"
                  name="date"
                  id="date"
                  onChange={(e) => {
                    setDob(e.target.value);
                  }}
                />
              </label>
            )}
            <label htmlFor="password">
              <h4>Password</h4>
              <input
                type="password"
                name="password"
                id="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              {!IsSignUp && <p>forgot password?</p>}
            </label>
            {IsSignUp ? (
              <button type="submit" className="auth-btn-sign">
                Sign up
              </button>
            ) : (
              <button type="submit" className="auth-btn">
                Log in
              </button>
            )}
          </form>
          <p>
            {IsSignUp ? "Already have an account!" : "Don't have an Account!"}
            <button
              type="button"
              className="handle-switch-btn"
              onClick={handleSwitch}>
              {IsSignUp ? "Log in" : "Sign up"}
            </button>
          </p>
        </div>
      </section>
    </div>
  );
}

export default Auth;
