import React, {useEffect, useRef, useState} from "react";
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

    const beforeImgRef = useRef<HTMLImageElement>(null);
    const afterImgRef = useRef<HTMLImageElement>(null);

    const adjustImageSize = (imgRef: React.RefObject<HTMLImageElement>) => {
        if (imgRef.current) {
            const img = imgRef.current;
            if (img.naturalWidth > 1000 || img.naturalHeight > 1000) {
                img.style.maxWidth = "90%";
                img.style.maxHeight = "400px";
            } else if (img.naturalWidth < 400 || img.naturalHeight < 400) {
                img.style.minWidth = "300px";
                img.style.minHeight = "300px";
            }
        }
    };

    useEffect(() => {
        adjustImageSize(beforeImgRef);
        adjustImageSize(afterImgRef);
    }, [beforeImage, afterImage]);

    return (
        <>
            <HeaderResult onSaveClick={handleSaveClick} onDownloadClick={handleDownloadClick} />
            <div className="result-container" style={{ marginTop: "40px" }}>
                <div className="image-section">
                    <h2>Before</h2>
                    {beforeImage ? (
                        <img ref={beforeImgRef} src={beforeImage} alt="Before" className="result-image" />
                    ) : (
                        <p>No image available</p>
                    )}
                </div>
                <div className="image-section">
                    <h2>After</h2>
                    {afterImage ? (
                        <img ref={afterImgRef} src={afterImage} alt="After" className="result-image" />
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
