import React, { useState } from 'react';
import { FaSearch, FaPaintBrush } from 'react-icons/fa';
import '../../styles/BrushAndZoomTool.css';

interface BrushAndZoomToolProps {
    onBrushSizeChange: (size: number) => void;
}

const BrushAndZoomTool: React.FC<BrushAndZoomToolProps> = ({ onBrushSizeChange }) => {
    const [brushSize, setBrushSize] = useState(10);
    const [zoomLevel, setZoomLevel] = useState(1);
    const [activeTool, setActiveTool] = useState<'brush' | 'zoom'>('brush');

    const handleBrushSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newSize = Number(event.target.value);
        setBrushSize(newSize);
        onBrushSizeChange(newSize);
    };

    const handleZoomChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setZoomLevel(Number(event.target.value));
    };

    const handleToolChange = (tool: 'brush' | 'zoom') => {
        setActiveTool(tool);
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
                            value={zoomLevel}
                            onChange={handleZoomChange}
                            className="zoom-slider"
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default BrushAndZoomTool;
