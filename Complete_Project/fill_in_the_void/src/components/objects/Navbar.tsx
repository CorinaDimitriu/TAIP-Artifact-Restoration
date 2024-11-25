import React from "react";
import "../../styles/Navbar.css";

const Navbar: React.FC = () => {
    return (
        <nav className="navbar">
            <ul className="navbar-list">
                <li className="navbar-item">Home</li>
                <li className="navbar-item">Help</li>
                <li className="navbar-item">About</li>
            </ul>
        </nav>
    );
}

export default Navbar;
