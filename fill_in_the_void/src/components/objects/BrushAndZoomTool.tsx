import React, { useState } from 'react';
import { FaSearch, FaPaintBrush } from 'react-icons/fa';
import { MdOutlineZoomOutMap } from "react-icons/md";
import '../../styles/BrushAndZoomTool.css';

interface BrushAndZoomToolProps {
    onBrushSizeChange: (size: number) => void;
    zoomLevel: number; // New prop for zoom level
    onZoomLevelChange: (level: number) => void; // New prop for updating zoom level
    setActiveTool: (tool: 'brush' | 'zoom') => void; // New prop for setting active tool
}

const BrushAndZoomTool: React.FC<BrushAndZoomToolProps> = ({ onBrushSizeChange, zoomLevel, onZoomLevelChange, setActiveTool }) => {
    const [brushSize, setBrushSize] = useState(10);
    const [activeTool, setActiveToolState] = useState<'brush' | 'zoom'>('brush');

    const handleBrushSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newSize = Number(event.target.value);
        setBrushSize(newSize);
        onBrushSizeChange(newSize);
    };

    const handleZoomChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newZoomLevel = Number(event.target.value);
        onZoomLevelChange(newZoomLevel); // Update zoom level in parent component
    };

    const handleToolChange = (tool: 'brush' | 'zoom') => {
        setActiveToolState(tool);
        setActiveTool(tool); // Set the active tool in parent component
    };

    const resetZoom = () => {
        onZoomLevelChange(1); // Reset to initial zoom level
    };

    return (
        <div className="tool-container">
            <div
                className={`icon-wrapper ${activeTool === 'brush' ? 'active' : ''}`}
                onClick={() => handleToolChange('brush')}>
                <FaPaintBrush className="brush-icon" />
            </div>

            <div
                className={`icon-wrapper ${activeTool === 'zoom' ? 'active' : ''}`}
                onClick={() => handleToolChange('zoom')}>
                <FaSearch className="search-icon" />
            </div>

            {activeTool === 'brush' ? (
                <>
                    <div style={{ marginRight: "10px" }}>Brush</div>
                    <div className="brush-size-control">
                        <input
                            type="range"
                            min="2"
                            max="60"
                            value={brushSize}
                            onChange={handleBrushSizeChange}
                            className="brush-slider"
                        />
                    </div>
                </>
            ) : (
                <>
                    <div style={{ marginRight: "10px" }}>Zoom</div>
                    <div className="zoom-control">
                        <input
                            type="range"
                            min="0.1"
                            max="3"
                            step="0.1"
                            value={zoomLevel} // Controlled by parent component
                            onChange={handleZoomChange}
                            className="zoom-slider"
                        />
                    </div>
                    <MdOutlineZoomOutMap style={{marginLeft: "10px", fontSize:"20px", cursor:"pointer"}} onClick={resetZoom}/>

                </>
            )}
        </div>
    );
};

export default BrushAndZoomTool;
