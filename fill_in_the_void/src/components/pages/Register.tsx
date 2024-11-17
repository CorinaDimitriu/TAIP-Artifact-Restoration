import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Register.css";
import logo from "../images/logo.png";

const Register: React.FC = () => {
  const navigate = useNavigate(); 

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

  };

  return (
    <div className="register-container">
      <div className="register-card">
        <button className="go-back-button" onClick={() => navigate(-1)}>
          ← Go back
        </button>
        <div className="register-header">
          <img src={logo} alt="Fill in the Void Logo" className="register-logo" />
          <h1>Fill in the Void</h1>
        </div>
        <p className="register-subtitle">Create your profile</p>
        <form className="register-form" onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="First Name"
            className="register-input"
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            className="register-input"
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="register-input"
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="register-input"
            required
          />
          <button type="submit" className="register-button">
            Create Account
          </button>
        </form>
        
      </div>
    </div>
  );
};

export default Register;
