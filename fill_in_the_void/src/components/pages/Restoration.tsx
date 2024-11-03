import React, { useState } from "react";
import HeaderRestoration from "../objects/HeaderRestoration";
import "../../styles/Restoration.css";
import BrushAndZoomTool from "../objects/BrushAndZoomTool";
import CursorFollowBox from "../objects/CursorFollowBox"; // Import the cursor box component

interface RestorationProps {
    uploadedImage: string | null;
}

const Restoration: React.FC<RestorationProps> = ({ uploadedImage }) => {
    const [imageToDisplay, setImageToDisplay] = useState<string | null>(uploadedImage);
    const [brushSize, setBrushSize] = useState(10);
    const [cursorPosition, setCursorPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const [isCursorOverImage, setIsCursorOverImage] = useState(false);

    const handleMouseEnter = () => {
        setIsCursorOverImage(true);
    };

    const handleMouseLeave = () => {
        setIsCursorOverImage(false);
    };

    const handleMouseMove = (event: React.MouseEvent<HTMLImageElement>) => {
        setCursorPosition({ x: event.clientX, y: event.clientY });
    };

    return (
        <>
            <HeaderRestoration />
            <div className="container" style={{ position: 'relative' }}>
                {imageToDisplay && (
                    <img
                        src={imageToDisplay}
                        alt="Uploaded"
                        className="image"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        onMouseMove={handleMouseMove}
                        style={{ cursor: "none" }} // Optionally hide the default cursor
                    />
                )}
                <CursorFollowBox
                    isVisible={isCursorOverImage}
                    cursorPosition={cursorPosition}
                    brushSize={brushSize} // Pass the current brush size
                />
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <BrushAndZoomTool onBrushSizeChange={setBrushSize} />
            </div>
        </>
    );
};

export default Restoration;
