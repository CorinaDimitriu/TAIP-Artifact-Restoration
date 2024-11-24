import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Register.css";
import logo from "../images/logo.png";
import {IoArrowBackOutline} from "react-icons/io5";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/v1/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ firstname, lastname, email, password })
      });
      if (response.ok) {
        console.log('Registration successful!');
        navigate("/login");
      }else {
        const errorMessage = await response.text();
        console.error('Error signing up:', errorMessage);
        setErrorMessage(errorMessage);
      }
    } catch (error: any) {
      console.error('Error signing up:', error.message);
      setErrorMessage('Network error. Please try again later.');
    }

  };

  return (
    <div className="register-container">
      <div className="register-card">
        <button className="go-back-button2" onClick={() => navigate(-1)}>
          <IoArrowBackOutline  style={{fontSize: "18px", marginRight: "6px"}}/>
          Back
        </button>
        <div className="register-header">
          <img src={logo} alt="Fill in the Void Logo" className="register-logo" />
          <div className="text-logo">Fill in the Void</div>
        </div>
        <p className="register-subtitle">Create your profile</p>
        <form className="register-form" onSubmit={handleSubmit}>
          <input
              type="text"
              placeholder="First Name"
              className="register-input"
              style={{marginBottom: "15px"}}
              value={firstname}
              onChange={(e) => setFirstName(e.target.value)}
              required
          />
          <input
              type="text"
              placeholder="Last Name"
              className="register-input"
              style={{marginBottom: "15px"}}
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
              required
          />
          <input
              type="email"
              placeholder="Email"
              className="register-input"
              style={{marginBottom: "15px"}}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
          />
          <input
              type="password"
              placeholder="Password"
              className="register-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
          />

          <div className="error-register">{errorMessage}</div>
          <div className="register-btn-container">
            <button type="submit" className="register-button">
              Create Account
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default Register;
