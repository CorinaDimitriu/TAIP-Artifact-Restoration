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

    const [boundingBox, setBoundingBox] = useState({
        leftUp: { x: Infinity, y: Infinity },
        rightUp: { x: -Infinity, y: Infinity },
        leftDown: { x: Infinity, y: -Infinity },
        rightDown: { x: -Infinity, y: -Infinity }
    });

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

    useEffect(() => {
        const updateCanvasSize = () => {
            const canvas = canvasRef.current;
            const imageElement = document.querySelector(".image") as HTMLImageElement;

            if (canvas && imageElement) {
                canvas.width = imageElement.clientWidth;
                canvas.height = imageElement.clientHeight;
            }
        };

        updateCanvasSize();

        // Recalculăm dimensiunea când fereastra se redimensionează
        window.addEventListener("resize", updateCanvasSize);
        return () => window.removeEventListener("resize", updateCanvasSize);
    }, [imageToDisplay, zoomLevel]);

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

    const drawSquare = (clientX: number, clientY: number) => {
        const canvas = canvasRef.current;
        const imageElement = document.querySelector(".image") as HTMLImageElement;

        if (canvas && imageElement) {
            const ctx = canvas.getContext("2d");
            if (ctx) {
                ctx.fillStyle = "rgba(78,237,55)"; // Culoare pentru brush

                // Calculează coordonatele ajustate pentru canvas și zoom
                const rect = canvas.getBoundingClientRect();
                let adjustedX = (clientX - rect.left) / zoomLevel;
                let adjustedY = (clientY - rect.top) / zoomLevel;

                // Asigură-te că coordonatele nu ies în afara canvas-ului
                adjustedX = Math.max(0, Math.min(adjustedX, canvas.width));
                adjustedY = Math.max(0, Math.min(adjustedY, canvas.height));

                // Calculăm limitele brush-ului în funcție de dimensiunea sa
                const brushHalfSize = brushSize / 2;


                // Desenăm doar în interiorul marginii imaginii
                const minX = Math.max(0, adjustedX - brushHalfSize);
                const maxX = Math.min(canvas.width, adjustedX + brushHalfSize);
                const minY = Math.max(0, adjustedY - brushHalfSize);
                const maxY = Math.min(canvas.height, adjustedY + brushHalfSize);

                // Desenează pătratul pe canvas
                ctx.fillRect(minX, minY, maxX - minX, maxY - minY);

                // Calculează coordonatele reale în raport cu dimensiunea originală a imaginii
                const scaleX = imageElement.naturalWidth / imageElement.clientWidth;
                const scaleY = imageElement.naturalHeight / imageElement.clientHeight;

                const realX = adjustedX * scaleX;  // Rotunjim pentru a evita coordonatele cu virgulă
                const realY = adjustedY * scaleY;  // Rotunjim pentru a evita coordonatele cu virgulă

                // Asigură-te că punctele sunt în interiorul imaginii
                const realXMin = Math.max(0, Math.floor(realX - brushSize)); // Folosim Math.floor pentru a evita coordonatele decimale
                const realYMin = Math.max(0, Math.floor(realY - brushSize));
                const realXMax = Math.min(imageElement.naturalWidth, Math.floor(realX + brushSize));
                const realYMax = Math.min(imageElement.naturalHeight, Math.floor(realY + brushSize));

                // Actualizează bounding box-ul dacă punctele sunt în interiorul imaginii
                if (realXMin >= 0 && realYMin >= 0 && realXMax <= imageElement.naturalWidth && realYMax <= imageElement.naturalHeight) {
                    setBoundingBox(prevBox => ({
                        leftUp: {
                            x: Math.min(prevBox.leftUp.x, realXMin),
                            y: Math.min(prevBox.leftUp.y, realYMin)
                        },
                        rightUp: {
                            x: Math.max(prevBox.rightUp.x, realXMax),
                            y: Math.min(prevBox.rightUp.y, realYMin)
                        },
                        leftDown: {
                            x: Math.min(prevBox.leftDown.x, realXMin),
                            y: Math.max(prevBox.leftDown.y, realYMax)
                        },
                        rightDown: {
                            x: Math.max(prevBox.rightDown.x, realXMax),
                            y: Math.max(prevBox.rightDown.y, realYMax)
                        }
                    }));
                }

                console.log(`Coordonate reale: (${realX}, ${realY})`);
            }
        }
    };






    const handleShowBoundingBox = () => {
        console.log("Bounding Box:", boundingBox);
        alert(`Bounding Box:
        Left Up: (${boundingBox.leftUp.x}, ${boundingBox.leftUp.y})
        Right Up: (${boundingBox.rightUp.x}, ${boundingBox.rightUp.y})
        Left Down: (${boundingBox.leftDown.x}, ${boundingBox.leftDown.y})
        Right Down: (${boundingBox.rightDown.x}, ${boundingBox.rightDown.y})`);
    };




    const clearCanvas = () => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext("2d");
            if (ctx) {
                ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the entire canvas
            }
        }

        // Reset the bounding box to initial values
        setBoundingBox({
            leftUp: { x: Infinity, y: Infinity },
            rightUp: { x: -Infinity, y: Infinity },
            leftDown: { x: Infinity, y: -Infinity },
            rightDown: { x: -Infinity, y: -Infinity }
        });

        console.log("Canvas cleared, Bounding Box reset.");
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
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onMouseMove={handleMouseMoveCanvas}
                    onMouseDown={handleMouseDownCanvas}
                    onMouseUp={handleMouseUpCanvas}
                    onWheel={handleWheel}
                    style={{
                        transform: `translate(${imagePosition.x}px, ${imagePosition.y}px) scale(${zoomLevel})`,
                        transformOrigin: 'top left',
                        pointerEvents: activeTool === 'brush' ? "auto" : "none",
                        cursor: activeTool === 'brush' ? "none" : (isDragging ? "grabbing" : "default"),
                    }}
                />

                <CursorFollowBox
                    isVisible={isCursorOverImage && activeTool === 'brush' && !isDragging}
                    cursorPosition={cursorPosition}
                    brushSize={brushSize}
                />
            </div>
            <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                <BrushAndZoomTool
                    onBrushSizeChange={setBrushSize}
                    zoomLevel={zoomLevel}
                    onZoomLevelChange={setZoomLevel}
                    setActiveTool={setActiveTool}
                    setImagePosition={setImagePosition}
                />
            </div>

            <button onClick={handleShowBoundingBox} style={{marginTop: '20px'}}>
                Show Bounding Box
            </button>

            {showProgressBar && <ProgressBar percentage={progressPercentage}/>}
        </>
    );
};

export default Restoration;
