import React, { useState } from 'react';
import '../../styles/Drawer.css';

interface DrawerAddToAlbumProps {
    isOpen: boolean;
    onClose: () => void;
    albums: { id: string; title: string }[]; 
    selectedAlbumId: string | null;  // Adăugăm acest câmp pentru a selecta un album
    onCreateAlbum: (title: string) => void;
    onSelectAlbum: (albumId: string | null) => void;
}

const DrawerAddToAlbum: React.FC<DrawerAddToAlbumProps> = ({
    isOpen,
    onClose,
    albums,
    selectedAlbumId,
    onCreateAlbum,
    onSelectAlbum
}) => {
    const [newAlbumTitle, setNewAlbumTitle] = useState('');
    const [isCreating, setIsCreating] = useState(false);
    const [toastMessage, setToastMessage] = useState<string | null>(null); // Mesajul pentru toast
    const handleCreateAlbum = () => {
        if (newAlbumTitle.trim() !== '') {
            onCreateAlbum(newAlbumTitle.trim());
            setNewAlbumTitle('');
            setIsCreating(false);
        }
    };

    const handleAlbumSelect = (albumId: string) => {

        onSelectAlbum(albumId);
        // aici o sa bag si functia prin care adaug in album propriu-zis
        const selectedAlbum = albums.find(album => album.id === albumId);
        if (selectedAlbum) {
            setToastMessage(`You have selected the album: ${selectedAlbum.title}`);
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
                            {albums.map((album) => (
                                <div
                                    key={album.id}
                                    className={`album-card ${selectedAlbumId === album.id ? 'selected' : ''}`} // Adaugă clasa `selected` dacă albumul este selectat
                                    onClick={() => handleAlbumSelect(album.id)}
                                >
                                    <div className="album-title">{album.title}</div>
                                </div>
                            ))}
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

                        <button className="save-select-album-btn">
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
                        <div className="save-cancel-btns">
                            <button className="save-btn" onClick={handleCreateAlbum}>
                                Save
                            </button>
                            <button
                                className="save-btn"
                                style={{ backgroundColor: 'red' }}
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