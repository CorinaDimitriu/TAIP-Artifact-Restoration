
import React, {useState} from "react";
import "../../styles/Login.css";
import logo from "../images/logo.png"; 
import {useNavigate} from "react-router-dom";
import {IoArrowBackOutline} from "react-icons/io5";

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/api/v1/auth/authenticate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            if (response.ok) {
                console.log('Login successful!');
                const data = await response.json();
                const token = data.token;
                localStorage.setItem('token', token);
                navigate('/');
            } else {
                console.error('Login failed!');
                setErrorMessage('Invalid email or password. Please try again.');
            }
        } catch (error) {
            console.error('Network error:', error);
            setErrorMessage('Network error. Please try again later.');
        }
    };
    return (
        <div className="login-container">
        <div className="login-card">
            <button className="go-back-button2" onClick={() => navigate(-1)}>
                <IoArrowBackOutline  style={{fontSize: "18px", marginRight: "6px"}}/>
                Back
            </button>
            <div className="login-header">
                <img src={logo} alt="Fill in the Void Logo" className="login-logo" />
                <div className="text-logo">Fill in the Void</div>
            </div>
            <p className="login-subtitle">Complete your profile</p>
            <form className="login-form" onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    className="login-input"
                    style={{marginBottom: "20px"}}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="login-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <p className="forgot-password">Forgot password?</p>
                <div className='error-login'>{errorMessage}</div>

                <div className="login-btn-container">
                    <button type="submit" className="login-button">
                        Login
                    </button>
                </div>
            </form>

            <button className="create-account-button" onClick={() => navigate("/register")}>Create an account</button>
        </div>
        </div>
    );
};

export default Login;
