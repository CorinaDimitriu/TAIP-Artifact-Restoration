
import React, { useEffect, useState } from 'react';
import '../../styles/DrawerViewImageDetails.css';


interface Painting {
    paintingName: string;
    author: string;
    description: string;
    image: string;
}

interface DrawerViewImageDetailsProps {
    isOpen: boolean;
    onClose: () => void;
    painting: any; // Poate fi Painting | null
}

const DrawerViewImageDetails: React.FC<DrawerViewImageDetailsProps> = ({ isOpen, onClose, painting }) => {
    if (!isOpen || !painting) return null;

    return (
        <div className={`drawer ${isOpen ? "open" : ""}`}>
            <div className="drawer-header">
                <button className="close-btn" onClick={onClose}>✖</button>
                <div className="text-paint-detail">Painting Details</div>
            </div>

            <div className="drawer-content">
                <img src={painting.image} alt={painting.paintingName} className="drawer-image" />
                <div className="view-form">
                    <p className="text-info" style={{ marginBottom: "8px" }}><strong>Title:</strong> {painting.paintingName}</p>
                    <p className="text-info" style={{ marginBottom: "8px" }}><strong>Author:</strong> {painting.author}</p>
                    <p className="text-info"><strong>Description:</strong> {painting.description}</p>
                </div>
            </div>
        </div>
    );
};

export default DrawerViewImageDetails;
