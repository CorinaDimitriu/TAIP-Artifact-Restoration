import React, { useState } from 'react';
import '../../styles/SelectModel.css';
import RenaissanceImage from '../images/Renaissance.png';
import ContemporaryImage from '../images/Contemporary.png';

interface SelectModelProps {
    show: boolean;
    onClose: () => void;
    onSelect: (model: string) => void;
    selectedModel: string | null;
}

const SelectModel: React.FC<SelectModelProps> = ({ show, onClose, onSelect, selectedModel }) => {
    const [localSelectedModel, setLocalSelectedModel] = useState<string | null>(selectedModel);

    const handleSave = () => {
        if (localSelectedModel) {
            onSelect(localSelectedModel); // Confirmă selecția
            onClose(); // Închide modalul
        }
    };

    const handleClose = () => {
        setLocalSelectedModel(null); // Resetează selecția temporară
        onClose(); // Închide modalul
    };

    if (!show) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <h2>Select Model</h2>
                <div className="model-options">
                    <div className="model-item">
                        <button
                            onClick={() => setLocalSelectedModel('Contemporary')}
                            className={`model-button ${localSelectedModel === 'Contemporary' ? 'selected' : ''}`}
                        >
                            Contemporary
                        </button>
                        <img src={ContemporaryImage} alt="Contemporary Model" className="model-image" />
                    </div>
                    <div className="model-item">
                        <button
                            onClick={() => setLocalSelectedModel('Renaissance')}
                            className={`model-button ${localSelectedModel === 'Renaissance' ? 'selected' : ''}`}
                        >
                            Renaissance
                        </button>
                        <img src={RenaissanceImage} alt="Renaissance Model" className="model-image" />
                    </div>
                </div>
                <div className="modal-actions2">
                    <button onClick={handleSave} className="save-button" disabled={!localSelectedModel}>
                        Save
                    </button>
                    <button onClick={handleClose} className="close-button">Close</button>
                </div>
            </div>
        </div>
    );
};

export default SelectModel;
