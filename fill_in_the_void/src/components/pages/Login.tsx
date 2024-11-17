
import React from "react";
import "../../styles/Login.css";
import logo from "../images/logo.png"; 
import {useNavigate} from "react-router-dom";

const Login: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="login-container">
        <div className="login-card">
            <button className="go-back-button" onClick={() => navigate(-1)}>← Go back</button>
            <div className="login-header">
            <img src={logo} alt="Fill in the Void Logo" className="login-logo" />
            <h1>Fill in the Void</h1>
            </div>
            <p className="login-subtitle">Complete your profile</p>
            <form className="login-form">
            <input
                type="email"
                placeholder="Email"
                className="login-input"
                required
            />
            <input
                type="password"
                placeholder="Password"
                className="login-input"
                required
            />
            <button type="submit" className="login-button">
                Login
            </button>
            <p className="forgot-password">Forgot password?</p>
            </form>
            <button className="create-account-button" onClick={() => navigate("/register")}>Create an account</button>
        </div>
        </div>
    );
};

export default Login;
