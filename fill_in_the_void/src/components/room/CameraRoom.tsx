import React, {Suspense, useEffect, useState} from 'react';
import { Canvas  } from '@react-three/fiber';
import {  Vector3 } from 'three';
import "../../styles/CameraRoom.css";
import MuseumBackground from "./MuseumBackground";
import Painting from "./Painting";
import CameraController from './CameraController';
import {jwtDecode} from "jwt-decode";
import {useNavigate, useParams} from "react-router-dom";
import DropDownActionsRoom from "./DropDownActionsRoom";
import {IoArrowBackOutline} from "react-icons/io5";
import Drawer from "../objects/Drawer";
import DrawerAddPaintings from "./DrawerAddPaintings";

interface UserToken {
    sub: string;
    iat: number;
    exp: number;
}

interface Paintings {
    image: string;
    paintingName: string;
    author: string;
    description: string;
}

const CameraRoom: React.FC = () => {
    const [email, setEmail] = useState('');
    const { albumTitle } = useParams();
    const [paintings, setPaintings] = useState<Paintings[]>([]);
    const paintingUrls = paintings.map(painting => painting.image);
    const [isDrawerAddPaintOpen, setIsDrawerAddPaintOpen] = useState(false);
    const [removePaintingMode, setRemovePaintingMode] = useState(false);
    const [isDrawerReloadPainting, setIsDrawerReloadPainting] = useState(false);


    const dFloorPainting = -0.5;
    const roomSize = 30;

    const [targetPosition, setTargetPosition] = useState<Vector3 | null>(null);
    const [targetAngle, setTargetAngle] = useState<number | null>(null);

    const paintingHeight = 3;
    const paintingWidths: number[] = paintingUrls.map((url) => {
        const img = new Image();
        img.src = url;
        return paintingHeight * (img.width / img.height);
    });

    const gapPaintings = 3;
    const wallOffset = 0.1;

    const leftWallPaintings = paintingWidths.slice(0, Math.ceil(paintingWidths.length / 2));
    const rightWallPaintings = paintingWidths.slice(Math.ceil(paintingWidths.length / 2));

    const leftWallLength = leftWallPaintings.reduce((sum, width) => sum + width, 0) + (leftWallPaintings.length - 1) * gapPaintings;
    const rightWallLength = rightWallPaintings.reduce((sum, width) => sum + width, 0) + (rightWallPaintings.length - 1) * gapPaintings;

    const roomResize = Math.max(leftWallLength, rightWallLength) + 2 * gapPaintings + 10;

    const leftWallStartX = -roomSize / 2 + (roomSize - leftWallLength) / 2 + wallOffset;
    const rightWallStartX = roomSize / 2 - (roomSize - rightWallLength) / 2 - wallOffset;

    const positions: [number, number, number][] = [];
    let currentLeftX = leftWallStartX;
    let currentRightX = rightWallStartX;

    paintingWidths.forEach((width, i) => {
        const isLeftWall = i < leftWallPaintings.length;
        if (isLeftWall) {
            positions.push([currentLeftX + width / 2, dFloorPainting, -roomSize / 2 + wallOffset]);
            currentLeftX += width + gapPaintings;
        } else {
            positions.push([currentRightX - width / 2, dFloorPainting, roomSize / 2 - wallOffset]);
            currentRightX -= width + gapPaintings;
        }
    });

    const rotations: [number, number, number][] = positions.map((_, index) => {
        return [0, index < leftWallPaintings.length ? 0 : Math.PI, 0];
    });

    const roomBounds = {
        minX: -roomResize / 2 + 5.1,
        maxX: roomResize / 2 - 5.1,
        minZ: -roomSize / 2 + 1,
        maxZ: roomSize / 2 - 1,
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
                // Dacă avem date în câmpul `image`, le transformăm într-un string Base64
                const uint8Array = new Uint8Array(atob(painting.image).split('').map(char => char.charCodeAt(0)));
                const base64String = uint8ArrayToBase64(uint8Array);
                // Actualizăm câmpul `image` cu stringul Base64
                painting.image = `data:image/png;base64,${base64String}`;
            }
            return painting;
        });
    };
    useEffect(() => {
        if (!sessionStorage.getItem("cameraRoomReloaded")) {
            sessionStorage.setItem("cameraRoomReloaded", "true");
            window.location.reload();
        }
    }, []);

    useEffect(() => {
        fetchPaintings();
    }, [email, albumTitle]);

    const fetchPaintings = async () => {
        if (!email || !albumTitle) return;
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

    useEffect(() => {
        if (isDrawerReloadPainting) {
            fetchPaintings();  // Trigger a re-fetch of paintings
            setIsDrawerReloadPainting(false);  // Reset the flag
        }
    }, [isDrawerReloadPainting]);


    const navigate = useNavigate();

    const [showDropdown, setShowDropdown] = useState(false);
    const [isActive, setIsActive] = useState(false); // Stare pentru activarea butonului
    const pressActionsButton = () => {
        setShowDropdown(!showDropdown);
        setIsActive(!isActive);  // Schimbă starea activă a butonului
    };
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const handleOptionSelect = (option: string) => {
        setSelectedOption(option);
        setShowDropdown(false);
    };

    const closeDrawer = () => {
        setIsDrawerAddPaintOpen(false);
    };

    const handleCloseDeleteMode = () => {
        setRemovePaintingMode(false);
        setShowDropdown(false);
    };

    const handleDeletePainting = async (paintingName: string) => {
        try {
            if (!paintingName || !email || !albumTitle) {
                console.error('Missing title, email or albumTitle');
                return;
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

            setIsDrawerReloadPainting(true);

        }catch (error) {
            console.error('Error deleting painting:', error);
        }
        setPaintings((prevPaintings) =>
            prevPaintings.filter(painting => painting.paintingName !== paintingName)
        );
    };

    return (
        <div style={{position: 'relative', height: '100vh'}}>
            <button className={'back-to-app-button'}
                onClick={() => navigate('/all-albums')}
            >
                <IoArrowBackOutline style={{ fontSize: "18px", marginRight: "6px" }} />
                Back to Albums
            </button>

            {removePaintingMode && (
                <div className={'remove-mode'} onClick={handleCloseDeleteMode}>
                    Close painting removal mode
                </div>
            )}


            <Canvas camera={{position: [0, 0, 14], fov: 40}} style={{height: '100vh'}}>
                <ambientLight intensity={2}/>
                <pointLight position={[10, 10, 10]} intensity={1}/>
                <MuseumBackground wallLength={roomResize}/>
                <CameraController roomBounds={roomBounds}/>

                <Suspense>
                    {paintings.map((painting, index) => (
                        <Painting
                            key={index}
                            position={positions[index]}
                            rotation={rotations[index]}
                            textureUrl={painting.image}
                            title={painting.paintingName}
                            author={painting.author}
                            description={painting.description}
                            onClick={(position, angle) => {
                                setTargetPosition(position);
                                setTargetAngle(angle);
                            }}
                            displayDeleteButton={removePaintingMode}
                            onDelete={() => handleDeletePainting(painting.paintingName)}
                        />
                    ))}
            </Suspense>
            </Canvas>

            <div className="dropdown-container2" style={{position: 'absolute', top: '10px', right: '10px', zIndex: 15}}>
                <button
                    className={`actions-room-button ${showDropdown ? 'active' : ''}`} // Adaugă clasa activă când butonul este apăsat
                    onClick={pressActionsButton}
                >
                    Actions
                </button>
                {showDropdown && <DropDownActionsRoom showDropdown={showDropdown} setShowDropdown={setShowDropdown} onSelect={handleOptionSelect} isDrawerAddPaintOpen={isDrawerAddPaintOpen} setIsDrawerAddPaintOpen={setIsDrawerAddPaintOpen} removePaintingMode={removePaintingMode} setRemovePaintingMode={setRemovePaintingMode}/>}
            </div>

            <DrawerAddPaintings
                isOpen={isDrawerAddPaintOpen}
                onClose={closeDrawer}
                isDrawerReloadPainting={isDrawerReloadPainting}
                setIsDrawerReloadPainting={setIsDrawerReloadPainting}
            />

        </div>
    );
};


export default CameraRoom;