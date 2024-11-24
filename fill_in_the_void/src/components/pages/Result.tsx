import React, { useEffect, useState } from "react";
import "../../styles/HeaderRestoration.css";
import beforeImage from "../images/mona-lisa.jpg";
import HeaderResult from "../objects/HeaderResult";
import AddPaint from "../objects/AddPaint";
import {useNavigate} from "react-router-dom"; // Import the Modal component

const Result: React.FC = () => {
    const [beforeImage, setBeforeImage] = useState<string | null>(null);
    const [afterImage, setAfterImage] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);


    useEffect(() => {
        // Get the Before image from localStorage
        const savedBeforeImage = localStorage.getItem('restorationImage');
        const savedAfterImage = localStorage.getItem('restoredImage');
        if (savedBeforeImage && savedAfterImage) {
            setBeforeImage(savedBeforeImage);
            setAfterImage(savedAfterImage);
        }
    }, []);

    const handleSaveClick = () => {
        setIsModalOpen(true);

    };

    const handleCloseModal = () => {
        setIsModalOpen(false); // Close the modal
    };

    return (
        <>
            <HeaderResult onSaveClick={handleSaveClick} />
            <div className="result-container" style={{ marginTop: "40px" }}>
                <div className="image-section">
                    <h2>Before</h2>
                    {beforeImage ? (
                        <img src={beforeImage} alt="Before" className="result-image" />
                    ) : (
                        <p>No image available</p>
                    )}
                </div>
                <div className="image-section">
                    <h2>After</h2>
                    {afterImage ? (
                        <img src={afterImage} alt="After" className="result-image" />
                    ) : (
                        <p>No image available</p>
                    )}
                </div>
            </div>

            {/* Modal for painting details */}
            <AddPaint show={isModalOpen} onClose={handleCloseModal} />
        </>
    );
};

export default Result;
