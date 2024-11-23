import React, { useState } from "react";
import Header from "../objects/Header";
import Navbar from "../objects/Navbar";
import Sidebar from "../objects/Sidebar";
import "../../styles/AllAlbums.css";
import "../../index.css";
import monaLisa from "../images/mona-lisa.jpg";
import {useNavigate} from "react-router-dom";
import DrawerAddAlbum from "../objects/DrawerAddAlbum";
const albumsData = [
    { id: "1", title: "Vacation 2021", image: monaLisa },
    { id: "2", title: "Family Memories", image: monaLisa },
    { id: "3", title: "Graduation Day", image: monaLisa },
    { id: "4", title: "Wedding Photos", image: monaLisa },
];

const AllAlbums: React.FC = () => {
    const [albums, setAlbums] = useState(albumsData);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false); 
    const [newAlbumTitle, setNewAlbumTitle] = useState('');  
    const navigate = useNavigate();

    const handleAlbumClick = (albumId: string, albumTitle: string) => {
        navigate(`/album/${albumId}/${albumTitle}`);
    };

    const handleCreateAlbum = (title: string) => {
        const newAlbum = {
            id: (albums.length + 1).toString(),
            title,
            image: monaLisa, // aici dau pe moment poza predefinita
        };
        setAlbums([...albums, newAlbum]);
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <Header />
            <Navbar />

            <div className="content">
                <Sidebar />

                <div className="page-header">
                    <button className="add-painting-btn" onClick={() => setIsDrawerOpen(true)}>Create album</button>
                    <div className="page-title2">Albums</div>
                </div>

                <div style={{ display: "flex", flex: 1 }}>
                    <div className="album-container">
                        {albums.map((album) => (
                            <div className="album-card" key={album.id} onClick={() => handleAlbumClick(album.id, album.title)}>
                                <img src={album.image} alt={album.title} className="album-image" />
                                <div className="album-title">{album.title}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <DrawerAddAlbum
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                albums={albums}
                onCreateAlbum={handleCreateAlbum}
                newAlbumTitle={newAlbumTitle}
                setNewAlbumTitle={setNewAlbumTitle}
            />
        </div>
    );
};

export default AllAlbums;