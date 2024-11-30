import React, { useEffect, useState } from "react";
import "../../styles/HeaderRestoration.css";
import HeaderResult from "../objects/HeaderResult";
import AddPaint from "../objects/AddPaint";

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

    const handleDownloadClick = () => {
        if (afterImage) {
            const link = document.createElement("a");
            link.href = afterImage; // URL-ul base64 al imaginii restaurate
            link.download = "restored-image.png"; // Numele fișierului descărcat
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            alert("No image available to download.");
        }
    };

    return (
        <>
            <HeaderResult onSaveClick={handleSaveClick} onDownloadClick={handleDownloadClick} />
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
