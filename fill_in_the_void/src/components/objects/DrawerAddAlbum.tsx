import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import '../../styles/DrawerAddAlbum.css';
import {jwtDecode} from "jwt-decode";

interface UserToken {
    sub: string;
    iat: number;
    exp: number;
}

interface Album {
    galleryName: string;
    description: string;
    image?: string;
}

interface DrawerAddAlbumProps {
    isOpen: boolean;
    onClose: () => void;
    albums: Album[];
    onCreateAlbum: (title: string, description: string) => void;
    newAlbumTitle: string; 
    setNewAlbumTitle: Dispatch<SetStateAction<string>>;
    newAlbumDescription: string; // New prop for description
    setNewAlbumDescription: Dispatch<SetStateAction<string>>;
}

const DrawerAddAlbum: React.FC<DrawerAddAlbumProps> = ({ isOpen, onClose, albums, onCreateAlbum, newAlbumTitle, setNewAlbumTitle,newAlbumDescription,
                                                           setNewAlbumDescription }) => {
    const [error, setError] = useState<string>('');
    const [email, setEmail] = useState('');
    useEffect(() => {
        const token = localStorage.getItem("token");

        const updateLastNameFromToken = () => {
            if (token) {
                const decodedToken = jwtDecode(token) as UserToken;
                const email = decodedToken.sub;
                setEmail(email);
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

    const handleCreateAlbum = async () => {
        if (
            albums.some(
                (album) =>
                    album.galleryName.toLowerCase() === newAlbumTitle.trim().toLowerCase() // Use `galleryName` here
            )
        ) {
            setError("An album with this title already exists. Please choose another title.");
            return;
        }

        if (newAlbumTitle.trim() !== "") {
            try {
                const token = localStorage.getItem("token"); // Token din localStorage
                const url = `http://localhost:8080/api/v1/gallery/add?email-user=${encodeURIComponent(email)}&gallery-name=${encodeURIComponent(newAlbumTitle)}&gallery-description=${encodeURIComponent(newAlbumDescription)}`;

                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'accept': '*/*',
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json', // Dacă trimiteți JSON în body (în acest caz nu este necesar)
                    },
                    body: '' // Specificați corpul dacă endpoint-ul o cere
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    setError(`Error: ${errorData.message || response.statusText}`);
                    return;
                }

                onCreateAlbum(newAlbumTitle.trim(), newAlbumDescription.trim());
                setNewAlbumTitle("");
                setNewAlbumDescription("");
                setError("");
                onClose();
            } catch (error) {
                setError("An error occurred while creating the album.");
                console.error("Error:", error);
            }
        }
    };

    if (!isOpen) return null;

    return (
        <div className={`drawer2 ${isOpen ? 'open' : ''}`}>
            <div className="drawer-header2">
                <button className="close-btn" onClick={onClose}>✖</button>
                <div className="text-paint-detail">Create New Album</div>
            </div>

            <div className="drawer-content2">
                <div className="edit-form">
                    <label htmlFor="album-title">Album Title:</label>
                    <input
                        type="text"
                        id="album-title"
                        value={newAlbumTitle}
                        className="label-input-description"
                        onChange={(e) => setNewAlbumTitle(e.target.value)}
                        placeholder="Enter album title..."
                    />

                    <label htmlFor="album-title">Album Description:</label>
                    <textarea
                        id="album-description"
                        value={newAlbumDescription}
                        className="label-input-description"
                        style={{height: "250px"}}
                        onChange={(e) => setNewAlbumDescription(e.target.value)}
                        placeholder="Enter album description..."
                    ></textarea>

                    {error && <div className="error-message">{error}</div>}

                    <div className="drawer-buttons">
                        <button className="save-btn2"
                                onClick={handleCreateAlbum}
                                disabled={newAlbumTitle.trim() === ''}
                        >
                            Save
                        </button>
                        <button
                            className="cancel-btn2"
                            onClick={() => {
                                setNewAlbumTitle('');
                                setError('');
                            }}
                            disabled={newAlbumTitle.trim() === ''}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DrawerAddAlbum;