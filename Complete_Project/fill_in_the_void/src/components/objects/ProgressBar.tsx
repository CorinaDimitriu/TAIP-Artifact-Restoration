import React from "react";
import "../../styles/ProgressBar.css";

interface ProgressBarProps {
    percentage: number; // New prop for percentage
}

const ProgressBar: React.FC<ProgressBarProps> = ({ percentage }) => {
    return (
        <div className="overlay">
            <div className="progress-container">
                <div className="progress-bar" style={{ width: `${percentage}%` }}></div>
            </div>
            <div className="progress-percentage">{percentage}%</div> {/* Display percentage */}
        </div>
    );
};

export default ProgressBar;
