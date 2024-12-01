import React, { useEffect, useState } from 'react';
import '../../styles/Drawer.css';
import {jwtDecode} from "jwt-decode";

interface UserToken {
    sub: string;
    iat: number;
    exp: number;
}

interface DrawerProps {
    isOpen: boolean;
    onClose: () => void;
    painting: any; // Asigură-te că este Painting | null
    onUpdatePainting: (updatedPainting: any) => void;
}

const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose, painting, onUpdatePainting }) => {
    const [editedTitle, setEditedTitle] = useState(painting?.paintingName || ''); // Asigură-te că folosești paintingName
    const [editedAuthor, setEditedAuthor] = useState(painting?.author || '');
    const [editedDescription, setEditedDescription] = useState(painting?.description || '');
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [email, setEmail] = useState('');
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
        if (painting) {
            setEditedTitle(painting.paintingName || ''); // Asigură-te că folosești paintingName
            setEditedAuthor(painting.author || '');
            setEditedDescription(painting.description || '');
        }
    }, [painting]); // Reîmprospătează starea la schimbarea picturii

    const handleSave = async () => {
        if (painting) {
            const updatedPainting = {
                ...painting,
                paintingName: editedTitle,
                author: editedAuthor,
                description: editedDescription
            };

            try {
                const response = await fetch(`http://localhost:8080/api/v1/painting/edit/${encodeURIComponent(painting.paintingName)}?email-user=${encodeURIComponent(email)}&painting-name=${encodeURIComponent(painting.paintingName)}&new-painting-name=${encodeURIComponent(editedTitle)}&new-painting-description=${encodeURIComponent(editedDescription)}&new-author=${encodeURIComponent(editedAuthor)}`, {
                    method: 'PUT',
                    headers: {
                        'accept': '*/*',
                        'Authorization': `Bearer ${localStorage.getItem("token")}`
                    },
                });

                if (!response.ok) {
                    const contentType = response.headers.get("content-type");
                    if (contentType && contentType.includes("application/json")) {
                        const errorData = await response.json();
                        setError(errorData.message);
                    } else {
                        const errorText = await response.text();
                        setError(errorText);
                    }
                    console.error("Error updating painting:", error);
                    return;
                }

                onUpdatePainting(updatedPainting);
                painting.paintingName = editedTitle;
                painting.author = editedAuthor;
                painting.description = editedDescription;

                setIsEditing(false);
            } catch (error) {
                console.error("Error saving painting:", error);
                setError((error as Error).message);
            }
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false); // Anulează editările
        setEditedTitle(painting?.paintingName || '');
        setEditedAuthor(painting?.author || '');
        setEditedDescription(painting?.description || '');
    };

    if (!isOpen || !painting) return null;

    return (
        <div className="drawer">
            <div className="drawer-header">
                <button className="close-btn" onClick={onClose}>✖</button>
                <div className="text-paint-detail">{isEditing ? 'Edit Painting' : 'Painting Details'}</div>
            </div>

            <div className="drawer-content">
                <img src={painting.image} alt={painting.paintingName} className="drawer-image" /> {/* Folosește paintingName */}

                {isEditing ? (
                    <div className="edit-form">
                        <label htmlFor="title">Title:</label>
                        <input
                            type="text"
                            id="title"
                            placeholder={"Type.."}
                            value={editedTitle}
                            className="label-input-description"
                            onChange={(e) => setEditedTitle(e.target.value)}
                        />

                        <label htmlFor="author">Author:</label>
                        <input
                            type="text"
                            id="author"
                            placeholder={"Type.."}
                            value={editedAuthor}
                            className="label-input-description"
                            onChange={(e) => setEditedAuthor(e.target.value)}
                        />

                        <label htmlFor="description">Description:</label>
                        <textarea
                            id="description"
                            value={editedDescription}
                            placeholder={"Type.."}
                            className="label-input-description"
                            onChange={(e) => setEditedDescription(e.target.value)}
                        />
                        {error && (
                            <p className="error">{error}</p>
                        )}
                    </div>
                ) : (
                    <div className="view-form">
                        <p className="text-info" style={{ marginBottom: "8px" }}><strong>Title:</strong> {editedTitle}</p>
                        <p className="text-info" style={{ marginBottom: "8px" }}><strong>Author:</strong> {editedAuthor}</p>
                        <p className="text-info"><strong>Description:</strong> {editedDescription}</p>
                    </div>
                )}

                {isEditing ? (
                    <div className="save-cancel-btns">
                        <button className="save-btn" onClick={handleSave}>Save</button>
                        <button className="save-btn" style={{ backgroundColor: "red" }} onClick={handleCancel}>Cancel</button>
                    </div>
                ) : (
                    <>
                        <button className="edit-btn" onClick={handleEdit}>Edit</button>
                    </>
                )}
            </div>
        </div>
    );
};

export default Drawer;
