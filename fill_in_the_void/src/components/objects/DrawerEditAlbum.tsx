import React, { useState } from 'react';
import '../../styles/DrawerEditAlbum.css'; // Poți folosi aceleași stiluri sau stiluri personalizate

interface DrawerEditAlbumProps {
  isOpen: boolean;
  onClose: () => void;
  albumTitle: string;
  albumDescription: string;
  onSave: (title: string, description: string) => void;
}

const DrawerEditAlbum: React.FC<DrawerEditAlbumProps> = ({
  isOpen,
  onClose,
  albumTitle,
  albumDescription,
  onSave,
}) => {
  const [name, setName] = useState(albumTitle);
  const [description, setDescription] = useState(albumDescription);

  const handleSave = () => {
    onSave(name, description);  // Salvează schimbările
    onClose(); // Închide drawer-ul după salvare
  };

  return (
    <div className={`edit-album-drawer ${isOpen ? 'open' : ''}`} onClick={onClose}>
      <div className="drawer-content" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <button className="close-btn" onClick={onClose}>
            ✖
          </button>
          <div className="text-paint-detail">Edit Album</div>
        </div>

        <div className="drawer-form">
          <input
            type="text"
            className="input-field"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Album Name"
          />
          <textarea
            className="input-field"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Album Description"
          ></textarea>
          <button className="save-btn" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default DrawerEditAlbum;
