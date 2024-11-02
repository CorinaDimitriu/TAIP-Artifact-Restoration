import React from "react";
import "../../styles/Sidebar.css";

const Sidebar: React.FC = () => {
    return (
        <div className="sidebar">
            <ul className="sidebar-list">
                <div className="sidebar-item">Restoration</div>
                <div className="sidebar-item">All paintings</div>
                <div className="sidebar-item">Albums</div>
                <div className="sidebar-item">Badges</div>
            </ul>
        </div>
    );
}

export default Sidebar;
