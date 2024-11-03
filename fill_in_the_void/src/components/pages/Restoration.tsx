import React, { useState, useRef, useEffect } from "react";
import HeaderRestoration from "../objects/HeaderRestoration";
import "../../styles/Restoration.css";
import BrushAndZoomTool from "../objects/BrushAndZoomTool";
import CursorFollowBox from "../objects/CursorFollowBox";

interface RestorationProps {
    uploadedImage: string | null;
}

const Restoration: React.FC<RestorationProps> = ({ uploadedImage }) => {
    const [imageToDisplay, setImageToDisplay] = useState<string | null>(uploadedImage);
    const [brushSize, setBrushSize] = useState(10);
    const [zoomLevel, setZoomLevel] = useState(1);
    const [imagePosition, setImagePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const [cursorPosition, setCursorPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const [isCursorOverImage, setIsCursorOverImage] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [lastMousePosition, setLastMousePosition] = useState<{ x: number; y: number } | null>(null);
    const [activeTool, setActiveTool] = useState<'brush' | 'zoom'>('brush');
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

    useEffect(() => {
        const savedImage = localStorage.getItem('restorationImage');
        if (savedImage) {
            setImageToDisplay(savedImage);
        } else if (uploadedImage) {
            setImageToDisplay(uploadedImage);
        }
    }, [uploadedImage]);

    useEffect(() => {
        if (imageToDisplay) {
            localStorage.setItem('restorationImage', imageToDisplay);
        }
    }, [imageToDisplay]);

    const handleMouseEnter = () => setIsCursorOverImage(true);
    const handleMouseLeave = () => setIsCursorOverImage(false);

    const handleMouseMove = (event: React.MouseEvent<HTMLImageElement>) => {
        setCursorPosition({ x: event.clientX, y: event.clientY });

        if (isDragging && lastMousePosition && activeTool === 'zoom') {
            const dx = event.clientX - lastMousePosition.x;
            const dy = event.clientY - lastMousePosition.y;

            setImagePosition(prevPosition => ({
                x: prevPosition.x + dx,
                y: prevPosition.y + dy,
            }));
        }

        if (isDragging) {
            setLastMousePosition({ x: event.clientX, y: event.clientY });
        }
    };

    const handleMouseDown = (event: React.MouseEvent<HTMLImageElement>) => {
        if (activeTool === 'brush') {
            draw(event); // Draw on mouse down
        } else if (activeTool === 'zoom') {
            setIsDragging(true);
            setLastMousePosition({ x: event.clientX, y: event.clientY });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        setLastMousePosition(null);
    };

    const handleDragStart = (event: React.MouseEvent<HTMLImageElement>) => {
        event.preventDefault(); // Prevent default drag behavior
    };

    const handleWheel = (event: React.WheelEvent<HTMLImageElement>) => {
        event.preventDefault(); // Prevent page scroll
        const delta = event.deltaY < 0 ? 0.1 : -0.1; // Zoom in/out

        setZoomLevel(prevZoom => {
            const newZoom = Math.max(0.1, Math.min(prevZoom + delta, 3)); // Limit zoom between 0.1 and 3
            return newZoom;
        });
    };

    const draw = (event: React.MouseEvent<HTMLImageElement>) => {
        if (!ctxRef.current) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / zoomLevel) - imagePosition.x / zoomLevel;
        const y = ((event.clientY - rect.top) / zoomLevel) - imagePosition.y / zoomLevel;

        ctxRef.current.fillStyle = "red"; // Change this to whatever color you want
        ctxRef.current.beginPath();
        ctxRef.current.arc(x, y, brushSize / zoomLevel, 0, Math.PI * 2, true);
        ctxRef.current.fill();
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext("2d");
            if (ctx) {
                ctxRef.current = ctx;
                // Set the canvas size based on the image size and zoom level
                canvas.width = (imageToDisplay ? 600 : 0) * zoomLevel; // Adjust based on your requirements
                canvas.height = (imageToDisplay ? 400 : 0) * zoomLevel; // Adjust based on your requirements
            }
        }
    }, [imageToDisplay, zoomLevel]);

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
                        onMouseDown={handleMouseDown}
                        onMouseUp={handleMouseUp}
                        onDragStart={handleDragStart}
                        onWheel={handleWheel}

                        style={{
                            cursor: activeTool === 'brush' ? ("none") : (isDragging ? "grabbing" : "default"),
                            transform: `translate(${imagePosition.x}px, ${imagePosition.y}px) scale(${zoomLevel})`,
                            transformOrigin: '50% 50%',
                            transition: 'transform 0.1s ease-out',
                        }}
                    />
                )}
                <CursorFollowBox
                    isVisible={isCursorOverImage && activeTool === 'brush' && !isDragging} // Only show when using the brush and not dragging
                    cursorPosition={cursorPosition}
                    brushSize={brushSize}
                />
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <BrushAndZoomTool
                    onBrushSizeChange={setBrushSize}
                    zoomLevel={zoomLevel}
                    onZoomLevelChange={setZoomLevel}
                    setActiveTool={setActiveTool}
                />
            </div>
        </>
    );
};

export default Restoration;
