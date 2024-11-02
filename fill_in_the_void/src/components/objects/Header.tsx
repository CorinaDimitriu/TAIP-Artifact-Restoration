import React from "react";
import "../../styles/Header.css";
import logo from "../images/logo.png";

const Header: React.FC = () => {
    return (
        <header className="header">
            <div className="header-logo">
                <img src={logo} alt="Fill in the Void Logo" />
                Fill in the Void
            </div>

            <button className="header-button">
                Sing In
            </button>
        </header>
    );
}

export default Header;
