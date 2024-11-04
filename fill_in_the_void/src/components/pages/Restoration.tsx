import React, { useState, useRef, useEffect } from "react";
import HeaderRestoration from "../objects/HeaderRestoration";
import "../../styles/Restoration.css";
import BrushAndZoomTool from "../objects/BrushAndZoomTool";
import CursorFollowBox from "../objects/CursorFollowBox";
import ProgressBar from "../objects/ProgressBar";
import { useNavigate } from "react-router-dom";

interface RestorationProps {
    uploadedImage: string | null;
}

const Restoration: React.FC<RestorationProps> = ({ uploadedImage }) => {
    const navigate = useNavigate();

    const [imageToDisplay, setImageToDisplay] = useState<string | null>(uploadedImage);
    const [brushSize, setBrushSize] = useState(10);
    const [zoomLevel, setZoomLevel] = useState(1);
    const [imagePosition, setImagePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const [cursorPosition, setCursorPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const [isCursorOverImage, setIsCursorOverImage] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [lastMousePosition, setLastMousePosition] = useState<{ x: number; y: number } | null>(null);
    const [activeTool, setActiveTool] = useState<'brush' | 'zoom'>('brush');
    const [showProgressBar, setShowProgressBar] = useState(false);
    const [progressPercentage, setProgressPercentage] = useState(0);

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const isDrawing = useRef(false);

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

    const handleMouseMoveCanvas = (event: React.MouseEvent<HTMLCanvasElement>) => {
        setCursorPosition({ x: event.clientX, y: event.clientY });

        // Handle dragging for image
        if (isDragging) {
            if (lastMousePosition) {
                const dx = (event.clientX - lastMousePosition.x) / zoomLevel; // Adjust for zoom
                const dy = (event.clientY - lastMousePosition.y) / zoomLevel; // Adjust for zoom

                // Update the image position based on the difference
                setImagePosition(prevPosition => ({
                    x: prevPosition.x + dx,
                    y: prevPosition.y + dy,
                }));
            }
            setLastMousePosition({ x: event.clientX, y: event.clientY }); // Update the last position
        }

        // Handle drawing with the brush
        if (isDrawing.current && activeTool === 'brush') {
            drawSquare(event.clientX, event.clientY);
        }
    };

    const handleMouseDownCanvas = (event: React.MouseEvent<HTMLCanvasElement>) => {
        if (activeTool === 'brush') {
            isDrawing.current = true;
            drawSquare(event.clientX, event.clientY);
        } else if (activeTool === 'zoom') {
            setIsDragging(true);
            setLastMousePosition({ x: event.clientX, y: event.clientY }); // Start dragging
        }
    };

    const handleMouseUpCanvas = () => {
        setIsDragging(false);
        isDrawing.current = false;
        setLastMousePosition(null); // Reset last position
    };

    // New event handlers for the image
    const handleMouseDownImage = (event: React.MouseEvent<HTMLImageElement>) => {
        setIsDragging(true);
        setLastMousePosition({ x: event.clientX, y: event.clientY }); // Start dragging
        event.preventDefault(); // Prevent default image drag behavior
    };

    const handleMouseMoveImage = (event: React.MouseEvent<HTMLImageElement>) => {
        // Update the cursor position over the image for the brush tool
        setCursorPosition({ x: event.clientX, y: event.clientY });

        // Handle dragging for image
        if (isDragging && lastMousePosition) {
            const dx = (event.clientX - lastMousePosition.x) / zoomLevel; // Adjust for zoom
            const dy = (event.clientY - lastMousePosition.y) / zoomLevel; // Adjust for zoom

            // Update the image position based on the difference
            setImagePosition(prevPosition => ({
                x: prevPosition.x + dx,
                y: prevPosition.y + dy,
            }));
            setLastMousePosition({ x: event.clientX, y: event.clientY }); // Update last position
        }
    };

    const handleMouseUpImage = () => {
        setIsDragging(false);
        setLastMousePosition(null); // Reset last position
    };

    const handleDragStart = (event: React.DragEvent<HTMLImageElement>) => {
        event.preventDefault(); // Prevent default drag behavior
    };

    const handleWheel = (event: React.WheelEvent<HTMLCanvasElement>) => {
        event.preventDefault();
        const delta = event.deltaY < 0 ? 0.1 : -0.1;

        setZoomLevel(prevZoom => {
            const newZoom = Math.max(0.1, Math.min(prevZoom + delta, 3));
            return newZoom;
        });
    };

    const drawSquare = (x: number, y: number) => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext("2d");
            if (ctx) {
                ctx.fillStyle = "rgba(78,237,55)";

                // Adjust x and y for the zoom level and image position
                const adjustedX = (x - canvas.offsetLeft - imagePosition.x) / zoomLevel;
                const adjustedY = (y - canvas.offsetTop - imagePosition.y) / zoomLevel;

                ctx.fillRect(
                    adjustedX - brushSize / 2,
                    adjustedY - brushSize / 2,
                    brushSize,
                    brushSize
                );
            }
        }
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext("2d");
            if (ctx) {
                ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the entire canvas
            }
        }
    };

    const handleDoneClick = () => {
        setShowProgressBar(true);
        setProgressPercentage(0);

        const interval = setInterval(() => {
            setProgressPercentage(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setShowProgressBar(false);
                    navigate('/result');
                    return 100;
                }
                return prev + 10; // Increase by 10%
            });
        }, 200); // Adjust time interval as needed
    };

    return (
        <>
            <HeaderRestoration onStartOver={clearCanvas} onDone={handleDoneClick} />
            <div className="container">
                {imageToDisplay && (
                    <img
                        src={imageToDisplay}
                        alt="Uploaded"
                        className="image"
                        onDragStart={handleDragStart}
                        onMouseDown={handleMouseDownImage} // Add mouse down event
                        onMouseMove={handleMouseMoveImage} // Add mouse move event
                        onMouseUp={handleMouseUpImage} // Add mouse up event
                        style={{
                            transform: `translate(${imagePosition.x}px, ${imagePosition.y}px) scale(${zoomLevel})`,
                            transformOrigin: '50% 50%',
                            transition: 'transform 0.1s ease-out',
                            position: 'absolute',
                            cursor: activeTool === 'brush' ? "none" : (isDragging ? "grabbing" : "default"),
                        }}
                    />
                )}
                <canvas
                    ref={canvasRef}
                    className="drawing-canvas"
                    width={1000}
                    height={600}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onMouseMove={handleMouseMoveCanvas}
                    onMouseDown={handleMouseDownCanvas}
                    onMouseUp={handleMouseUpCanvas}
                    onWheel={handleWheel}
                    style={{
                        position: 'absolute',
                        transform: `translate(${imagePosition.x}px, ${imagePosition.y}px) scale(${zoomLevel})`,
                        transformOrigin: '50% 50%',
                        cursor: activeTool === 'brush' ? "none" : (isDragging ? "grabbing" : "default"),
                        pointerEvents: activeTool === 'brush' ? "auto" : "none",
                    }}
                />
                <CursorFollowBox
                    isVisible={isCursorOverImage && activeTool === 'brush' && !isDragging}
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
                    setImagePosition={setImagePosition}
                />
            </div>
            {showProgressBar && <ProgressBar percentage={progressPercentage} />}
        </>
    );
};

export default Restoration;
