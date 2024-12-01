import React, {useEffect, useState} from "react";
import Header from "../objects/Header";
import Navbar from "../objects/Navbar";
import Sidebar from "../objects/Sidebar";
import Drawer from "../objects/Drawer";
import DrawerAddAlbum from "../objects/DrawerAddToAlbum";
import "../../styles/AllPaintings.css";
import "../../index.css";
import {jwtDecode} from "jwt-decode";
import monaLisa from "../images/mona-lisa.jpg";
import {MdDelete} from "react-icons/md";
// import {useNavigate} from "react-router-dom";

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

const AllPaintings: React.FC = () => {
    const [paintings, setPaintings] = useState<Paintings[]>([]);
    const [selectedPaintings, setSelectedPaintings] = useState<string[]>([]);
    const [isSelectionMode, setIsSelectionMode] = useState(false);
    const [selectedPainting, setSelectedPainting] = useState<Paintings | null>(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [email, setEmail] = useState('');

    const [isAlbumDrawerOpen, setIsAlbumDrawerOpen] = useState(false);
    const [selectedAlbumId, setSelectedAlbumId] = useState<string | null>(null);

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
        const fetchPaintings = async () => {
            const token = localStorage.getItem("token");
            if (!token || !email) {
                console.error("Missing token or email.");
                return;
            }

            const url = `http://localhost:8080/api/v1/painting/findAllByOwner?email-user=${encodeURIComponent(email)}`;

            try {
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'accept': '*/*',
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    console.error(`Error fetching paintings: ${errorData.message || response.statusText}`);
                    return;
                }

                const data: Paintings[] = await response.json();
                const updatedPaintings = updateImages(data);

                setPaintings(updatedPaintings);
            } catch (error) {
                console.error("Error fetching paintings:", error);
            }
        };

        if (email) {
            fetchPaintings();
        }
    }, [email]);

    const handleOpenAlbumDrawer = () => {
        setIsAlbumDrawerOpen(true);
        console.log(isAlbumDrawerOpen);
    };

    const handleCloseAlbumDrawer = () => {
        setIsAlbumDrawerOpen(false);
    };

    const handleCreateAlbum = (title: string) => {
        setIsAlbumDrawerOpen(true); // Rămânem în drawer cu albumul selectat
    };

    const handleSelectAlbum = (albumId: string | null) => {
        console.log(`Selected album ID: ${albumId}`);
        setSelectedAlbumId(albumId);
    };

    // Funcționalități pentru selecție imagini
    const toggleSelectPainting = (id: string) => {
        setSelectedPaintings((prevSelected) =>
            prevSelected.includes(id)
                ? prevSelected.filter((paintingId) => paintingId !== id)
                : [...prevSelected, id]
        );
    };

    const handleSaveSelection = (albumId: string, selectedPaintings: string[]) => {
        console.log('Paintings added to album:', selectedPaintings);
    };

    const handleToggleSelectionMode = () => {
        console.log("este"+isAlbumDrawerOpen);
        setIsSelectionMode(!isSelectionMode);
        setSelectedPaintings([]); // Resetăm selecția la ieșirea din modul de selecție
    };

    const handlePaintingClick = (painting: any) => {
        if (isSelectionMode) {
            toggleSelectPainting(painting.paintingName);
        } else {
            setSelectedPainting(painting);
            setIsDrawerOpen(true);
        }
    };


    const closeDrawer = () => {
        setIsDrawerOpen(false);
        setSelectedPainting(null);
    };

    const updatePainting = (updatedPainting: Paintings) => {
        setPaintings((prevPaintings) =>
            prevPaintings.map((painting) =>
                painting.paintingName === updatedPainting.paintingName
                    ? { ...painting, ...updatedPainting }  // Actualizează pictura cu noile date
                    : painting
            )
        );
    };

    const delelePicture = async (paintingName: string) => {
        const token = localStorage.getItem("token");
        if (!token || !email) {
            console.error("Missing token or email.");
            return;
        }

        const url = `http://localhost:8080/api/v1/painting/delete?email-user=${encodeURIComponent(email)}&painting-name=${encodeURIComponent(paintingName)}`;

        try {
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'accept': '*/*',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error(`Error deleting painting: ${errorData.message || response.statusText}`);
                return;
            }

            const updatedPaintings = paintings.filter((painting) => painting.paintingName !== paintingName);
            setPaintings(updatedPaintings);
        } catch (error) {
            console.error("Error deleting painting:", error);
        }
    };


    return (
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <Header />
            <Navbar />
            <div className="content">
                <Sidebar />
                <div className="page-header">
                    <button className={`add-painting-btn ${isSelectionMode ? 'cancel' : 'select'}`}  onClick={handleToggleSelectionMode}>
                        {isSelectionMode ? "Cancel Selection" : "Select Images"}
                    </button>
                    <div className="page-title2">Paintings</div>
                </div>

                <div style={{display: "flex", flex: 1}}>
                    <div className="paintings-container">
                        {paintings.map((painting) => (
                            <div
                                className={`painting-card ${selectedPaintings.includes(painting.paintingName) ? "selected" : ""}`}
                                key={painting.paintingName}
                                onClick={() => handlePaintingClick(painting)}
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
                                <img src={painting.image} alt={painting.paintingName} className="painting-image"/>
                                <div className="painting-title">{painting.paintingName}</div>
                                <div className="painting-author"><b>Author:</b> {painting.author}</div>
                                <div className="painting-description"><b>Description: </b>{painting.description}</div>
                                <div className="poz-btn-icon">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation(); // Previne propagarea click-ului
                                            delelePicture(painting.paintingName);
                                        }}
                                        className="delete-album-btn">
                                        <MdDelete style={{fontSize: "14px", marginRight: "8px"}}/>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>

                {selectedPaintings.length > 0 && (
                    <button className="fixed-add-album-btn" onClick={handleOpenAlbumDrawer}>
                        Add to Album
                    </button>
                )}

                {/* Drawer pentru albume */}
                <DrawerAddAlbum
                    isOpen={isAlbumDrawerOpen}
                    onClose={handleCloseAlbumDrawer}
                    selectedAlbumId={selectedAlbumId}
                    selectedPaintings={selectedPaintings}
                    onCreateAlbum={handleCreateAlbum}
                    onSelectAlbum={handleSelectAlbum}
                    onSaveSelection={handleSaveSelection}
                />

                {/* Drawer pentru detalii pictură */}
                <Drawer
                    isOpen={isDrawerOpen}
                    onClose={closeDrawer}
                    painting={selectedPainting}
                    onUpdatePainting={updatePainting}
                />
            </div>
        </div>
    );
};

export default AllPaintings;