import React from "react";
import "../../styles/Header.css";
import logo from "../images/logo.png";
import {useNavigate} from "react-router-dom";

const Header: React.FC = () => {
    const navigate = useNavigate();

    const handleSignIn = () => {
        navigate('/login');
    };

    return (
        <header className="header">
            <div className="header-logo">
                <img src={logo} alt="Fill in the Void Logo" />
                Fill in the Void
            </div>

            <button className="header-button" onClick={handleSignIn}>
                Sing In
            </button>
        </header>
    );
}

export default Header;
