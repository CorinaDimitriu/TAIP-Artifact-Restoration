import React, {useEffect, useState} from "react";
import "../../styles/Header.css";
import logo from "../images/logo.png";
import {jwtDecode} from "jwt-decode";
import {useNavigate} from "react-router-dom";
import DropDownProfile from "./DropDownProfile";

interface UserToken {
    sub: string;
    iat: number;
    exp: number;
}

const Header: React.FC = () => {
    const navigate = useNavigate();
    const [lastName, setLastName] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    const handleSignIn = () => {
        navigate('/login');
    };

    useEffect(() => {
        const token = localStorage.getItem("token");

        const updateLastNameFromToken = () => {
            if (token) {
                const decodedToken = jwtDecode(token) as UserToken;
                const lastname = decodedToken.sub;
                setLastName(lastname);
                // fetchFirstName(decodedToken.sub);
            }
        };

        updateLastNameFromToken();

        const handleStorageChange = () => {
            updateLastNameFromToken();
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const pressAccountButton = () => {
        setShowDropdown(!showDropdown);
    }

    const handleOptionSelect = (option: string) => {
        setSelectedOption(option);
        setShowDropdown(false);
    };

    // const fetchFirstName = async (email: string) => {
    //     try {
    //         const response = await fetch(`http://localhost:8080/api/v1/auth/get-last-name?email=${encodeURIComponent(email)}`);
    //
    //         if (!response.ok) {
    //             throw new Error('Failed to fetch first name');
    //         }
    //
    //         const data = await response.text();
    //         setLastName(data);
    //     } catch (error) {
    //         console.error('Error fetching first name:', error);
    //     }
    // };

    return (
        <header className="header">
            <div className="header-logo">
                <img src={logo} alt="Fill in the Void Logo" />
                Fill in the Void
            </div>

            {lastName ? (
                <div className="dropdown-container">
                    <button className="header-button" onClick={pressAccountButton}>{lastName}</button>
                    {showDropdown && <DropDownProfile onSelect={handleOptionSelect}/>}
                </div>

            ) : (
                <>
                    <button className="header-button" onClick={handleSignIn}>
                        Sing In
                    </button>
                </>
                )
            }

        </header>
    );
}

export default Header;
