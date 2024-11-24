import React, {useEffect, useState} from 'react';
import '../../styles/Drawer.css';
import {jwtDecode} from "jwt-decode";
import {useNavigate} from "react-router-dom";

interface UserToken {
    sub: string;
    iat: number;
    exp: number;
}

interface DrawerAddToAlbumProps {
    isOpen: boolean;
    onClose: () => void;
    selectedAlbumId: string | null;  // Adăugăm acest câmp pentru a selecta un album
    selectedPaintings: string[];
    onCreateAlbum: (title: string, description: string) => void;
    onSelectAlbum: (albumId: string | null) => void;
    onSaveSelection: (albumId: string, selectedPaintings: string[]) => void;
}

const DrawerAddToAlbum: React.FC<DrawerAddToAlbumProps> = ({
    isOpen,
    onClose,
    selectedAlbumId,
    selectedPaintings,
    onCreateAlbum,
    onSelectAlbum,
    onSaveSelection
}) => {
    const [newAlbumTitle, setNewAlbumTitle] = useState('');
    const [newAlbumDescription, setNewAlbumDescription] = useState('');
    const [isCreating, setIsCreating] = useState(false);
    const [toastMessage, setToastMessage] = useState<string | null>(null); // Mesajul pentru toast
    const [email, setEmail] = useState('');
    const [fetchedAlbums, setFetchedAlbums] = useState<{ description: string, galleryName: string }[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        const updateLastNameFromToken = () => {
            if (token) {
                const decodedToken = jwtDecode(token) as UserToken;
                const email = decodedToken.sub;
                setEmail(email);
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

    useEffect(() => {
        if (email) {
            // Obținem albumele din API
            fetchAlbums();
        }
    }, [email]);

    const fetchAlbums = async () => {
        if (email) {
            const url = `http://localhost:8080/api/v1/gallery/findAllByOwner?email-user=${encodeURIComponent(email)}`;

            try {
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'accept': '*/*',
                        'Authorization': `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setFetchedAlbums(data);  // Actualizăm albumele
                } else {
                    console.error('Error fetching albums');
                }
            } catch (error) {
                console.error('Error fetching albums:', error);
            }
        }
    };


    const handleCreateAlbum = async () => {
        if (newAlbumTitle.trim() !== '' && newAlbumDescription.trim() !== '') {
            // Pregătim datele de trimitere
            const albumData = {
                emailUser: email,
                galleryName: newAlbumTitle.trim(),
                galleryDescription: newAlbumDescription.trim(),
            };

            const token = localStorage.getItem("token");

            try {
                // Facem cererea POST pentru a crea un album nou
                const response = await fetch(`http://localhost:8080/api/v1/gallery/add?email-user=${encodeURIComponent(email)}&gallery-name=${encodeURIComponent(newAlbumTitle.trim())}&gallery-description=${encodeURIComponent(newAlbumDescription.trim())}`, {
                    method: 'POST',
                    headers: {
                        'Accept': '*/*',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    // Poți adăuga logica de succes, cum ar fi afisarea unui toast cu mesajul de succes
                    setToastMessage('Album created successfully');
                    setTimeout(() => setToastMessage(null), 3000);

                    // Reîncarcă albumele
                    await fetchAlbums();

                    // Resetăm câmpurile
                    setNewAlbumTitle('');
                    setNewAlbumDescription('');
                    setIsCreating(false);
                } else {
                    // Dacă cererea nu este OK, afișăm un mesaj de eroare
                    const errorData = await response.json();
                    setToastMessage(`Error: ${errorData.message}`);
                    setTimeout(() => setToastMessage(null), 3000);
                }
            } catch (error) {
                console.error('Error creating album:', error);
                setToastMessage('An error occurred while creating the album');
                setTimeout(() => setToastMessage(null), 3000);
            }
        } else {
            // Dacă titlul sau descrierea sunt goale
            setToastMessage('Please provide both title and description');
            setTimeout(() => setToastMessage(null), 3000);
        }
    };

    const handleSaveSelection = async (albumId: string) => {
        if (selectedAlbumId && selectedPaintings.length > 0) {
            try {
                for (let paintingName of selectedPaintings) {
                    const url = `http://localhost:8080/api/v1/painting/editGallery?email-user=${encodeURIComponent(email)}&painting-name=${encodeURIComponent(paintingName)}&gallery-name=${encodeURIComponent(selectedAlbumId)}`;

                    const response = await fetch(url, {
                        method: 'PUT',
                        headers: {
                            'accept': '*/*',
                            'Authorization': `Bearer ${localStorage.getItem("token")}`,
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ paintings: [paintingName] }),  // Trimite fiecare pictură pe rând
                    });

                    if (!response.ok) {
                        throw new Error(`Error saving painting ${paintingName}`);
                    }

                }

                // Dacă am ajuns aici, toate cererile au fost succes
                setToastMessage('Selection saved successfully!');
                setTimeout(() => setToastMessage(null), 3000);
                onSaveSelection(selectedAlbumId, selectedPaintings);
                onClose(); // Close the drawer
                navigate(`/album/${albumId}`);

            } catch (error) {
                console.error('Error saving paintings:', error);
                setToastMessage('An error occurred while saving the selection');
                setTimeout(() => setToastMessage(null), 3000);
            }
        } else {
            setToastMessage('Please select an album and paintings');
            setTimeout(() => setToastMessage(null), 3000);
        }
    };


    const handleAlbumSelect = (albumId: string) => {
        onSelectAlbum(albumId);
        const selectedAlbum = fetchedAlbums.find(album => album.galleryName === albumId);
        if (selectedAlbum) {
            setToastMessage(`You have selected the album: ${selectedAlbum.galleryName}`);
            setTimeout(() => setToastMessage(null), 3000);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="drawer">

            <div className="drawer-header">
                <button className="close-btn" onClick={() => {
                    onClose();
                    onSelectAlbum(null);
                }}>✖</button>
                <div className="text-paint-detail">{isCreating ? 'Create New Album' : 'Select an Album'}</div>
            </div>

            <div className="drawer-content">
                {/* Afișează toast-ul dacă există un mesaj */}
                {toastMessage && <div className="toast">{toastMessage}</div>}

                {!isCreating ? (
                    <>
                        <div className="albums-list">
                            {fetchedAlbums.length === 0 ? (
                                <p>No albums found</p>
                            ) : (
                                fetchedAlbums.map((album, index) => (
                                    <div
                                        key={index}
                                        className={`album-card ${selectedAlbumId === album.galleryName ? 'selected' : ''}`} // Adaugă clasa `selected` dacă albumul este selectat
                                        onClick={() => handleAlbumSelect(album.galleryName)}
                                    >
                                        <div className="album-title">{album.galleryName}</div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* {selectedAlbumId && (
                            <div className="message">
                                <p>You have selected the album: <strong>{albums.find(album => album.id === selectedAlbumId)?.title}</strong>.</p>
                                <p>On this page, you will add paintings to the album. This feature will be implemented soon!</p>
                            </div>
                        )} */}

                        <button
                            className="create-new-album-btn"
                            onClick={() => setIsCreating(true)}
                        >
                                Create New Album
                        </button>

                        <button className="save-select-album-btn" onClick={() => selectedAlbumId && handleSaveSelection(selectedAlbumId)}
                        >
                            Save the selection
                        </button>
                    </>
                ) : (
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

                        <label htmlFor="album-description">Album Description:</label>
                        <textarea
                            id="album-description"
                            value={newAlbumDescription}
                            className="label-input-description"
                            onChange={(e) => setNewAlbumDescription(e.target.value)}
                            placeholder="Enter album description..."
                        ></textarea>

                        <div className="save-cancel-btns">
                            <button className="save-btn" onClick={handleCreateAlbum}>
                                Save
                            </button>
                            <button
                                className="save-btn"
                                style={{backgroundColor: 'red'}}
                                onClick={() => setIsCreating(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DrawerAddToAlbum;