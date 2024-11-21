import React from 'react';
import { VscAccount } from "react-icons/vsc";
import { CgLogOut } from "react-icons/cg";
import "../../styles/DropDownProfile.css";

import {useNavigate} from "react-router-dom";
interface DropdownMenuProps {
    onSelect: (option: string) => void;
}
const DropDownProfile : React.FC<DropdownMenuProps> = ({onSelect}) => {
    const navigate = useNavigate();

    const handleOptionClick = (option: string) => {
        if (option === "Profile") {
            navigate('/profile');
        } else {
            onSelect(option);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="dropdown-menu" style={{left: "0px"}}>
            <button onClick={() => handleOptionClick("Profile")}>
                <div className="options-with-icon">
                    <VscAccount   style={{fontSize:"1rem", marginRight:"10px"}}/>
                    <div className="text-menu-element">
                        Profile
                    </div>
                </div>
            </button>
            <button onClick={handleLogout} style={{borderTop: "1px solid #c4c4c4"}}>
                <div className="options-with-icon">
                    <CgLogOut style={{fontSize: "1rem", marginRight:"10px"}}/>
                    <div className="text-menu-element">
                        Logout
                    </div>
                </div>
            </button>

        </div>
    );
};

export default DropDownProfile;