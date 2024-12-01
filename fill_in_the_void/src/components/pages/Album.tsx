import React, {useEffect, useState} from "react";
import Sidebar from "../objects/Sidebar";
import "../../styles/Album.css";
import "../../index.css";
import {useLocation, useParams} from "react-router-dom";
import monaLisa from "../images/mona-lisa.jpg";
import HeaderAlbum from "../objects/HeaderAlbum";
import {jwtDecode} from "jwt-decode";
import DrawerViewImageDetails from "../objects/DrawerViewImageDetails";

interface UserToken {
    sub: string;
    iat: number;
    exp: number;
}

interface Paintings {
    description: string;
    author: string;
    paintingName: string;
    image: string;
    imageType: string;
}

const Album: React.FC = () => {
    const [email, setEmail] = useState('');
    const [paintings, setPaintings] = useState<Paintings[]>([]);
    const [selectedPaintings, setSelectedPaintings] = useState<string[]>([]);
    const [isSelectionMode, setIsSelectionMode] = useState(false);
    const location = useLocation();
    const { albumTitle } = useParams();

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

    const toggleSelectPainting = (painting: Paintings) => {
        setSelectedPaintings((prevSelected) =>
            prevSelected.includes(painting.paintingName)
                ? prevSelected.filter((name) => name !== painting.paintingName)
                : [...prevSelected, painting.paintingName]
        );
    };
    const handleToggleSelectionMode = () => {
        setIsSelectionMode((prev) => !prev);
        setSelectedPaintings([]);
    };
    const handleDeleteSelectedPaintings = async () => {
        if (!email || !albumTitle) {
            console.error("Email or album title is undefined.");
            return;
        }

        try {
            for (const paintingName of selectedPaintings) {
                if (!paintingName) {
                    console.error("Painting name is undefined.");
                    continue;
                }

                const url = `http://localhost:8080/api/v1/painting/removeFromGallery?email-user=${encodeURIComponent(email)}&painting-name=${encodeURIComponent(paintingName)}&gallery-name=${encodeURIComponent(albumTitle)}`;

                const response = await fetch(url, {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("token")}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error(`Failed to delete painting: ${paintingName}`);
                }
            }

            const updatedPaintings = paintings.filter(
                (painting) => !selectedPaintings.includes(painting.paintingName)
            );
            setPaintings(updatedPaintings);
            setSelectedPaintings([]);
        } catch (error) {
            console.error('Error deleting paintings:', error);
        }
    };


    const handleCardClick = (painting: Paintings) => {
        if (isSelectionMode) {
            toggleSelectPainting(painting);
        } else {
            openDrawerViewImageDetails(painting);
        }
    };

    const [selectedPainting, setSelectedPainting] = useState<Paintings | null>(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);


    const openDrawerViewImageDetails = (painting: Paintings) => {
        setSelectedPainting(painting);
        setIsDrawerOpen(true);
    };

    const closeDrawerViewImageDetails = () => {
        setIsDrawerOpen(false);
        setSelectedPainting(null);
    };

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
                // Verificăm dacă avem date în câmpul `image` și le transformăm în Base64
                const uint8Array = new Uint8Array(atob(painting.image).split('').map(char => char.charCodeAt(0)));
                const base64String = uint8ArrayToBase64(uint8Array);
                // Actualizăm câmpul `image` cu stringul Base64
                painting.image = `data:image/png;base64,${base64String}`;
            }
            return painting;
        });
    };

    useEffect(() => {
        if (!email || !albumTitle) return;

        const fetchPaintings = async () => {
            const url = `http://localhost:8080/api/v1/painting/findAllByOwnerAndGallery?email-user=${encodeURIComponent(email)}&gallery-name=${encodeURIComponent(albumTitle)}`;

            try {
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'accept': '*/*',
                        'Authorization': `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                if (!response.ok) {
                    console.error('Error fetching paintings');
                    return;
                }

                const data: Paintings[] = await response.json();
                const updatedPaintings = updateImages(data);
                setPaintings(updatedPaintings);

            } catch (error) {
                console.error('Error fetching paintings:', error);
            }
        };

        fetchPaintings();
    }, [email, albumTitle]);

    return (
        <div style={{display: "flex", flexDirection: "column", minHeight: "100vh"}}>
            <HeaderAlbum/>
            <div className="content">
                <Sidebar style={{top: location.pathname.includes("/album") ? "59px" : "100px"}}/>
                    <div className="page-header">
                        <button onClick={handleToggleSelectionMode} className={`add-painting-btn ${isSelectionMode ? 'cancel2' : 'select'}`}>
                            {isSelectionMode ? "Cancel Selection" : "Remove Paintings"}
                        </button>
                        {selectedPaintings.length > 0 && (
                            <button onClick={handleDeleteSelectedPaintings} className={'delete-btn'}>
                                Delete Selected
                            </button>
                        )}
                    </div>

                    <div className="album-images2">
                        {paintings.length === 0 ? (
                            <p>No paintings found in this album.</p>
                        ) : (
                            paintings.map((painting, index) => (
                                <div key={index}
                                     className={`painting-card ${selectedPaintings.includes(painting.paintingName) ? 'selected' : ''}`}
                                     onClick={() => handleCardClick(painting)}>
                                    <img
                                        src={painting.image || monaLisa}  // Dacă nu există imagine, folosim monaLisa ca fallback
                                        alt={painting.paintingName}
                                        className="painting-image"
                                    />
                                    <div className="image-title">{painting.paintingName}</div>
                                    <div className="image-author"><b>Author: </b>{painting.author}</div>
                                    <div className="image-description"><b>Description: </b>{painting.description}</div>

                                    {isSelectionMode && (
                                        <div className="checkbox-container">
                                            <input
                                                type="checkbox"
                                                className="checkbox"
                                                checked={selectedPaintings.includes(painting.paintingName)}
                                                onChange={() => toggleSelectPainting(painting)}
                                            />
                                        </div>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </div>
                <DrawerViewImageDetails
                    isOpen={isDrawerOpen}
                    onClose={closeDrawerViewImageDetails}
                    painting={selectedPainting}
                />

            </div>

            );
            }

            export default Album;
