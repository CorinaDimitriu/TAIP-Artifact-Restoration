import React, { useEffect, useState } from 'react';
import '../../styles/Drawer.css'; // Stilurile drawer-ului

// interface DrawerProps {
//     isOpen: boolean;
//     onClose: () => void;
//     painting: any; // Sau poți să definești un tip mai specific
// }

// const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose, painting }) => {
//     if (!isOpen || !painting) return null; // Ascundem drawer-ul dacă nu e deschis sau nu există pictură selectată

//     return (
//         <div>
//             <div className="drawer-backdrop" onClick={onClose}></div> {/* Fundalul semitransparent */}
//             <div className="drawer">
//                 <div className="drawer-header">
//                     <h2>{painting.title}</h2>
//                     <button className="close-btn" onClick={onClose}>
//                         ✖
//                     </button>
//                 </div>

//                 <div className="drawer-content">
//                 <div className="drawer-content">
//                     <img src={painting.image} alt={painting.title} className="drawer-image" />

//                     <div className="author">
//                         <p><strong>Author:</strong> {painting.author}</p>
//                     </div>

//                     <div className="separator"></div> {/* Separator între autor și descriere */}

//                     <div className="description">
//                         <p><strong>Description:</strong> {painting.description}</p>
//                     </div>

//                     <button className="edit-btn">Edit</button>
//                 </div>

//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Drawer;



interface DrawerProps {
    isOpen: boolean;
    onClose: () => void;
    painting: any; // Pictura selectată
    onUpdatePainting: (updatedPainting: any) => void; // Funcția de actualizare a picturii
}

const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose, painting, onUpdatePainting }) => {
    const [editedTitle, setEditedTitle] = useState(painting?.title || '');
    const [editedAuthor, setEditedAuthor] = useState(painting?.author || '');
    const [editedDescription, setEditedDescription] = useState(painting?.description || '');
    const [isEditing, setIsEditing] = useState(false); // Pentru a porni modului de editare

    useEffect(() => {
        if (painting) {
            setEditedTitle(painting.title);
            setEditedAuthor(painting.author);
            setEditedDescription(painting.description);
        }
    }, [painting]);

    const handleSave = () => {
        const updatedPainting = { ...painting, title: editedTitle, author: editedAuthor, description: editedDescription };
        onUpdatePainting(updatedPainting);
        setIsEditing(false);
        // onClose();
    };

    const handleEdit = () => {
        setIsEditing(true); // Activăm modul de editare
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditedTitle(painting.title);
        setEditedAuthor(painting.author);
        setEditedDescription(painting.description);
    };

    if (!isOpen || !painting) return null;

    return (
        <div className="drawer">
            <div className="drawer-header">
                <button className="close-btn" onClick={onClose}>✖</button>
                <div className="text-paint-detail">{isEditing ? 'Edit Painting' : 'Painting Details'}</div>
            </div>


            <div className="drawer-content">
                    <img src={painting.image} alt={painting.title} className="drawer-image"/>

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
                        </div>
                    ) : (
                        // Dacă nu suntem în modul de editare, afișăm datele doar ca text
                        <div className="view-form">
                            <p className="text-info" style={{marginBottom:"8px"}}><strong>Title:</strong> {editedTitle}</p>
                            <p className="text-info" style={{marginBottom:"8px"}}><strong>Author:</strong> {editedAuthor}</p>
                            <p className="text-info"><strong>Description:</strong> {editedDescription}</p>
                        </div>
                    )}

                    {isEditing ? (
                        <div className="save-cancel-btns">
                            <button className="save-btn" onClick={handleSave}>Save</button>
                            <button className="save-btn" style={{backgroundColor:"red"}} onClick={handleCancel}>Cancel</button>
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