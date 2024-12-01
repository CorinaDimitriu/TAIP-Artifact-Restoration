import React, {useEffect, useState} from "react";
import Header from "../objects/Header";
import Navbar from "../objects/Navbar";
import Sidebar from "../objects/Sidebar";
import "../../styles/AllAlbums.css";
import "../../index.css";
import monaLisa from "../images/mona-lisa.jpg";
import {useNavigate} from "react-router-dom";
import DrawerAddAlbum from "../objects/DrawerAddAlbum";
import DrawerEditAlbum from "../objects/DrawerEditAlbum";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import {jwtDecode} from "jwt-decode";

interface UserToken {
    sub: string;
    iat: number;
    exp: number;
}


// const albumsData = [
//     { id: "1", title: "Vacation 2021", image: monaLisa, description:"cel mai fain" },
//     { id: "2", title: "Family Memories", image: monaLisa, description:"cel mai fain" },
//     { id: "3", title: "Graduation Day", image: monaLisa, description:"cel mai fain" },
//     { id: "4", title: "Wedding Photos", image: monaLisa, description:"cel mai fain" },
// ];

interface Album {
    galleryName: string;
    description: string;
    image?: string;
}

const AllAlbums: React.FC = () => {
    const [email, setEmail] = useState('');

    const [albums, setAlbums] = useState<Album[]>([]);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
    const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
    const [newAlbumTitle, setNewAlbumTitle] = useState('');
    const [newAlbumDescription, setNewAlbumDescription] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        const updateLastNameFromToken = () => {
            if (token) {
                const decodedToken = jwtDecode(token) as UserToken;
                const email = decodedToken.sub;
                setEmail(email);
                fetchAlbums(email);
                // fetchFirstName(decodedToken.sub);
            }
        };

        updateLastNameFromToken();

        const handleStorageChange = () => {
            updateLastNameFromToken();
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const fetchAlbums = async (email: string) => {

        const token = localStorage.getItem("token");
        const headers = { 'Authorization': `Bearer ${token}` };
        fetch(`http://localhost:8080/api/v1/gallery/findAllByOwner?email-user=${encodeURIComponent(email)}`, { headers })
            .then(response => response.json())
            .then(data => setAlbums(data));
    };

    const handleAlbumClick = (albumTitle: string) => {
        navigate(`/album/${albumTitle}`);
    };

    const handleCreateAlbum = (title: string, description: string) => {
        const newAlbum = {
            galleryName: title,
            description,
            image: monaLisa,
        };
        setAlbums([...albums, newAlbum]);
    };

    const openEditAlbumDrawer = (album: Album) => {
        setSelectedAlbum(album);
        setIsEditDrawerOpen(true);
    };

    const closeEditAlbumDrawer = () => {
        setIsEditDrawerOpen(false);
        setSelectedAlbum(null);
    };

    const saveAlbumChanges = async (newTitle: string, newDescription: string) => {
        if (!selectedAlbum) return;

        const updatedAlbum = {
            ...selectedAlbum,
            galleryName: newTitle,
            description: newDescription
        };

        // Update the album in the backend (example URL)
        const url = `http://localhost:8080/api/v1/gallery/edit?email-user=${encodeURIComponent(email)}&gallery-name=${encodeURIComponent(selectedAlbum.galleryName)}&new-gallery-name=${encodeURIComponent(newTitle)}&new-gallery-description=${encodeURIComponent(newDescription)}`;

        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (!response.ok) {
                console.error('Error updating the album');
                return;
            }

            const updatedAlbums = albums.map(album =>
                album.galleryName === selectedAlbum.galleryName
                    ? updatedAlbum
                    : album
            );

            setAlbums(updatedAlbums);
            closeEditAlbumDrawer(); // Close the drawer after saving changes
        } catch (error) {
            console.error('Error updating the album:', error);
        }
    };

    const deleleAlbum = async (albumTitle: string) => {
        const url = `http://localhost:8080/api/v1/gallery/delete?email-user=${encodeURIComponent(email)}&gallery-name=${encodeURIComponent(albumTitle)}`;

        try {
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (!response.ok) {
                console.error('Error deleting the album');
                return;
            }

            const updatedAlbums = albums.filter(album => album.galleryName !== albumTitle);
            setAlbums(updatedAlbums);
        } catch (error) {
            console.error('Error deleting the album:', error);
        }
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <Header />
            <Navbar />

            <div className="content">
                <Sidebar />

                <div className="page-header">
                    <button className="add-painting-btn select" onClick={() => setIsDrawerOpen(true)}>Create album</button>
                    <div className="page-title2">Albums</div>
                </div>

                <div style={{ display: "flex", flex: 1 }}>
                    <div className="album-container">
                        {albums.map((album, index) => (
                            <div className="album-card" key={index} onClick={() => handleAlbumClick(album.galleryName)}>
                                <img src={album.image || monaLisa} alt={album.galleryName} className="album-image" />
                                <div className="album-title">{album.galleryName}</div>
                                <div className="description-album">
                                    <b>Description: </b>{album.description}
                                </div>
                                <div className="poz-btn-icon">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation(); // Previne propagarea click-ului
                                            openEditAlbumDrawer(album);
                                        }}
                                        className="edit-album-btn"
                                    >
                                        <MdEdit style={{fontSize: "14px", marginRight: "8px"}}/>
                                        Edit Album
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation(); // Previne propagarea click-ului
                                            deleleAlbum(album.galleryName);
                                        }}
                                        className="delete-album-btn">
                                        <MdDelete style={{fontSize: "14px", marginRight: "8px"}}/>
                                        Delete Album
                                    </button>
                                </div>

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
                newAlbumDescription={newAlbumDescription}
                setNewAlbumDescription={setNewAlbumDescription}
            />

            <DrawerEditAlbum
                isOpen={isEditDrawerOpen}
                onClose={closeEditAlbumDrawer}
                album={selectedAlbum}
                onSave={saveAlbumChanges}
            />
        </div>
    );
};

export default AllAlbums;