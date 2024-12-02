import React, { useState } from "react";
import "../../styles/HeaderRestoration.css";
import { useNavigate } from 'react-router-dom';
import { IoArrowBackOutline } from "react-icons/io5";
import SelectModel from "./SelectModel"; // Asigură-te că calea este corectă

interface HeaderRestorationProps {
    onStartOver: () => void;
    onDone: (selectedModel: string | null) => void;
}

const HeaderRestoration: React.FC<HeaderRestorationProps> = ({ onStartOver, onDone }) => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [selectedModel, setSelectedModel] = useState<string | null>(null);

    const handleActions = (type: string) => {
        if (type === "Back") {
            const confirmLeave = window.confirm("Changes made will be lost. Are you sure you want to go back?");
            if (confirmLeave) navigate('/');
        } else if (type === "Start over") {
            onStartOver();
        }
    };

    const handleModelSelect = (model: string) => {
        setSelectedModel(model);
        setShowModal(false);
        console.log("Selected model:", model); // Poți face acțiuni suplimentare aici
    };

    return (
        <header className="header-restoration">
            <div className="actions-rest">
                <button className="action-button" onClick={() => handleActions("Back")}>
                    <IoArrowBackOutline style={{ fontSize: "18px", marginRight: "6px" }} />
                    Back
                </button>
                <div style={{ color: "white", fontSize: "1rem" }}>|</div>
                <button className="action-button" onClick={() => handleActions("Start over")}>
                    Start over
                </button>
            </div>

            <div className="two-buttons">
                <button className="select-model-button" onClick={() => setShowModal(true)} style={{ backgroundColor: "red" }}>
                    Select Model
                </button>
                {selectedModel && (
                    <button className="download-button" onClick={() => onDone(selectedModel)}>
                        DONE
                    </button>
                )}
            </div>

            <SelectModel
                show={showModal}
                onClose={() => setShowModal(false)}
                onSelect={handleModelSelect}
                selectedModel={selectedModel}
            />
        </header>
    );
};

export default HeaderRestoration;