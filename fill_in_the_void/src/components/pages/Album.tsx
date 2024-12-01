import React, {useEffect, useState} from "react";
import Sidebar from "../objects/Sidebar";
import "../../styles/Album.css";
import "../../index.css";
import {useLocation, useParams} from "react-router-dom";
import monaLisa from "../images/mona-lisa.jpg";
import HeaderAlbum from "../objects/HeaderAlbum";
import {jwtDecode} from "jwt-decode";
import DrawerViewImageDetails from "../objects/DrawerViewImageDetails";
import Painting from "../room/Painting";
import DrawerEditAlbum from "../objects/DrawerEditAlbum";

interface UserToken {
    sub: string;
    iat: number;
    exp: number;
}

interface Paintings {
    description: string;
    author: string;
    paintingName: string;
    image: string; // Poți salva imaginea fie ca URL, fie ca Base64
    imageType: string;
}

const Album: React.FC = () => {
    const [email, setEmail] = useState('');
    const [paintings, setPaintings] = useState<Paintings[]>([]);
    const [selectedPaintings, setSelectedPaintings] = useState<string[]>([]);
    const [isSelectionMode, setIsSelectionMode] = useState(false);
    const [isDrawerEditAlbumOpen, setIsDrawerEditAlbumOpen] = useState(false); // Starea pentru drawer-ul de editare album
    const [albumTitle, setAlbumTitle] = useState('My Art Album');
    const [albumDescription, setAlbumDescription] = useState('A collection of beautiful paintings'); // Descrierea albumului



    const location = useLocation();
    // const { albumTitle } = useParams();

    const [defaultPaintings, setDefaultPaintings] = useState<Paintings[]>([
        {
            description: "A masterpiece of the Renaissance",
            author: "Leonardo da Vinci",
            paintingName: "Mona Lisa",
            image: monaLisa, // Imaginea fallback deja existentă
            imageType: "image/png",
        },
        {
            description: "A vibrant depiction of sunflowers",
            author: "Vincent van Gogh",
            paintingName: "Sunflowers",
            image: monaLisa, // Înlocuiește cu un URL valid sau imagine fallback
            imageType: "image/png",
        },
        {
            description: "A surreal melting clock masterpiece",
            author: "Salvador Dalí",
            paintingName: "The Persistence of Memory",
            image: monaLisa, // Înlocuiește cu un URL valid sau imagine fallback
            imageType: "image/png",
        },
        {
            description: "An expressive depiction of night",
            author: "Vincent van Gogh",
            paintingName: "Starry Night",
            image: monaLisa, // Înlocuiește cu un URL valid sau imagine fallback
            imageType: "image/png",
        },
        {
            description: "A vibrant view of Japanese culture",
            author: "Katsushika Hokusai",
            paintingName: "The Great Wave off Kanagawa",
            image: monaLisa, // Înlocuiește cu un URL valid sau imagine fallback
            imageType: "image/png",
        },
    ]);


    const toggleSelectPainting = (painting: Paintings) => {
    setSelectedPaintings((prevSelected) =>
        prevSelected.includes(painting.paintingName)
        ? prevSelected.filter((name) => name !== painting.paintingName)
        : [...prevSelected, painting.paintingName]
    );
    };

    // Funcție pentru a activa/dezactiva modul de selecție
    const handleToggleSelectionMode = () => {
        setIsSelectionMode((prev) => !prev);
        setSelectedPaintings([]); // Resetăm selecția când ieșim din modul de selecție
    };

    // Funcție pentru a șterge picturile selectate
    const handleDeleteSelectedPaintings = () => {
        const updatedDefaultPaintings = defaultPaintings.filter(
            (painting) => !selectedPaintings.includes(painting.paintingName)
        );
        setDefaultPaintings(updatedDefaultPaintings); // Actualizăm lista cu picturi
        setSelectedPaintings([]); // Resetăm selecția după ștergere
    };

    const handleCardClick = (painting: Paintings) => {
    if (isSelectionMode) {
        toggleSelectPainting(painting); // Selectăm sau deselectăm pictura când se face click pe card
    } else {
        openDrawerViewImageDetails(painting); // Deschidem detaliile picturii
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
        setSelectedPainting(null); // Resetăm pictura selectată
    };




    const openDrawerEditAlbum = () => {
        setIsDrawerEditAlbumOpen(true);
      };
    
      // Funcție pentru a închide drawer-ul de editare a albumului
      const closeDrawerEditAlbum = () => {
        setIsDrawerEditAlbumOpen(false);
      };
    
      // Funcție pentru a salva modificările albumului
      const saveAlbumChanges = (title: string, description: string) => {
        setAlbumTitle(title);
        setAlbumDescription(description);
        console.log('Album Title:', title);
        console.log('Album Description:', description);
      };




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
        // <div style={{display: "flex", flexDirection: "column", minHeight: "100vh"}}>
        //     <HeaderAlbum/>
        //     <div className="content">
        //         <Sidebar style={{top: location.pathname.includes("/album") ? "59px" : "100px"}}/>

        //         <div className="album-images2">
        //             {paintings.length === 0 ? (
        //                 <p>No paintings found in this album.</p>
        //             ) : (
        //                 paintings.map((painting, index) => (
        //                     <div key={index} className="painting-card">
        //                         <img
        //                             src={painting.image || monaLisa}  // Dacă nu există imagine, folosim monaLisa ca fallback
        //                             alt={painting.paintingName}
        //                             className="album-image2"
        //                         />
        //                         <div className="image-title">{painting.paintingName}</div>
        //                         <div className="image-author"><b>Author: </b>{painting.author}</div>
        //                         <div className="image-description"><b>Description: </b>{painting.description}</div>
        //                     </div>
        //                 ))
        //             )}
        //         </div>
        //     </div>
        // </div>

        <div style={{display: "flex", flexDirection: "column", minHeight: "100vh"}}>
            <HeaderAlbum />
            <div className="content">
                <Sidebar style={{top: location.pathname.includes("/album") ? "59px" : "100px"}} />

                {/* Buton pentru activarea/dezactivarea selecției */}
                <button onClick={handleToggleSelectionMode} className="select-painting-btn">
                {isSelectionMode ? "Cancel Selection" : "Select Paintings"}
                </button>

                {/* Buton pentru ștergerea picturilor selectate */}
                {selectedPaintings.length > 0 && (
                <button onClick={handleDeleteSelectedPaintings} className="delete-painting-btn">
                    Delete Selected
                </button>
                )}

                {/* Butonul de editare album */}
                <button onClick={openDrawerEditAlbum} className="edit-album-btn">
                    Edit Album
                </button>

                {/* Galerie cu picturi */}
                <div className="album-images2">
                {defaultPaintings.length === 0 ? (
                    <p>No paintings found in this album.</p>
                ) : (
                    defaultPaintings.map((painting, index) => (
                    <div key={index} className={`painting-card ${selectedPaintings.includes(painting.paintingName) ? 'selected' : ''}`} onClick={() => handleCardClick(painting)}>
                        <img
                        src={painting.image || 'defaultImage.jpg'}  // Folosim o imagine default dacă nu există una
                        alt={painting.paintingName}
                        className="album-image2"
                        />
                        <div className="image-title">{painting.paintingName}</div>
                        <div className="image-author"><b>Author: </b>{painting.author}</div>
                        <div className="image-description"><b>Description: </b>{painting.description}</div>

                        {/* Checkbox pentru selecție */}
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




            {/* Drawer-ul pentru editarea albumului */}
            <DrawerEditAlbum
                isOpen={isDrawerEditAlbumOpen}
                onClose={closeDrawerEditAlbum}  // Trebuie să fie funcția corectă
                albumTitle={albumTitle}
                albumDescription={albumDescription}
                onSave={saveAlbumChanges}
            />
        </div>

        

    );
}

export default Album;
