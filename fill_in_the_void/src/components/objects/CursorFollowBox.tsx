import React from 'react';

const CursorFollowBox: React.FC<{ isVisible: boolean; cursorPosition: { x: number; y: number }; brushSize: number }> = ({ isVisible, cursorPosition, brushSize }) => {
    // Return null if the box should not be visible
    if (!isVisible) {
        return null; // Correctly return null when not visible
    }

    // Render the box when visible
    return (
        <div
            style={{
                position: 'absolute',
                left: cursorPosition.x,
                top: cursorPosition.y,
                width: `${brushSize}px`, // Use brushSize for width
                height: `${brushSize}px`, // Use brushSize for height
                backgroundColor: 'rgba(78,237,55,0.8)',
                pointerEvents: 'none', // Prevent mouse events on the box
                transform: 'translate(-50%, -50%)', // Center the box on the cursor
            }}
        />
    );
};

export default CursorFollowBox;
