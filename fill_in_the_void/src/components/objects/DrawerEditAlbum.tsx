import React, { useState, useEffect } from 'react';
import '../../styles/DrawerEditAlbum.css';

interface DrawerEditAlbumProps {
    isOpen: boolean;
    onClose: () => void;
    album: { galleryName: string, description: string, image?: string } | null;
    onSave: (title: string, description: string) => void;
}

const DrawerEditAlbum: React.FC<DrawerEditAlbumProps> = ({
                                                             isOpen,
                                                             onClose,
                                                             album,
                                                             onSave,
                                                         }) => {
    // Inițializăm starea pentru titlu și descriere
    const [name, setName] = useState(album?.galleryName || '');
    const [description, setDescription] = useState(album?.description || '');

    // Actualizăm starea atunci când albumul se schimbă
    useEffect(() => {
        if (album) {
            setName(album.galleryName);
            setDescription(album.description);
        }
    }, [album]);

    const handleSave = () => {
        if (album) {
            onSave(name, description);  // Salvează schimbările
            onClose();  // Închide drawer-ul după salvare
        }
    };

    if (!album) return null;  // Dacă nu există un album, nu returnăm nimic

    return (
        <div className={`edit-album-drawer ${isOpen ? 'open' : ''}`} onClick={onClose}>
            <div className="drawer-content" onClick={(e) => e.stopPropagation()}>
                <div className="drawer-header">
                    <button className="close-btn" onClick={onClose}>
                        ✖
                    </button>
                    <div className="text-paint-detail">Edit Album</div>
                </div>
                <div className="edit-form" style={{width:"400px"}}>
                    <label htmlFor="title">Album Name:</label>
                    <input
                        type="text"
                        className="label-input-description"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Album Name"
                    />
                    <label htmlFor="description">Description:</label>
                    <textarea
                        className="label-input-description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Album Description"
                    ></textarea>
                    <button className="save-btn" onClick={handleSave} style={{marginLeft: "0", width:"fit-content"}}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DrawerEditAlbum;
