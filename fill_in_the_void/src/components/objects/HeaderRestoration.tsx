import React, { useState } from "react";
import "../../styles/HeaderRestoration.css";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

const HeaderRestoration: React.FC = () => {
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
                alert("Starting over...");
                break;
            case "Undo":
                alert("Undo action");
                break;
            default:
                break;
        }
    };

    return (
        <header className="header-restoration">
            <div className="actions-rest">
                <button className="action-button" onClick={() => handleActions("Back")}>
                    <IoIosArrowRoundBack style={{ fontSize: "25px" }} />
                    Back
                </button>
                <div style={{ color: "white", fontSize: "1rem" }}>
                    |
                </div>
                <button className="action-button" onClick={() => handleActions("Start over")}>
                    Start over
                </button>
                <div style={{ color: "white" }}>
                    |
                </div>
                <button className="action-button" onClick={() => handleActions("Undo")}>
                    Undo
                </button>
            </div>

            <button className="download-button">
                Download
            </button>
        </header>
    );
}

export default HeaderRestoration;
