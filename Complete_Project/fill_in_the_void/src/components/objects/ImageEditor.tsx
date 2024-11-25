// DrawingCanvas.tsx

import React, { useRef, useEffect } from "react";

interface DrawingCanvasProps {
    imagePosition: { x: number; y: number };
    zoomLevel: number;
    brushSize: number;
    activeTool: 'brush' | 'zoom';
    onDraw: (x: number, y: number) => void;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    onMouseUp: () => void;
    onMouseDown: (event: React.MouseEvent<HTMLCanvasElement>) => void;
}

const DrawingCanvas: React.FC<DrawingCanvasProps> = ({
                                                         imagePosition,
                                                         zoomLevel,
                                                         brushSize,
                                                         activeTool,
                                                         onDraw,
                                                         onMouseEnter,
                                                         onMouseLeave,
                                                         onMouseUp,
                                                         onMouseDown,
                                                     }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const isDrawing = useRef(false);
    const lastMousePosition = useRef<{ x: number; y: number } | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext("2d");
            ctx?.clearRect(0, 0, canvas.width, canvas.height);
        }
    }, [imagePosition, zoomLevel]);

    const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
        if (isDrawing.current && activeTool === 'brush') {
            const x = event.clientX;
            const y = event.clientY;
            onDraw(x, y);
            lastMousePosition.current = { x, y };
        }
    };

    const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
        if (activeTool === 'brush') {
            isDrawing.current = true;
            const x = event.clientX;
            const y = event.clientY;
            onDraw(x, y);
            lastMousePosition.current = { x, y };
        }
    };

    const handleMouseUp = () => {
        isDrawing.current = false;
        lastMousePosition.current = null;
    };

    return (
        <canvas
            ref={canvasRef}
            width={1000}
            height={600}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onMouseMove={handleMouseMove}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            style={{
                position: 'absolute',
                transform: `translate(${imagePosition.x}px, ${imagePosition.y}px) scale(${zoomLevel})`,
                transformOrigin: '50% 50%',
                cursor: activeTool === 'brush' ? "none" : "default",
                pointerEvents: 'auto',
                zIndex: 2,
            }}
        />
    );
};

export default DrawingCanvas;
