import React, { useState } from "react";
import Header from "../objects/Header";
import Navbar from "../objects/Navbar";
import Sidebar from "../objects/Sidebar";
import Drawer from "../objects/Drawer";
import DrawerAddAlbum from "../objects/DrawerAddToAlbum";
import "../../styles/AllPaintings.css";
import "../../index.css";
import monaLisa from "../images/mona-lisa.jpg";
// import {useNavigate} from "react-router-dom";


const paintingsData = [
    {id: "1", title: "Mona Lisa", author: "Leonardo da Vinci", description: "asdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdThe Mona Lisa is a painting by Leonardo da Vinci.", image: monaLisa},
    {id: "2", title: "The Persistence of Memory", author: "Salvador Dali", description: "The Persistence of Memory is a painting by Salvador Dali.", image: monaLisa},
    {id: "3", title: "The Scream", author: "Edvard Munch", description: "The Scream is a painting by Edvard Munch.", image: monaLisa},
    {id: "4", title: "The Kiss", author: "Salvador Dali", description: "The Kiss is a painting by Salvador Dali.", image: monaLisa},
    {id: "5", title: "The Birth of Venus", author: "Leonardo da Vinci", description: "The Birth of Venus is a painting by Leonardo da Vinci.", image: monaLisa},
    {id: "6", title: "Mona Lisa", author: "Leonardo da Vinci", description: "The Mona Lisa is a painting by Leonardo da Vinci.", image: monaLisa}
]

const AllPaintings: React.FC = () => {
    const [paintings, setPaintings] = useState(paintingsData);
    const [selectedPaintings, setSelectedPaintings] = useState<string[]>([]);
    const [isSelectionMode, setIsSelectionMode] = useState(false);
    const [selectedPainting, setSelectedPainting] = useState<any>(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const [isAlbumDrawerOpen, setIsAlbumDrawerOpen] = useState(false);
    const [albums, setAlbums] = useState([
        { id: "1", title: "Vacation 2021" },
        { id: "2", title: "Family Memories" },
        { id: "3", title: "Graduation Day" },
        { id: "4", title: "Wedding Photos" },
    ]);
    const [selectedAlbumId, setSelectedAlbumId] = useState<string | null>(null);

    // Funcționalități pentru drawer-ul albumelor
    const handleOpenAlbumDrawer = () => {
        setIsAlbumDrawerOpen(true);
    };

    const handleCloseAlbumDrawer = () => {
        setIsAlbumDrawerOpen(false);
    };

    const handleCreateAlbum = (title: string) => {
        const newAlbum = {
            id: (albums.length + 1).toString(),
            title,
        };
        setAlbums([...albums, newAlbum]);
        setSelectedAlbumId(newAlbum.id); // Selectăm automat noul album
        setIsAlbumDrawerOpen(true); // Rămânem în drawer cu albumul selectat
    };

    const handleSelectAlbum = (albumId: string) => {
        console.log(`Selected album ID: ${albumId}`);
        setSelectedAlbumId(albumId);
    };

    // Funcționalități pentru selecție imagini
    const toggleSelectPainting = (id: string) => {
        setSelectedPaintings((prevSelected) =>
            prevSelected.includes(id)
                ? prevSelected.filter((paintingId) => paintingId !== id)
                : [...prevSelected, id]
        );
    };

    const handleToggleSelectionMode = () => {
        setIsSelectionMode(!isSelectionMode);
        setSelectedPaintings([]); // Resetăm selecția la ieșirea din modul de selecție
    };

    const handlePaintingClick = (painting: any) => {
        if (isSelectionMode) {
            toggleSelectPainting(painting.id);
        } else {
            setSelectedPainting(painting);
            setIsDrawerOpen(true);
        }
    };

    const closeDrawer = () => {
        setIsDrawerOpen(false);
        setSelectedPainting(null);
    };

    const updatePainting = (updatedPainting: any) => {
        setPaintings((prevPaintings) =>
            prevPaintings.map((painting) =>
                painting.id === updatedPainting.id ? updatedPainting : painting
            )
        );
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <Header />
            <Navbar />
            <div className="content">
                <Sidebar />
                <div className="page-header">
                    <button className="add-painting-btn" onClick={handleToggleSelectionMode}>
                        {isSelectionMode ? "Cancel Selection" : "Select Images"}
                    </button>
                    <div className="page-title2">Paintings</div>
                </div>

                <div style={{ display: "flex", flex: 1 }}>
                    <div className="paintings-container">
                        {paintings.map((painting) => (
                            <div
                                className={`painting-card ${selectedPaintings.includes(painting.id) ? "selected" : ""}`}
                                key={painting.id}
                                onClick={() => handlePaintingClick(painting)}
                            >
                                {isSelectionMode && (
                                    <div
                                        className="checkbox-container"
                                        onClick={(e) => {
                                            e.stopPropagation(); // Previne propagarea click-ului la card
                                            toggleSelectPainting(painting.id);
                                        }}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={selectedPaintings.includes(painting.id)}
                                            readOnly
                                            className="checkbox"
                                        />
                                    </div>
                                )}
                                <img src={painting.image} alt={painting.title} className="painting-image" />
                                <div className="painting-title">{painting.title}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Buton Make Album apare doar dacă există selecții */}
                {selectedPaintings.length > 0 && (
                    <button className="edit-btn" onClick={handleOpenAlbumDrawer}>
                        Add to Album
                    </button>
                )}

                {/* Drawer pentru albume */}
                <DrawerAddAlbum
                    isOpen={isAlbumDrawerOpen}
                    onClose={handleCloseAlbumDrawer}
                    albums={albums}
                    selectedAlbumId={selectedAlbumId}
                    onCreateAlbum={handleCreateAlbum}
                    onSelectAlbum={handleSelectAlbum}
                />

                {/* Drawer pentru detalii pictură */}
                <Drawer
                    isOpen={isDrawerOpen}
                    onClose={closeDrawer}
                    painting={selectedPainting}
                    onUpdatePainting={updatePainting}
                />
            </div>
        </div>
    );
};

export default AllPaintings;