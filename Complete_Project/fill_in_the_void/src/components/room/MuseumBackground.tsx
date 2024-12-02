import React, { useEffect, useState } from 'react';
import { useTexture } from '@react-three/drei';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import museumWall from '../textures/wall.jpg';
import museumFloor from '../textures/roog.jpg';
import door from '../textures/door.jpg';
import ceiling from '../textures/ceiling.jpg';
import { jwtDecode } from "jwt-decode";
import {useNavigate, useParams} from "react-router-dom";

interface Album {
    galleryName: string;
    description: string;
}

interface MuseumBackgroundProps {
    wallLength: number;
}

interface UserToken {
    sub: string;
    iat: number;
    exp: number;
}

const MuseumBackground: React.FC<MuseumBackgroundProps> = ({ wallLength }) => {
    const wallTexture = useTexture(museumWall);
    const floorTexture = useTexture(museumFloor);
    const ceilingTexture = useTexture(ceiling);
    const doorTexture = useTexture(door);

    wallTexture.wrapS = wallTexture.wrapT = THREE.RepeatWrapping;
    wallTexture.repeat.set(4, 1);

    const wallOffset = 0.05;
    const doorWidth = 6;
    const doorHeight = 10;
    const ceilingHeight = 6.6;

    const [email, setEmail] = useState('');
    const [albums, setAlbums] = useState<Album[]>([]);
    const { albumTitle } = useParams();
    const [currentAlbumIndex, setCurrentAlbumIndex] = useState<number>(0);  // Index pentru albumul curent

    useEffect(() => {
        const token = localStorage.getItem("token");

        const updateLastNameFromToken = () => {
            if (token) {
                const decodedToken = jwtDecode(token) as UserToken;
                const email = decodedToken.sub;
                setEmail(email);
                fetchAlbums(email);
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
        // Actualizează indexul albumului curent când se schimbă URL-ul
        if (albums.length > 0 && albumTitle) {
            const currentIndex = albums.findIndex((album: Album) => album.galleryName === albumTitle);
            if (currentIndex !== -1) {
                setCurrentAlbumIndex(currentIndex);
            }
        }
    }, [albumTitle, albums]); 

    const fetchAlbums = async (email: string) => {
        const token = localStorage.getItem("token");
        const headers = { 'Authorization': `Bearer ${token}` };
        fetch(`http://localhost:8080/api/v1/gallery/findAllByOwner?email-user=${encodeURIComponent(email)}`, { headers })
            .then(response => response.json())
            .then(data => {
                setAlbums(data);
                if (albumTitle) {
                    const currentIndex = data.findIndex((album: Album) => album.galleryName === albumTitle);
                    if (currentIndex !== -1) {
                        setCurrentAlbumIndex(currentIndex);
                    }
                }
            });
    };

    const leftAlbum = albums[(currentAlbumIndex - 1 + albums.length) % albums.length];
    const rightAlbum = albums[(currentAlbumIndex + 1) % albums.length];



    const [hoverLeft, setHoverLeft] = useState<boolean>(false);
    const [hoverRight, setHoverRight] = useState<boolean>(false);
    const [showButtonLeft, setShowButtonLeft] = useState<boolean>(false);
    const [showButtonRight, setShowButtonRight] = useState<boolean>(false);

    const handleDoorHoverLeft = () => {
        setHoverLeft(true);
        setShowButtonLeft(true);
    };

    const handleDoorLeaveLeft = () => {
        setHoverLeft(false);
        setShowButtonLeft(false);
    };

    const handleDoorHoverRight = () => {
        setHoverRight(true);
        setShowButtonRight(true);
    };

    const handleDoorLeaveRight = () => {
        setHoverRight(false);
        setShowButtonRight(false);
    };

    const navigate = useNavigate();
    const handleButtonClickLeft = () => {
        navigate(`/3d-view/${leftAlbum.galleryName}`);
    };

    const handleButtonClickRight = () => {
        navigate(`/3d-view/${rightAlbum.galleryName}`);
    };

    return (
        <>
            <mesh position={[-wallLength / 2 + 5.05, -1.7, 0]}
                  rotation={[0, Math.PI / 2, 0]}
                  onPointerOver={handleDoorHoverLeft}
                  onPointerOut={handleDoorLeaveLeft}
            >
                <planeGeometry args={[doorWidth, doorHeight]}/>
                <meshStandardMaterial map={doorTexture}/>
            </mesh>

            {hoverLeft && showButtonLeft && (
                <Text
                    position={[-wallLength / 2 + 5.06, -1.7, 0]}
                    rotation={[0, Math.PI / 2, 0]}
                    onClick={handleButtonClickLeft}
                    fontSize={0.5}
                    color="white"
                    anchorX="center"
                    anchorY="middle"
                >
                    Enter Left
                </Text>
            )}

            <mesh
                position={[wallLength / 2 - 5.05, -1.7, 0]}
                rotation={[0, -Math.PI / 2, 0]}
                onPointerOver={handleDoorHoverRight}
                onPointerOut={handleDoorLeaveRight}
            >
                <planeGeometry args={[doorWidth, doorHeight]}/>
                <meshStandardMaterial map={doorTexture}/>
            </mesh>

            {hoverRight && showButtonRight && (
                <Text
                    position={[wallLength / 2 - 5.06, -1.7, 0]}
                    rotation={[0, -Math.PI / 2, 0]}
                    onClick={handleButtonClickRight}
                    fontSize={0.5}
                    color="white"
                    anchorX="center"
                    anchorY="middle"
                >
                    Enter Right
                </Text>
            )}
            {albums.length > 1 ? (
                <>
                    {leftAlbum && (
                        <Text
                            position={[-wallLength / 2 + 5.06, ceilingHeight - 2.9, 0]}
                            rotation={[0, Math.PI / 2, 0]}
                            fontSize={1}
                            color="white"
                            anchorX="center"
                            anchorY="middle"
                        >
                            {leftAlbum.galleryName}
                        </Text>
                    )}
                </>
            ) : (
                <Text
                    position={[-wallLength / 2 + 5.06, ceilingHeight - 2.9, 0]}
                    rotation={[0, Math.PI / 2, 0]}
                    fontSize={1}
                    color="white"
                    anchorX="center"
                    anchorY="middle"
                >
                    Album nedefinit
                </Text>
            )}

            {albums.length > 1 ? (
                <>
                    {leftAlbum && (
                        <Text
                            position={[wallLength / 2 - 5.06, ceilingHeight - 2.9, 0]}
                            rotation={[0, -Math.PI / 2, 0]}
                            fontSize={1}
                            color="white"
                            anchorX="center"
                            anchorY="middle"
                        >
                            {rightAlbum.galleryName}
                        </Text>
                    )}
                </>
            ) : (
                <Text
                    position={[wallLength / 2 - 5.06, ceilingHeight - 2.9, 0]}
                    rotation={[0, -Math.PI / 2, 0]}
                    fontSize={1}
                    color="white"
                    anchorX="center"
                    anchorY="middle"
                >
                    Album nedefinit
                </Text>
            )}

            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[wallLength - 10, 20 / 1.5, 30]}/>
                <meshStandardMaterial map={wallTexture} side={THREE.BackSide}/>
            </mesh>

            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -20 / 3 + wallOffset, 0]}>
                <planeGeometry args={[wallLength - 10, 30]}/>
                <meshStandardMaterial map={floorTexture}/>
            </mesh>

            <mesh position={[0, ceilingHeight, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <planeGeometry args={[wallLength - 10, 30]}/>
                <meshStandardMaterial map={ceilingTexture}/>
            </mesh>
        </>
    );
};

export default MuseumBackground;
