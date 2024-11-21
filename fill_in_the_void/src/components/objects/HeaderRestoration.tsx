import React from "react";
import "../../styles/HeaderRestoration.css";
import { useNavigate } from 'react-router-dom';
import { IoArrowBackOutline } from "react-icons/io5";

interface HeaderRestorationProps {
    onStartOver: () => void;
    onDone: () => void;
}

const HeaderRestoration: React.FC<HeaderRestorationProps> = ({ onStartOver,onDone  }) => {
    const navigate = useNavigate();

    const handleActions = (type: string) => {
        switch (type) {
            case "Back":
                const confirmLeave = window.confirm("Changes made will be lost. Are you sure you want to go back?");
                if (confirmLeave) {
                    navigate('/');
                }
                break;
            case "Start over":
                onStartOver();
                break;
            default:
                break;
        }
    };

    return (
        <header className="header-restoration">
            <div className="actions-rest">
                <button className="go-back-button" onClick={() => handleActions("Back")}>
                    <IoArrowBackOutline  style={{fontSize: "18px", marginRight: "6px"}}/>
                    Back
                </button>
                <div style={{color: "white", fontSize: "1rem"}}>|</div>
                <button className="action-button" onClick={() => handleActions("Start over")}>
                    Start over
                </button>
            </div>

            <button className="download-button" onClick={onDone}>
                DONE
            </button>
        </header>
    );
}

export default HeaderRestoration;
