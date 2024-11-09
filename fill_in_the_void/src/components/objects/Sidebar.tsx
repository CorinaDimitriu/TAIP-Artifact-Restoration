import React, { useState, useEffect } from "react";
import "../../styles/Sidebar.css";
import { useNavigate, useLocation } from "react-router-dom";
interface SidebarProps {
    style?: React.CSSProperties;
}
const Sidebar: React.FC<SidebarProps> = ({ style }) => {
    const navigate = useNavigate();
    const location = useLocation(); // Hook-ul pentru a obține calea curentă
    const [selected, setSelected] = useState<string>('');

    // Folosim useEffect pentru a actualiza starea selected pe baza locației
    useEffect(() => {
        // Setăm starea selectată în funcție de calea curentă
        if (location.pathname === '/') {
            setSelected('restoration');
        } else if (location.pathname === '/all-paintings') {
            setSelected('all-paintings');
        } else if (location.pathname === '/all-albums') {
            setSelected('albums');
        } else if (location.pathname === '/badges') {
            setSelected('badges');
        }
    }, [location]); // Depindem de schimbările URL-ului

    const handleNavigation = (path: string, item: string) => {
        setSelected(item); // Setează item-ul selectat
        navigate(path); // Navighează la ruta respectivă
    };

    return (
        <div className="sidebar" style={style}>
            <ul className="sidebar-list">
                <div
                    className={`sidebar-item ${selected === 'restoration' ? 'active' : ''}`}
                    onClick={() => handleNavigation('/', 'restoration')}
                >
                    Restoration
                </div>
                <div
                    className={`sidebar-item ${selected === 'all-paintings' ? 'active' : ''}`}
                    onClick={() => handleNavigation('/all-paintings', 'all-paintings')}
                >
                    All paintings
                </div>
                <div
                    className={`sidebar-item ${selected === 'albums' ? 'active' : ''}`}
                    onClick={() => handleNavigation('/all-albums', 'albums')}
                >
                    Albums
                </div>
                <div
                    className={`sidebar-item ${selected === 'badges' ? 'active' : ''}`}
                    onClick={() => handleNavigation('/badges', 'badges')}
                >
                    Badges
                </div>
            </ul>
        </div>
    );
}

export default Sidebar;
