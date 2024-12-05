import React, { useEffect, useState } from 'react';
import '../../styles/DrawerAddPaintins.css';
import {jwtDecode} from "jwt-decode";
import {useNavigate, useParams} from "react-router-dom";

interface UserToken {
    sub: string;
    iat: number;
    exp: number;
}

interface Paintings {
    paintingName: string;
    description: string;
    author: string;
    image?: string;
    imageType?: string;
}

interface DrawerAddPaintingsProps {
    isOpen: boolean;
    onClose: () => void;
    isDrawerReloadPainting: boolean;
    setIsDrawerReloadPainting: (isDrawerReloadPainting: boolean) => void;
}

const DrawerAddPaintings: React.FC<DrawerAddPaintingsProps> = ({ isOpen, onClose, isDrawerReloadPainting,setIsDrawerReloadPainting}) => {
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const [paintings, setPaintings] = useState<Paintings[]>([]);
    const [selectedCard, setSelectedCard] = useState<number | null>(null);
    const [selectedPaintings, setSelectedPaintings] = useState<string[]>([]);
    const [isSelectionMode, setIsSelectionMode] = useState(false);
    const { albumTitle } = useParams();

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

    const uint8ArrayToBase64 = (uint8Array: Uint8Array): string => {
        let binary = '';
        for (let i = 0; i < uint8Array.length; i++) {
            binary += String.fromCharCode(uint8Array[i]);
        }
        return btoa(binary);
    };

    const updateImages = (data: Paintings[]): Paintings[] => {
        return data.map((painting) => {
            if (painting.image) {
                const uint8Array = new Uint8Array(atob(painting.image).split('').map(char => char.charCodeAt(0)));
                const base64String = uint8ArrayToBase64(uint8Array);
                painting.image = `data:image/png;base64,${base64String}`;
            }
            return painting;
        });
    };

    useEffect(() => {
        fetchPaintings();

        if (email && albumTitle) {
            fetchPaintings();
        }
    }, [email, albumTitle]);

    useEffect(() => {
        if (isDrawerReloadPainting) {
            fetchPaintings();
            setIsDrawerReloadPainting(false); // Reset the reload flag after fetching
        }
    }, [isDrawerReloadPainting, email, albumTitle]);


    const fetchPaintings = async () => {
        const token = localStorage.getItem("token");
        if (!token || !email) {
            console.error("Missing token or email.");
            return;
        }
        if (!albumTitle) {
            console.error("Album title is missing!");
            return;
        }

        const allPaintingsUrl = `http://localhost:8080/api/v1/painting/findAllByOwner?email-user=${encodeURIComponent(email)}`;
        const galleryPaintingsUrl = `http://localhost:8080/api/v1/painting/findAllByOwnerAndGallery?email-user=${encodeURIComponent(email)}&gallery-name=${encodeURIComponent(albumTitle)}`;

        try {
            const allPaintingsResponse = await fetch(allPaintingsUrl, {
                method: 'GET',
                headers: {
                    'accept': '*/*',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!allPaintingsResponse.ok) {
                const errorData = await allPaintingsResponse.json();
                console.error(`Error fetching all paintings: ${errorData.message || allPaintingsResponse.statusText}`);
                return;
            }

            const allPaintingsData: Paintings[] = await allPaintingsResponse.json();
            const updatedAllPaintings = updateImages(allPaintingsData);

            const galleryPaintingsResponse = await fetch(galleryPaintingsUrl, {
                method: 'GET',
                headers: {
                    'accept': '*/*',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!galleryPaintingsResponse.ok) {
                const errorData = await galleryPaintingsResponse.json();
                console.error(`Error fetching gallery paintings: ${errorData.message || galleryPaintingsResponse.statusText}`);
                return;
            }

            const galleryPaintingsData: Paintings[] = await galleryPaintingsResponse.json();
            const updatedGalleryPaintings = updateImages(galleryPaintingsData);

            const paintingsToShow = updatedAllPaintings.filter(painting =>
                !updatedGalleryPaintings.some(galleryPainting => galleryPainting.paintingName === painting.paintingName)
            );

            setPaintings(paintingsToShow);
            if (paintingsToShow.length === 0) {
                setError("No painting to add. \n" +
                    "The album already contains all the paintings.");
            }

        } catch (error) {
            console.error("Error fetching paintings:", error);
        }
    };


    const handleToggleSelectionMode = () => {
        setIsSelectionMode(!isSelectionMode);
        setSelectedPaintings([]);
    };

    const toggleSelectPainting = (id: string) => {
        setSelectedPaintings((prevSelected) =>
            prevSelected.includes(id)
                ? prevSelected.filter((paintingId) => paintingId !== id)
                : [...prevSelected, id]
        );
    };

    const handleCardClick = (painting: Paintings, index: number) => {
        if (isSelectionMode) {
            toggleSelectPainting(painting.paintingName);
        } else {
            setSelectedCard(selectedCard === index ? null : index);
        }
    };
    const handleAddSelectedPaintings = async () => {
        if (selectedPaintings.length === 0) {
            console.error("No paintings selected.");
            return;
        }
        if (!email || !albumTitle) {
            console.error("Email or album title is undefined.");
            return;
        }
        if (selectedPaintings.length > 0){
            try {
                for (const paintingName of selectedPaintings) {
                    if (!paintingName) {
                        console.error("Painting name is undefined.");
                        continue;
                    }
                    const url = `http://localhost:8080/api/v1/painting/editGallery?email-user=${encodeURIComponent(email)}&painting-name=${encodeURIComponent(paintingName)}&gallery-name=${encodeURIComponent(albumTitle)}`;
                    const response = await fetch(url, {
                        method: 'PUT',
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem("token")}`,
                            'Content-Type': 'application/json',
                        },
                    });
                    if (!response.ok) {
                        throw new Error(`Failed to add painting: ${paintingName}`);
                    }
                }
                // const updatedPaintings = paintings.filter(
                //     (painting) => !selectedPaintings.includes(painting.paintingName)
                // );

                setIsDrawerReloadPainting(true);
                setSelectedPaintings([]);

                //
                // setPaintings(updatedPaintings);
                // setSelectedPaintings([]);
            } catch (error) {
                console.error('Error saving paintings:', error);
            }
        }
    };

    if (!isOpen) return null;

    return (
        <div className={`drawer3 ${isOpen ? 'open' : ''}`}>
            <div className="drawer-header3">
                <button className="close-btn" onClick={onClose}>✖</button>
                <div className="text-paint-detail2">Add paintings</div>
            </div>

            <div className="drawer-button-container">
                {paintings.length>=1 && (
                    <button
                        className={`add-painting-btn2 ${isSelectionMode ? 'cancel' : 'select'}`}
                        onClick={handleToggleSelectionMode}
                    >
                        {isSelectionMode ? "Cancel Selection" : "Select Images"}
                    </button>
                )}

            </div>

            <div className="drawer-content3">

                {paintings.map((painting, index) => (
                    <div
                        key={index}
                        className={`painting-card2 ${selectedPaintings.includes(painting.paintingName) ? "selected2" : ""}`}

                        onClick={() => handleCardClick(painting, index)}
                    >
                        {isSelectionMode && (
                            <div
                                className="checkbox-container"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleSelectPainting(painting.paintingName);
                                }}
                            >
                                <input
                                    type="checkbox"
                                    checked={selectedPaintings.includes(painting.paintingName)}
                                    readOnly
                                    className="checkbox"
                                />
                            </div>
                        )}
                        <img
                            src={painting.image}
                            alt={painting.paintingName}
                            className="painting-card-image"
                        />
                        {selectedCard === index ? (
                            <div className="painting-card-overlay">
                                <p className="painting-card-description">{painting.description}</p>
                            </div>
                        ) : (
                            <h3 className="painting-card-title">{painting.paintingName}</h3>
                        )}
                    </div>
                ))}
                {paintings.length < 1 && <p className="error-message" style={{fontSize:"1rem",fontWeight:"bold"}}>{error}</p>}
            </div>

            {selectedPaintings.length > 0 && (
                <div className="drawer-footer">
                    <button
                        className="add-selected-btn"
                        onClick={handleAddSelectedPaintings}
                        disabled={selectedPaintings.length === 0}
                    >
                        Add selected paintings
                    </button>
                </div>
            )}

        </div>
    );
};

export default DrawerAddPaintings;
