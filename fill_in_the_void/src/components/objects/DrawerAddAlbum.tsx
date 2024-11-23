import React, { Dispatch, SetStateAction, useState } from 'react';
import '../../styles/DrawerAddAlbum.css';

interface DrawerAddAlbumProps {
    isOpen: boolean;
    onClose: () => void;
    albums: { id: string; title: string }[]; 
    onCreateAlbum: (title: string) => void;
    newAlbumTitle: string; 
    setNewAlbumTitle: Dispatch<SetStateAction<string>>;
}

const DrawerAddAlbum: React.FC<DrawerAddAlbumProps> = ({ isOpen, onClose, albums, onCreateAlbum, newAlbumTitle, setNewAlbumTitle }) => {
    const [error, setError] = useState<string>('');

    const handleCreateAlbum = () => {
        if (albums.some((album) => album.title.toLowerCase() === newAlbumTitle.trim().toLowerCase())) {
            setError('An album with this title already exists. Please choose another title.');
            return;
        }

        if (newAlbumTitle.trim() !== '') {
            onCreateAlbum(newAlbumTitle.trim()); 
            setNewAlbumTitle(''); 
            setError(''); 
            onClose();
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