import React, { useState } from "react";
import "../../styles/Result.css";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const HeaderResult: React.FC<{ onSaveClick: () => void; onDownloadClick: () => void }> = ({ onSaveClick, onDownloadClick }) => {
    const navigate = useNavigate();

    const handleActions = (type: string) => {
        switch (type) {
            case "Back":
                const confirmLeave = window.confirm("Changes made will be lost. Are you sure you want to go back?");
                if (confirmLeave) {
                    navigate('/restoration');
                }
                break;
            default:
                break;
        }
    };


    return (
        <header className="header-restoration">
            <div className="actions-rest">
                <button className="action-button" onClick={() => handleActions("Back")}>
                    <IoIosArrowRoundBack style={{ fontSize: "25px", marginRight: "6px" }} />
                    Back
                </button>
            </div>

            <div>
                <button className="select-model-button" style={{backgroundColor: "red"}} onClick={onDownloadClick}>
                    Download
                </button>

                <button className="download-button" style={{backgroundColor: "green", marginLeft: "10px"}}
                        onClick={onSaveClick}>
                    Save
                </button>
            </div>
        </header>
    );
};

export default HeaderResult;
